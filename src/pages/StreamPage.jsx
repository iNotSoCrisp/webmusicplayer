import { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch, FaTimes, FaPlay, FaPause, FaMusic, FaClock } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function StreamPage() {
  const {
    filteredCloudinarySongs,
    cloudinarySearchQuery,
    searchCloudinary,
    playSong,
    currentSong,
    isPlaying,
    playRandomSong
  } = useMusic();

  const [inputValue, setInputValue] = useState(cloudinarySearchQuery);
  const [songDurations, setSongDurations] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [displayedSongs, setDisplayedSongs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const audioRefs = useRef({});
  const observerRef = useRef();
  const imageObserverRef = useRef();
  const SONGS_PER_PAGE = 12;

  // Load initial songs
  useEffect(() => {
    setDisplayedSongs([]);
    setPage(1);
    loadSongs(1, true);
  }, [filteredCloudinarySongs]);

  // Load songs for a specific page
  const loadSongs = useCallback((pageNum, reset = false) => {
    setLoadingMore(true);
    const startIndex = (pageNum - 1) * SONGS_PER_PAGE;
    const endIndex = startIndex + SONGS_PER_PAGE;
    const newSongs = filteredCloudinarySongs.slice(startIndex, endIndex);

    setDisplayedSongs(prev => reset ? newSongs : [...prev, ...newSongs]);
    setHasMore(endIndex < filteredCloudinarySongs.length);
    setLoadingMore(false);
    setLoading(false);
  }, [filteredCloudinarySongs]);

  // Setup image intersection observer
  useEffect(() => {
    imageObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const songId = entry.target.dataset.songId;
            if (songId && !loadedImages[songId]) {
              setLoadedImages(prev => ({ ...prev, [songId]: true }));
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      if (imageObserverRef.current) {
        imageObserverRef.current.disconnect();
      }
    };
  }, []);

  // Intersection Observer for infinite scroll
  const lastSongRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        loadSongs(nextPage);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, page, loadingMore, loadSongs]);

  // Handle song play and load metadata only when needed
  const handlePlaySong = async (song) => {
    if (!songDurations[song.id]) {
      try {
        const audio = new Audio(song.audioUrl);

        await new Promise((resolve, reject) => {
          audio.addEventListener('loadedmetadata', () => {
            setSongDurations(prev => ({
              ...prev,
              [song.id]: formatDuration(audio.duration)
            }));
            resolve();
          });

          audio.addEventListener('error', reject);

          // Timeout after 10 seconds
          setTimeout(() => reject(new Error('Timeout')), 10000);
        });
      } catch (error) {
        console.error('Error loading audio:', error);
        setSongDurations(prev => ({
          ...prev,
          [song.id]: 'N/A'
        }));
      }
    }

    playSong(song);
  };

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
      <div key={`skeleton-${index}`} className="stream-card skeleton">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-title"></div>
          <div className="skeleton-artist"></div>
          <div className="skeleton-duration"></div>
        </div>
      </div>
    ));
  };

  const observeImage = useCallback((node) => {
    if (node && imageObserverRef.current) {
      imageObserverRef.current.observe(node);
    }
  }, []);

  return (
    <div className="stream-page-container">
      <div className="page-header">
        <h1 className="page-title">Stream Music</h1>
        <p className="page-subtitle">Discover and play your favorite tracks</p>
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

        {!loading && displayedSongs.length === 0 && (
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
          {loading ? renderSkeletonCards() : (
            displayedSongs.map((song, index) => {
              const isCurrentSong = currentSong.id === song.id;
              const isCurrentlyPlaying = isCurrentSong && isPlaying;
              const isHovered = hoveredSong === song.id;
              const shouldLoadImage = loadedImages[song.id];

              const isLastSong = index === displayedSongs.length - 1;
              const ref = isLastSong ? lastSongRef : null;

              return (
                <div
                  key={song.id}
                  ref={ref}
                  className="stream-card"
                  onClick={() => handlePlaySong(song)}
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                >
                  <div
                    style={{ position: 'relative' }}
                    ref={observeImage}
                    data-song-id={song.id}
                  >
                    {song.cover ? (
                      shouldLoadImage ? (
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="stream-card-image"
                          loading="lazy"
                        />
                      ) : (
                        <div className="stream-card-image placeholder-image">
                          <FaMusic size={30} color="var(--text-secondary)" />
                        </div>
                      )
                    ) : (
                      <div className="stream-card-image placeholder-image">
                        <FaMusic size={30} color="var(--text-secondary)" />
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

                    {isCurrentlyPlaying && (
                      <div className="playing-waves">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )}
                  </div>

                  <div className="stream-card-content">
                    <h3 className="stream-card-title">
                      {song.title}
                    </h3>
                    <p className="stream-card-artist">
                      {song.artist}
                    </p>
                    <div className="stream-card-info">
                      <span className="duration-badge">
                        <FaClock style={{ marginRight: '5px', fontSize: '10px' }} />
                        {songDurations[song.id] || '--:--'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {loadingMore && hasMore && (
          <div className="loading-more">
            <div className="loading-spinner"></div>
            <p>Loading more songs...</p>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .stream-page-container {
          padding: 2rem;
        }

        .stream-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          padding: 1rem 0;
        }

        .stream-card-image {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          border-radius: 12px;
          background-color: var(--background-light);
          transition: transform 0.3s ease;
        }

        .placeholder-image {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background-light);
        }

        .loading-more {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
        }

        .loading-spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .skeleton {
          animation: pulse 1.5s infinite ease-in-out;
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