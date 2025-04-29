import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaSpinner, FaMusic, FaCompactDisc, FaPlay } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function SearchPage() {
  const {
    searchResults,
    searchQuery,
    isLoading,
    error,
    searchSpotify,
    playSong
  } = useMusic();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [animatedResults, setAnimatedResults] = useState([]);
  const [hoveredTrack, setHoveredTrack] = useState(null);


  useEffect(() => {
    setAnimatedResults([]);

    if (searchResults.length > 0) {
      const animateResults = async () => {
        const newResults = [];
      
        for (let i = 0; i < searchResults.length && i < 10; i++) { //top 10 results limit karne ke liye
          newResults.push(searchResults[i]);
          setAnimatedResults([...newResults]);

          await new Promise(resolve => setTimeout(resolve, 50));
        }
      };
      animateResults();
    }
  }, [searchResults]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    searchSpotify(value);
  };

  const clearSearch = () => {
    setInputValue('');
    searchSpotify('');
  };

  // Get a random accent color for each track
  const getAccentColor = (id) => {
    // Create a pseudo-random but consistent color based on id
    const sum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const colors = ['var(--primary)', 'var(--purple-accent)', 'var(--blue-accent)', 'var(--accent)'];
    return colors[sum % colors.length];
  };

  return (
    <div className="search-page-container">
      <div className="page-header">
        <h1 className="page-title">Search for Music</h1>
        <p className="page-subtitle">Discover your favorite songs on Spotify</p>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          placeholder="Search for songs or artists on Spotify..."
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button className="clear-button" onClick={clearSearch}>
            {isLoading ? (
              <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <FaTimes size={16} />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}

      <div>
        {isLoading && !animatedResults.length ? (
          <div className="loading-container">
            <div className="loading-record">
              <FaCompactDisc size={60} className="spinning-disc" />
              <div className="record-center"></div>
              <div className="record-pulses">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="loading-text">Searching Spotify...</div>
          </div>
        ) : (
          <>
            {searchQuery && (
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', marginTop: '30px' }}>
                Top Results for "{searchQuery}"
              </h2>
            )}

            {!searchQuery && (
              <div className="empty-search">
                <div className="search-icon-large">
                  <FaSearch style={{ fontSize: '50px', color: 'var(--purple-accent)', opacity: 0.6 }} />
                  <div className="glow-effect"></div>
                </div>
                <p>Search for your favorite songs and artists</p>
                <p style={{ fontSize: '14px', marginTop: '10px', color: 'var(--accent)' }}>
                  Results from Spotify
                </p>
              </div>
            )}

            {searchQuery && animatedResults.length === 0 && !isLoading && (
              <div className="empty-results">
                <p>No results found for "{searchQuery}"</p>
                <p style={{ fontSize: '14px', marginTop: '10px' }}>Try another search term</p>
              </div>
            )}

            <div className="search-results-table">
              {animatedResults.length > 0 && (
                <div className="search-results-header">
                  <div className="header-number">#</div>
                  <div className="header-title">Title</div>
                  <div className="header-duration">Duration</div>
                </div>
              )}

              <div className="search-results-list">
                {animatedResults.map((track, index) => (
                  <div
                    key={track.id}
                    className="search-result-row"
                    style={{
                      opacity: 0,
                      animation: `fadeInUp 0.5s forwards ${index * 0.08}s`
                    }}
                    onMouseEnter={() => setHoveredTrack(track.id)}
                    onMouseLeave={() => setHoveredTrack(null)}
                    onClick={() => playSong(track)}
                  >
                    <div className="track-number">
                      {hoveredTrack === track.id ? (
                        <FaPlay size={10} color="var(--text-primary)" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    <div className="track-info-container">
                      <div className="track-image-small">
                        {track.cover ? (
                          <img
                            src={track.cover}
                            alt={track.title}
                            className="track-image"
                          />
                        ) : (
                          <div className="track-image-placeholder">
                            <FaMusic size={16} />
                          </div>
                        )}
                      </div>

                      <div className="track-details">
                        <div className="track-title">{track.title}</div>
                        <div className="track-artist">{track.artist}</div>
                      </div>
                    </div>

                    <div className="track-duration">
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;