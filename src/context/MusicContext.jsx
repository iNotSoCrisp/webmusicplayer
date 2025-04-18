import { createContext, useState, useContext, useEffect } from 'react';
import { currentSong as initialSong } from '../data/musicData';
import { streamableSongs } from '../data/cloudinaryData';
import spotifyService from '../services/spotify';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  // Player state
  const [currentSong, setCurrentSong] = useState(initialSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState(initialSong.duration);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Spotify data (search only, no playback)
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cloudinary streamable songs
  const [cloudinarySongs, setCloudinarySongs] = useState(streamableSongs);
  const [filteredCloudinarySongs, setFilteredCloudinarySongs] = useState(streamableSongs);
  const [cloudinarySearchQuery, setCloudinarySearchQuery] = useState('');

  // Handle search for Spotify
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.trim()) {
        try {
          setIsLoading(true);
          setError(null);
          const results = await spotifyService.searchTracks(searchQuery);
          setSearchResults(results);
        } catch (err) {
          console.error('Error searching tracks:', err);
          setError('Failed to search. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500); // Debounce search for 500ms

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  // Handle search for Cloudinary songs
  useEffect(() => {
    if (cloudinarySearchQuery.trim()) {
      const lowerCaseQuery = cloudinarySearchQuery.toLowerCase();
      const filtered = streamableSongs.filter(
        song =>
          song.title.toLowerCase().includes(lowerCaseQuery) ||
          song.artist.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredCloudinarySongs(filtered);
    } else {
      setFilteredCloudinarySongs(streamableSongs);
    }
  }, [cloudinarySearchQuery]);

  // Handle audio playback time updates
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentAudio) {
          // Use actual audio progress
          const audioProgress = (currentAudio.currentTime / currentAudio.duration) * 100;
          setProgress(audioProgress);
          setCurrentTime(convertSecondsToTime(Math.floor(currentAudio.currentTime)));
        } else {
          // Fallback to simulated progress
          setProgress(prev => {
            const newProgress = prev + 0.5;
            if (newProgress >= 100) {
              setIsPlaying(false);
              return 0;
            }
            return newProgress;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentAudio]);

  // Clean up audio when unmounting
  useEffect(() => {
    return () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, []);

  const convertTimeToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const convertSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play().catch(err => {
          console.error("Error playing audio:", err);
          setError("Couldn't autoplay. Please try again.");
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (currentAudio) {
      currentAudio.volume = newVolume / 100;
    }

    if (newVolume === 0) {
      setIsMuted(true);
      if (currentAudio) currentAudio.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      if (currentAudio) currentAudio.muted = false;
    }
  };

  const handleProgressChange = (newProgress) => {
    setProgress(newProgress);
    if (currentAudio) {
      currentAudio.currentTime = (newProgress / 100) * currentAudio.duration;
    }
  };

  const playSong = (song) => {
    // Clean up previous audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
    }

    setCurrentSong(song);

    // If we have an audio URL (for Cloudinary songs), play it
    if (song.audioUrl) {
      const audio = new Audio(song.audioUrl);
      audio.volume = volume / 100;
      audio.muted = isMuted;

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });

      audio.addEventListener('loadedmetadata', () => {
        setDuration(convertSecondsToTime(Math.floor(audio.duration)));
      });

      setCurrentAudio(audio);

      // Try to play (might be blocked by browser)
      audio.play().catch(err => {
        console.error("Error playing audio:", err);
        setError("Couldn't autoplay. Click play to start.");
      });
      setIsPlaying(true);
    } else {
      setCurrentAudio(null);
      // For Spotify tracks, we can't play them, so just update the UI
      setIsPlaying(false);
    }

    setProgress(0);
  };

  const searchSpotify = (query) => {
    setSearchQuery(query);
  };

  const searchCloudinary = (query) => {
    setCloudinarySearchQuery(query);
  };

  const value = {
    // Player state
    currentSong,
    isPlaying,
    volume,
    isMuted,
    progress,
    currentTime,
    duration,

    // Spotify data
    searchResults,
    searchQuery,
    isLoading,
    error,

    // Cloudinary data
    cloudinarySongs,
    filteredCloudinarySongs,
    cloudinarySearchQuery,

    // Functions
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    playSong,
    searchSpotify,
    searchCloudinary
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  return useContext(MusicContext);
}