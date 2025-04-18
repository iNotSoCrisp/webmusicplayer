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
  const [songDurations, setSongDurations] = useState({});
  const [loading, setLoading] = useState(true);
  const audioRefs = useRef({});
  const [hoveredSong, setHoveredSong] = useState(null);

  // Effect to load audio durations
  useEffect(() => {
    setLoading(true);
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

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
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

  // Generate skeleton cards for loading state
  const renderSkeletonCards = () => {
    return Array(8).fill().map((_, index) => (
      <div key={`skeleton-${index}`} className="stream-card skeleton" style={{
        animationDelay: `${index * 0.1}s`,
        transform: `translateY(${Math.floor(Math.random() * 15)}px)`,
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15))`
      }}>
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-artist"></div>
          <div className="skeleton-duration"></div>
        </div>
      </div>
    ));
  };

  // Get a random accent color for each card
  const getAccentColor = (id) => {
    // Create a pseudo-random but consistent color based on id
    const sum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colors = ['var(--primary)', 'var(--purple-accent)', 'var(--blue-accent)', 'var(--teal-accent)', 'var(--pink-accent)'];
    return colors[sum % colors.length];
  };

  // Get a gradient for card background
  const getCardGradient = (id, isCurrentSong) => {
    const accentColor = getAccentColor(id);
    if (isCurrentSong) {
      return `linear-gradient(135deg, ${accentColor}20, ${accentColor}35)`;
    }
    return 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))';
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Stream Music</h1>
        <p className="page-subtitle">Listen to your favorite songs from our collection</p>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Filter your streamable songs..."
          value={inputValue}
          onChange={handleChange}
        />
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

        {!loading && filteredCloudinarySongs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 0',
            color: 'var(--text-secondary)',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)'
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
          {loading ? (
            renderSkeletonCards()
          ) : (
            filteredCloudinarySongs.map((song, index) => {
              const isCurrentSong = currentSong.id === song.id;
              const isCurrentlyPlaying = isCurrentSong && isPlaying;
              const isHovered = hoveredSong === song.id;
              const accentColor = getAccentColor(song.id);
              const cardBackground = getCardGradient(song.id, isCurrentSong);

              return (
                <div
                  key={song.id}
                  className="stream-card animated-card"
                  onClick={() => playSong(song)}
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    borderColor: isCurrentSong ? accentColor : 'rgba(255, 255, 255, 0.2)',
                    background: cardBackground,
                    boxShadow: isCurrentSong ? `0 10px 30px ${accentColor}30` : '0 5px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {song.cover ? (
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="stream-card-image"
                        style={{ boxShadow: isCurrentSong ? `0 8px 20px ${accentColor}40` : '0 5px 15px rgba(0, 0, 0, 0.2)' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        aspectRatio: '1',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '12px'
                      }}>
                        <FaMusic size={40} color={accentColor} />
                      </div>
                    )}

                    <div
                      className="play-overlay"
                      style={{ opacity: isCurrentSong || isHovered ? 1 : 0 }}
                    >
                      <div
                        className="play-button-large"
                        style={{
                          background: `linear-gradient(135deg, ${accentColor} 0%, var(--purple-accent) 100%)`,
                          transform: isCurrentlyPlaying || isHovered ? 'scale(1)' : 'scale(0.8)'
                        }}
                      >
                        {isCurrentlyPlaying ? (
                          <FaPause size={20} color="#fff" />
                        ) : (
                          <FaPlay size={20} color="#fff" style={{ marginLeft: '3px' }} />
                        )}
                      </div>
                    </div>

                    {isCurrentlyPlaying && (
                      <div className="playing-waves">
                        <span style={{ background: 'white' }}></span>
                        <span style={{ background: 'white' }}></span>
                        <span style={{ background: 'white' }}></span>
                      </div>
                    )}
                  </div>

                  <div className="stream-card-content">
                    <h3
                      className="stream-card-title"
                      style={{
                        background: isCurrentSong ?
                          `linear-gradient(90deg, ${accentColor}, var(--text-primary))` :
                          'linear-gradient(90deg, var(--text-primary), var(--accent))',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {song.title}
                    </h3>
                    <p className="stream-card-artist">
                      {song.artist}
                    </p>
                    <div className="stream-card-info">
                      <span
                        className="duration-badge"
                        style={{
                          backgroundColor: isCurrentSong ? `${accentColor}30` : 'rgba(255, 255, 255, 0.15)',
                          color: isCurrentSong ? accentColor : 'var(--text-primary)'
                        }}
                      >
                        <FaClock style={{ marginRight: '5px', fontSize: '10px' }} />
                        {songDurations[song.id] || '...'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <style jsx="true">{`
        .stream-card:hover .play-overlay {
          opacity: 1 !important;
        }

        .stream-card:hover .play-button-large {
          transform: scale(1) !important;
        }

        .skeleton {
          animation: pulse 1.5s infinite ease-in-out;
        }

        .skeleton-image {
          width: 100%;
          aspect-ratio: 1;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .skeleton-content {
          padding: 10px 0;
        }

        .skeleton-title {
          height: 18px;
          width: 80%;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-artist {
          height: 14px;
          width: 60%;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .skeleton-duration {
          height: 20px;
          width: 40%;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .animated-card {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeSlideUp 0.5s forwards;
        }

        .playing-waves {
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 100%;
          height: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 3;
        }

        .playing-waves span {
          display: inline-block;
          width: 3px;
          margin: 0 2px;
          background: white;
          border-radius: 3px;
          animation: waves-animation 1.2s infinite ease-in-out;
        }

        .playing-waves span:nth-child(1) {
          height: 10px;
          animation-delay: 0s;
        }

        .playing-waves span:nth-child(2) {
          height: 16px;
          animation-delay: 0.3s;
        }

        .playing-waves span:nth-child(3) {
          height: 12px;
          animation-delay: 0.6s;
        }

        @keyframes waves-animation {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}

export default StreamPage;