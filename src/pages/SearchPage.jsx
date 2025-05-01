import { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaSpinner, FaMusic } from 'react-icons/fa';
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

  useEffect(() => {
    setAnimatedResults([]);

    if (searchResults.length > 0) {
      const animateResults = async () => {
        const newResults = [];
        for (let i = 0; i < searchResults.length && i < 10; i++) {
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

  return (
    <div className="search-page-container">
      <h1 className="page-title">Search for Music</h1>
      <p className="page-subtitle">Discover your favorite songs on Spotify</p>

      <div className="search-global">
        <input
          type="text"
          placeholder="Search for songs or artists..."
          value={inputValue}
          onChange={handleChange}
          aria-label="Search songs"
        />
        {inputValue && !isLoading && (
          <button className="clear-button" onClick={clearSearch}>
            <FaTimes />
          </button>
        )}
        {isLoading && (
          <div className="loading-indicator">
            <FaSpinner className="spinning" />
          </div>
        )}
      </div>

      <div className="results-section">
        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}

        {!searchQuery && !isLoading && (
          <div className="empty-search">
            <div className="search-icon-large">
              <FaSearch />
            </div>
            <p>Results from Spotify</p>
          </div>
        )}

        {searchQuery && animatedResults.length === 0 && !isLoading && (
          <div className="empty-results">
            <p>No results found for "{searchQuery}"</p>
            <p>Try another search term</p>
          </div>
        )}

        <div className="search-results">
          {animatedResults.map((track) => (
            <div
              key={track.id}
              className="search-result-item"
              onClick={() => playSong(track)}
            >
              <div className="track-image">
                {track.cover ? (
                  <img src={track.cover} alt={track.title} />
                ) : (
                  <div className="track-image-placeholder">
                    <FaMusic />
                  </div>
                )}
              </div>
              <div className="track-info">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
              <div className="track-duration">{track.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;