import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext"; // Change from useUser
import { Music, Play, Pause, Download } from "lucide-react";
import Navbar from "../components/Navbar";
import LightRays from "../components/LightRays";
import SpotlightCard from "../components/SpotlightCard";
import ShinyText from "../components/ShinyText";
import { API_BASE_URL } from "../config";

const Collections = () => {
  const { currentUser } = useAuth(); // Change from const { user } = useUser();
  const [beats, setBeats] = useState([]);
  const [userCollection, setUserCollection] = useState({
    savedBeats: [],
    purchasedBeats: []
  });
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentUser?.email) { // Change from user?.primaryEmailAddress?.emailAddress
      fetchUserCollection(currentUser.email);
    }
    fetchBeats();
  }, [currentUser]); // Change dependency

  const fetchBeats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/beats`);
      const data = await res.json();
      if (data.success) setBeats(data.beats);
    } catch (err) {
      console.error("Error fetching beats:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCollection = async (email) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user-collection/${email}`);
      const data = await res.json();
      if (data.success) setUserCollection(data.userCollection);
    } catch (err) {
      console.error("Error fetching user collection:", err);
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

  const handleDownload = (beat) => {
    const link = document.createElement("a");
    link.href = beat.audioUrl;
    link.download = `${beat.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderBeats = (beatIds) => {
    const filteredBeats = beats.filter((b) => beatIds.includes(b._id));

    if (filteredBeats.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Music className="mx-auto mb-2" size={40} />
          <p>No beats in this section yet</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBeats.map((beat) => {
          const isCurrentlyPlaying = currentPlaying === beat._id && isPlaying;

          return (
            <SpotlightCard
              key={beat._id}
              className="p-6 h-full flex flex-col hover:scale-105 transition-transform duration-300"
              spotlightColor="rgba(255, 255, 255, 0.1)"
            >
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
                      className={`bg-purple-500 h-1 rounded-full transition-all duration-300 ${
                        isCurrentlyPlaying ? "animate-pulse" : ""
                      }`}
                      style={{ width: isCurrentlyPlaying ? "30%" : "0%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={() => handleDownload(beat)}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all duration-300 hover:scale-105"
              >
                <Download size={16} />
                Download
              </button>
            </SpotlightCard>
          );
        })}
      </div>
    );
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
        <div className="flex flex-col items-center mb-16">
          <div className="flex flex-row justify-center items-center text-center bg-base-200 px-4 py-1 my-4 rounded-2xl border border-white/10">
            <ShinyText text="My Collections" speed={2} />
          </div>
        </div>

        {/* Saved Beats */}
        <h2 className="text-2xl font-bold text-white mb-6">❤️ Saved Beats</h2>
        {renderBeats(userCollection.savedBeats)}

        {/* Purchased Beats */}
        <h2 className="text-2xl font-bold text-white mt-12 mb-6">🛒 Purchased Beats</h2>
        {renderBeats(userCollection.purchasedBeats)}
      </div>

      <audio ref={audioRef} />

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
};

export default Collections;
