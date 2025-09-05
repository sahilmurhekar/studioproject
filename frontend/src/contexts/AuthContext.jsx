import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  linkWithPopup,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  EmailAuthProvider
} from 'firebase/auth';

import { doc, setDoc, getDoc,deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { deleteUser } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

const reauthenticateUser = async (password = null) => {
  if (!auth.currentUser) throw new Error('No user is signed in.');

  const providerData = auth.currentUser.providerData;
  const isGoogleUser = providerData.some(provider => provider.providerId === 'google.com');
  const isEmailUser = providerData.some(provider => provider.providerId === 'password');

  if (isGoogleUser) {
    const provider = new GoogleAuthProvider();
    try {
      await reauthenticateWithPopup(auth.currentUser, provider);
    } catch (error) {
      console.error('Google re-authentication error:', error);
      throw new Error('Google re-authentication failed. Please try again.');
    }
  } else if (isEmailUser) {
    if (!password) {
      throw new Error('Password is required for re-authentication.');
    }
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (error) {
      console.error('Email re-authentication error:', error);
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed attempts. Please try again later.');
      }
      throw new Error('Re-authentication failed. Please check your password.');
    }
  } else {
    throw new Error('Unsupported authentication provider.');
  }
};

  const setupRecaptcha = (phoneNumber) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    });

    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  };

// Enhanced deleteAccount function
const deleteAccount = async (password = null) => {
  if (!currentUser) throw new Error("No user is currently signed in");

  const userEmail = currentUser.email;

  try {
    // Re-authenticate user first
    await reauthenticateUser(password);

    // Delete Firestore profile
    await deleteDoc(doc(db, "users", currentUser.uid));

    // Delete Firebase Auth account
    await deleteUser(currentUser);

    // Delete MongoDB user collection
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/user-collection/${userEmail}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn('Failed to delete MongoDB user collection, but account was deleted from Firebase');
      }
    } catch (mongoError) {
      console.warn('MongoDB deletion failed, but account was deleted from Firebase:', mongoError);
    }

    setCurrentUser(null);
    setUserProfile(null);
  } catch (error) {
    console.error('Delete account error:', error);
    throw error;
  }
};

  const signInWithOTP = async (phoneNumber) => {
    try {
      const confirmationResult = await setupRecaptcha(phoneNumber);
      window.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (code) => {
    try {
      const result = await window.confirmationResult.confirm(code);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password, displayName = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update the user's profile with display name if provided
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }

    await saveUserData(userCredential.user, 'manual', displayName);
    return userCredential;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await updateLastLogin(userCredential.user.uid);
    return userCredential;
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // Request additional scopes for profile information
    provider.addScope('profile');
    provider.addScope('email');

    const userCredential = await signInWithPopup(auth, provider);
    await saveUserData(userCredential.user, 'google');
    return userCredential;
  };

  // New function to link Google account to existing manual account
const linkGoogleAccount = async () => {
  if (!currentUser) throw new Error("No user is currently signed in");

  if (currentUser.providerData.some(p => p.providerId === "google.com")) {
    throw new Error("Google account is already linked to this account");
  }

  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await linkWithPopup(currentUser, provider);

    // update Firestore + state
    await saveUserData(result.user, "linked", null, true);
    setCurrentUser({ ...result.user });
    await fetchUserProfile(result.user.uid);

    return result;
  } catch (error) {
    throw error;
  }
};

  // New function to check if account can be linked
  const canLinkGoogleAccount = () => {
    if (!currentUser || !userProfile) return false;

    // Can link if user signed up manually and doesn't have Google linked yet
    return userProfile.provider === 'manual' &&
           !currentUser.providerData.some(provider => provider.providerId === 'google.com');
  };

  // New function to get linked providers info
  const getLinkedProviders = () => {
    if (!currentUser) return [];

    return currentUser.providerData.map(provider => ({
      providerId: provider.providerId,
      email: provider.email,
      displayName: provider.displayName,
      photoURL: provider.photoURL
    }));
  };

  const logout = () => {
    setUserProfile(null);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

// Updated saveUserData function in AuthContext.jsx
const saveUserData = async (user, provider, displayName = '', isLinking = false) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  // Base user data
  const userData = {
    email: user.email,
    emailVerified: user.emailVerified,
    lastLogin: new Date().toISOString()
  };

  // Handle profile data with Google priority
  const googleProvider = user.providerData.find(p => p.providerId === 'google.com');
  if (googleProvider) {
    // Always use Google profile data if available
    userData.name = googleProvider.displayName || user.displayName || '';
    userData.photoURL = googleProvider.photoURL || user.photoURL || '';
  } else {
    // Fall back to user data if no Google provider
    userData.name = user.displayName || displayName || '';
    userData.photoURL = user.photoURL || '';
  }

  if (!userSnap.exists()) {
    // New user - save all data
    await setDoc(userRef, {
      ...userData,
      provider: provider,
      createdAt: new Date().toISOString(),
      linkedProviders: user.providerData.map(p => p.providerId)
    });
  } else {
    // Existing user
    const existingData = userSnap.data();
    const updateData = {
      ...userData,
      linkedProviders: user.providerData.map(p => p.providerId)
    };

    // If linking, update provider status and preserve original creation method
    if (isLinking) {
      updateData.provider = 'linked'; // Update to show account is now linked
      updateData.googleLinkedAt = new Date().toISOString();
      // Google data is already prioritized in userData above
    } else if (!isLinking && provider === 'manual') {
      // Keep existing provider info for manual logins
      updateData.provider = existingData.provider || provider;

      // If user already has Google linked, preserve Google profile data
      if (existingData.linkedProviders?.includes('google.com')) {
        // Don't override with manual data if Google is already linked
        const currentUser = auth.currentUser;
        const currentGoogleProvider = currentUser.providerData.find(p => p.providerId === 'google.com');
        if (currentGoogleProvider) {
          updateData.name = currentGoogleProvider.displayName || existingData.name;
          updateData.photoURL = currentGoogleProvider.photoURL || existingData.photoURL;
        }
      }
    }

    await setDoc(userRef, updateData, { merge: true });
  }
};

  const updateLastLogin = async (uid) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      lastLogin: new Date().toISOString()
    }, { merge: true });
  };

  const fetchUserProfile = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const profileData = userSnap.data();
        setUserProfile(profileData);
        return profileData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };


  // Helper function to check if user is Google user
const isGoogleUser = () => {
  if (!currentUser) return false;
  return currentUser.providerData.some(provider => provider.providerId === 'google.com');
};


  const updateUserProfile = async (uid, updates) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Refresh the local profile data
      await fetchUserProfile(uid);
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch user profile data from Firestore
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    googleSignIn,
    logout,
    resetPassword,
    signInWithOTP,
    verifyOTP,
    fetchUserProfile,
    updateUserProfile,
    linkGoogleAccount,
    canLinkGoogleAccount,
    getLinkedProviders,
    deleteAccount,
    reauthenticateUser,
    isGoogleUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <div id="recaptcha-container"></div>
    </AuthContext.Provider>
  );
};
