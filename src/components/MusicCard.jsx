import { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function MusicCard({ id, name, description, cover }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, currentSong, playPlaylist } = useMusic();


  const isThisPlaying = isPlaying && currentSong?.album === name;

  const handlePlayClick = (e) => {
    e.stopPropagation();
    playPlaylist(id);
  };

  return (
    <div
      className="music-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => playPlaylist(id)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative' }}>
        <img src={cover} alt={name} className="album-cover" />
        <button
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '8px',
            backgroundColor: 'var(--primary)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered || isThisPlaying ? '1' : '0',
            transition: 'opacity 0.3s ease, transform 0.2s ease',
            boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
            transform: isThisPlaying ? 'scale(1.1)' : 'scale(1)'
          }}
          onClick={handlePlayClick}
        >
          {isThisPlaying ? <FaPause size={15} color="#000" /> : <FaPlay size={15} color="#000" />}
        </button>
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
}

export default MusicCard;