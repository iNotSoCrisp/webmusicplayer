import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function SearchBar() {
  const { searchSpotify, searchQuery, isLoading } = useMusic();
  const [inputValue, setInputValue] = useState(searchQuery);

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
    <div
      style={{
        position: 'relative',
        maxWidth: '400px',
        width: '100%',
      }}
    >
      <FaSearch
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--light-gray)',
          fontSize: '16px',
        }}
      />
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={inputValue}
        onChange={handleChange}
        style={{
          backgroundColor: '#2e2e2e',
          border: 'none',
          borderRadius: '20px',
          height: '40px',
          width: '100%',
          padding: '0 40px',
          color: 'var(--white)',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      {inputValue && (
        <button
          onClick={clearSearch}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'transparent',
            color: 'var(--light-gray)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
          }}
        >
          {isLoading ? (
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid var(--light-gray)',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }}
            />
          ) : (
            <FaTimes size={14} />
          )}
        </button>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SearchBar;