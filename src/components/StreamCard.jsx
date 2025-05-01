import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function StreamCard({ song, isPlaying, onPlay }) {
  const handlePlay = (e) => {
    e.stopPropagation();
    onPlay();
  };

  return (
    <div className={`stream-card ${isPlaying ? 'active' : ''}`}>
      <div className="card-image-container" onClick={handlePlay}>
        <img src={song.cover} alt={song.title} loading="lazy" />
        <button
          className="play-button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '2px' }} />}
        </button>
      </div>
      <div className="card-content">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>
    </div>
  );
}

export default StreamCard;