import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaPlay, FaPause, FaMusic, FaClock } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function StreamPage() {
  const {
    filteredCloudinarySongs,
    cloudinarySearchQuery,
    searchCloudinary,
    playSong,
    currentSong,
    isPlaying
  } = useMusic();

  const [inputValue, setInputValue] = useState(cloudinarySearchQuery);
  // Track durations state
  const [songDurations, setSongDurations] = useState({});
  const audioRefs = useRef({});

  // Effect to load audio durations
  useEffect(() => {
    // Create audio elements for each song to get duration
    filteredCloudinarySongs.forEach(song => {
      if (!audioRefs.current[song.id]) {
        const audio = new Audio(song.audioUrl);

        audio.addEventListener('loadedmetadata', () => {
          setSongDurations(prev => ({
            ...prev,
            [song.id]: formatDuration(audio.duration)
          }));
        });

        audio.addEventListener('error', () => {
          setSongDurations(prev => ({
            ...prev,
            [song.id]: 'N/A'
          }));
        });

        audioRefs.current[song.id] = audio;
      }
    });

    // Cleanup on unmount
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current = {};
    };
  }, [filteredCloudinarySongs]);

  const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchCloudinary(value);
  };

  const clearSearch = () => {
    setInputValue('');
    searchCloudinary('');
  };

  return (
    <div className="stream-page-container">
      <div className="page-header">
        <h1 className="page-title">Stream Music</h1>
        <p className="page-subtitle">Listen to your favorite songs from our collection</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Filter your streamable songs..."
          value={inputValue}
          onChange={handleChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
        {inputValue && (
          <button className="clear-button" onClick={clearSearch}>
            <FaTimes size={16} />
          </button>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', marginTop: '30px' }}>
          Your Streamable Tracks
        </h2>

        {filteredCloudinarySongs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 0',
            color: 'var(--text-secondary)'
          }}>
            <p>No songs found</p>
            {cloudinarySearchQuery && (
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                Try another search term
              </p>
            )}
          </div>
        )}

        <div className="stream-grid">
          {filteredCloudinarySongs.map(song => {
            const isCurrentSong = currentSong.id === song.id;
            const isCurrentlyPlaying = isCurrentSong && isPlaying;

            return (
              <div
                key={song.id}
                className="stream-card"
                onClick={() => playSong(song)}
              >
                <div style={{ position: 'relative' }}>
                  {song.cover ? (
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="stream-card-image"
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      aspectRatio: '1',
                      backgroundColor: 'var(--background-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <FaMusic size={40} color="var(--text-secondary)" />
                    </div>
                  )}

                  <div className="play-overlay">
                    <div className="play-button-large">
                      {isCurrentlyPlaying ? (
                        <FaPause size={20} color="#fff" />
                      ) : (
                        <FaPlay size={20} color="#fff" style={{ marginLeft: '3px' }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="stream-card-content">
                  <h3 className="stream-card-title" style={{
                    color: isCurrentSong ? 'var(--primary)' : 'var(--text-primary)'
                  }}>
                    {song.title}
                  </h3>
                  <p className="stream-card-artist">
                    {song.artist}
                  </p>
                  <div className="stream-card-info">
                    <span className="duration-badge">
                      <FaClock style={{ marginRight: '5px', fontSize: '10px' }} />
                      {songDurations[song.id] || '...'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StreamPage;