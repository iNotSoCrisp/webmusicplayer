import { FaMusic } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';
import MusicCard from '../components/MusicCard';

function LibraryPage() {
  const { allPlaylists } = useMusic();

  return (
    <div className="main-content">
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Your Library
      </h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
            Your Playlists
          </h2>
          <p style={{ color: 'var(--light-gray)', fontSize: '14px' }}>
            Browse your personal collection
          </p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'black',
          borderRadius: '20px',
          padding: '8px 16px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          New Playlist
        </button>
      </div>

      {allPlaylists.length > 0 ? (
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
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 0',
          color: 'var(--light-gray)'
        }}>
          <FaMusic style={{ fontSize: '50px', marginBottom: '20px', opacity: 0.6 }} />
          <p style={{ marginBottom: '20px' }}>Your library is empty</p>
          <button style={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '20px',
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Create Your First Playlist
          </button>
        </div>
      )}
    </div>
  );
}

export default LibraryPage;