import { useState } from 'react';
import MusicCard from './MusicCard';
import TrackList from './TrackList';
import SearchBar from './SearchBar';
import { useMusic } from '../context/MusicContext';
import { FaSpinner } from 'react-icons/fa';

function MainContent() {
  const {
    allPlaylists,
    trendingTracks,
    exploreTracks,
    searchResults,
    searchQuery,
    isLoading,
    error
  } = useMusic();

  const [greeting, setGreeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  });

  return (
    <div className="main-content">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{searchQuery ? 'Search Results' : greeting}</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <SearchBar />
          <button style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Upgrade
          </button>
          <button style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold'
          }}>
            Profile
          </button>
        </div>
      </header>

      {error && (
        <div style={{
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          color: '#ff9999',
          padding: '10px 15px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {isLoading && !searchResults.length && !trendingTracks.length && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          flexDirection: 'column',
          color: 'var(--light-gray)'
        }}>
          <FaSpinner style={{
            fontSize: '40px',
            marginBottom: '10px',
            animation: 'spin 1s linear infinite'
          }} />
          <p>Loading music...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {searchQuery ? (
        // Search results view
        <>
          <TrackList
            tracks={searchResults}
            title={`Results for "${searchQuery}"`}
          />

          {searchResults.length === 0 && !isLoading && (
            <div style={{
              textAlign: 'center',
              color: 'var(--light-gray)',
              marginTop: '50px'
            }}>
              No results found for "{searchQuery}"
            </div>
          )}
        </>
      ) : (
        // Home view with playlists and trending tracks
        <>
          <section>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Your Playlists</h2>
            <div className="music-grid">
              {allPlaylists.map(playlist => (
                <MusicCard
                  key={playlist.id}
                  id={playlist.id}
                  name={playlist.name}
                  description={playlist.description}
                  cover={playlist.cover}
                />
              ))}
            </div>
          </section>

          <section style={{ marginTop: '40px' }}>
            <TrackList
              tracks={trendingTracks}
              title="Trending Tracks"
            />
          </section>

          <section style={{ marginTop: '40px' }}>
            <TrackList
              tracks={exploreTracks}
              title="Explore New Music"
            />
          </section>
        </>
      )}
    </div>
  );
}

export default MainContent;