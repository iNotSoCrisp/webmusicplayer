import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import StreamCard from '../components/StreamCard';

function StreamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    cloudinarySongs,
    currentSong,
    isPlaying,
    playSong
  } = useMusic();

  const filteredSongs = cloudinarySongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlay = (song) => {
    playSong(song);
  };

  return (
    <div className="stream-page-container">
      <h1 className="page-title">Stream Music</h1>
      <p className="page-subtitle">Discover and play your favorite tracks</p>

      <div className="search-global">
        <input
          type="text"
          placeholder="Filter your streamable songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search songs"
        />
      </div>

      <h2>Your Streamable Tracks</h2>

      <div className="songs-grid">
        {filteredSongs.map((song) => (
          <StreamCard
            key={song.id}
            song={song}
            isPlaying={currentSong?.id === song.id && isPlaying}
            onPlay={() => handlePlay(song)}
          />
        ))}
      </div>
    </div>
  );
}

export default StreamPage;