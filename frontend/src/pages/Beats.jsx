import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Download, Heart, ShoppingCart, Music } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // Change from useUser
import Navbar from '../components/Navbar';
import LightRays from '../components/LightRays';
import ShinyText from '../components/ShinyText';
import SpotlightCard from '../components/SpotlightCard';
import { API_BASE_URL } from '../config'; // ✅ Import API URL from env

const Beats = () => {
  const { currentUser } = useAuth(); // Change from const { user } = useUser();
  const [beats, setBeats] = useState([]);
  const [userCollection, setUserCollection] = useState({ savedBeats: [], purchasedBeats: [] });
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Fetch beats and user collection on component mount
  useEffect(() => {
    fetchBeats();
    if (currentUser?.email) { // Change from user?.primaryEmailAddress?.emailAddress
      console.log('User email from Firebase:', currentUser.email);
      fetchUserCollection(currentUser.email);
    }
  }, [currentUser]); // Change dependency

  const fetchBeats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/beats`);
      const data = await response.json();
      if (data.success) {
        setBeats(data.beats);
      }
    } catch (error) {
      console.error('Error fetching beats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCollection = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user-collection/${email}`);
      const data = await response.json();
      if (data.success) {
        setUserCollection(data.userCollection);
      }
    } catch (error) {
      console.error('Error fetching user collection:', error);
    }
  };

  const handlePlayPause = (beat) => {
    if (currentPlaying === beat._id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = beat.audioUrl;
        audioRef.current.play();
        setCurrentPlaying(beat._id);
        setIsPlaying(true);
      }
    }
  };

  const handleSaveBeat = async (beatId) => {
    if (!currentUser?.email) { // Change email access
      console.log('No user email available');
      return;
    }

    const userEmail = currentUser.email; // Simplified
    console.log('Saving beat for user:', userEmail);

    try {
      const isSaved = userCollection.savedBeats.includes(beatId);
      const endpoint = isSaved ? '/api/unsave-beat' : '/api/save-beat';

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail, // Firebase user email sent to backend
          beatId
        })
      });

      if (response.ok) {
        // Update local state
        setUserCollection(prev => ({
          ...prev,
          savedBeats: isSaved
            ? prev.savedBeats.filter(id => id !== beatId)
            : [...prev.savedBeats, beatId]
        }));
        console.log(`Beat ${isSaved ? 'removed from' : 'added to'} collection`);
      }
    } catch (error) {
      console.error('Error saving beat:', error);
    }
  };

  const handlePurchaseBeat = async (beatId) => {
    if (!currentUser?.email) { // Change email access
      console.log('No user email available for purchase');
      return;
    }

    const userEmail = currentUser.email; // Simplified
    console.log('Purchasing beat for user:', userEmail);

    try {
      const response = await fetch(`${API_BASE_URL}/api/purchase-beat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail, // Firebase user email sent to backend
          beatId
        })
      });

      if (response.ok) {
        // Update local state
        setUserCollection(prev => ({
          ...prev,
          purchasedBeats: [...prev.purchasedBeats, beatId]
        }));
        console.log('Beat purchased successfully');
      }
    } catch (error) {
      console.error('Error purchasing beat:', error);
    }
  };

  const handleDownload = (beat) => {
    // Create a temporary link to download the beat
    const link = document.createElement('a');
    link.href = beat.audioUrl;
    link.download = `${beat.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentPlaying(null);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  if (loading) {
    return (
      <>
        <LightRays />
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <LightRays />
      <Navbar />

      <div className="px-[5%] md:px-[10%] lg:px-0 lg:max-w-screen-xl lg:mx-auto py-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10 transition-transform duration-300">
            <ShinyText text="Beat Market" disabled={false} speed={2} className="" />
          </div>

          <div className="animate-fade-in-up animation-delay-300">
            <ShinyText
              text="Discover premium beats and build your perfect sound library"
              disabled={false}
              speed={2}
              className="text-center text-lg px-[5%] lg:w-240"
            />
          </div>
        </div>

        {/* Beats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beats.map((beat, index) => {
            const isSaved = userCollection.savedBeats.includes(beat._id);
            const isPurchased = userCollection.purchasedBeats.includes(beat._id);
            const isCurrentlyPlaying = currentPlaying === beat._id && isPlaying;

            return (
              <div key={beat._id} className={`animate-fade-in-up animation-delay-${(index % 6 + 1) * 100}`}>
                <SpotlightCard className="p-6 h-full flex flex-col hover:scale-105 transition-transform duration-300" spotlightColor="rgba(255, 255, 255, 0.1)">
                  {/* Beat Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{beat.title}</h3>
                    <p className="text-gray-400 mb-4">{beat.subtitle}</p>

                    {/* Genre & BPM */}
                    <div className="flex gap-2 mb-4">
                      <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {beat.genre}
                      </span>
                      <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {beat.bpm} BPM
                      </span>
                    </div>
                  </div>

                  {/* Music Player */}
                  <div className="flex items-center gap-4 mb-6 p-3 bg-black/30 rounded-lg">
                    <button
                      onClick={() => handlePlayPause(beat)}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                    >
                      {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <div className="flex-1">
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div
                          className={`bg-purple-500 h-1 rounded-full transition-all duration-300 ${isCurrentlyPlaying ? 'animate-pulse' : ''}`}
                          style={{ width: isCurrentlyPlaying ? '30%' : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {/* Save Button */}
                    <button
                      onClick={() => handleSaveBeat(beat._id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
                        isSaved
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      <Heart size={16} className={isSaved ? 'fill-current' : ''} />
                      {isSaved ? 'Saved' : 'Save'}
                    </button>

                    {/* Download/Purchase Button */}
                    {beat.type === 'free' || isPurchased ? (
                      <button
                        onClick={() => handleDownload(beat)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:scale-105"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchaseBeat(beat._id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:scale-105"
                      >
                        <ShoppingCart size={16} />
                        ${beat.price}
                      </button>
                    )}
                  </div>
                </SpotlightCard>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {beats.length === 0 && !loading && (
          <div className="text-center py-16">
            <Music size={64} className="mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No beats available yet</h3>
            <p className="text-gray-500">Check back soon for new releases!</p>
          </div>
        )}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default Beats;
