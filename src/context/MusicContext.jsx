import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { currentSong as initialSong } from '../data/musicData';
import { streamableSongs } from '../data/cloudinaryData';
import spotifyService from '../services/spotify';

const MusicContext = createContext();


export const useMusic = () => useContext(MusicContext);

export function MusicProvider({ children }) {

  const [currentSong, setCurrentSong] = useState(initialSong);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState(initialSong.duration);
  const [currentAudio, setCurrentAudio] = useState(null);

  // Spotify data search karo bajne toh wala hai nahi
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // streamable songs (asli maal)
  const [cloudinarySongs, setCloudinarySongs] = useState(streamableSongs);
  const [filteredCloudinarySongs, setFilteredCloudinarySongs] = useState(streamableSongs);
  const [cloudinarySearchQuery, setCloudinarySearchQuery] = useState('');

  // Handle search for Spotify wala
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

  // Handle search for asli maal
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


  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentAudio) {

          const audioProgress = (currentAudio.currentTime / currentAudio.duration) * 100;
          setProgress(audioProgress);
          setCurrentTime(convertSecondsToTime(Math.floor(currentAudio.currentTime)));
        } else {

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

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.src = '';
    }

    setCurrentSong(song);


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


      audio.play().catch(err => {
        console.error("Error playing audio:", err);
        setError("Couldn't autoplay. Click play to start.");
      });
      setIsPlaying(true);
    } else {
      setCurrentAudio(null);

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

  const playRandomSong = () => {
    if (cloudinarySongs.length > 0) {
      const randomIndex = Math.floor(Math.random() * cloudinarySongs.length);
      const randomSong = cloudinarySongs[randomIndex];
      playSong(randomSong);
    }
  };

  const value = {

    currentSong,
    isPlaying,
    volume,
    isMuted,
    progress,
    currentTime,
    duration,


    searchResults,
    searchQuery,
    isLoading,
    error,


    cloudinarySongs,
    filteredCloudinarySongs,
    cloudinarySearchQuery,


    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    playSong,
    searchSpotify,
    searchCloudinary,
    playRandomSong
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}