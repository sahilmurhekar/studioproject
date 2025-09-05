import { useState } from 'react';
import { X, Trash2, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onConfirm, loading = false, userEmail, isGoogleUser = false }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isGoogleUser && !password) {
      setError('Password is required');
      return;
    }

    if (confirmText !== 'DELETE') {
      setError('Please type "DELETE" to confirm');
      return;
    }

    onConfirm(password);
  };

  const handleClose = () => {
    if (!loading) {
      setPassword('');
      setConfirmText('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-500/30 rounded-xl shadow-2xl">
        {/* Close button */}
        {!loading && (
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}

        {/* Modal content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-400" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Delete Account</h3>
              <p className="text-red-400 text-sm">This action cannot be undone</p>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Trash2 className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
              <div className="text-sm text-red-300">
                <p className="font-medium mb-2">This will permanently delete:</p>
                <ul className="list-disc list-inside space-y-1 text-red-400">
                  <li>Your account and profile data</li>
                  <li>All associated data from our servers</li>
                  <li>Your purchases will be linked to your email forever</li>
                  <li>Your Google account if you have one linked</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email display */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Account to be deleted:
              </label>
              <div className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm">
                {userEmail}
              </div>
            </div>

            {/* Password field (only for email users) */}
            {!isGoogleUser && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Enter your password to confirm:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none pr-10"
                    placeholder="Enter your password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {/* Google account notice */}
            {isGoogleUser && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <p className="text-blue-300 text-sm">
                  You'll be prompted to sign in with Google to confirm this action.
                </p>
              </div>
            )}

            {/* Confirmation text */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Type "DELETE" to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 bg-black/40 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
                placeholder="Type DELETE"
                disabled={loading}
                autoComplete="off"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || (!isGoogleUser && !password) || confirmText !== 'DELETE'}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
