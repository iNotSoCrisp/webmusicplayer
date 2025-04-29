import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward, FaRandom } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function Player() {
  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    progress,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleProgressChange,
    playRandomSong,
    playNext,
    playPrevious
  } = useMusic();

  const onVolumeChange = (e) => {
    handleVolumeChange(parseInt(e.target.value));
  };

  const onProgressChange = (e) => {
    handleProgressChange(parseInt(e.target.value));
  };

  const handlePlayPause = () => {
    togglePlay();
  };

  const handleRandomPlay = () => {
    playRandomSong();
  };

  const handlePrevious = () => {
    playPrevious();
  };

  const handleNext = () => {
    playNext();
  };

  return (
    <div className="player">
      <div className="song-info">
        {currentSong && currentSong.cover ? (
          <div className="song-image-container">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="song-image"
              style={{
                objectFit: 'cover',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        ) : (
          <div
            className="song-image-container"
            style={{
              backgroundColor: 'rgba(45, 51, 74, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ color: 'var(--text-secondary)', fontSize: '24px' }}>♪</div>
          </div>
        )}
        <div className="song-details">
          <h4>{currentSong ? currentSong.title : 'No song selected'}</h4>
          <p>{currentSong ? currentSong.artist : 'Select a song to play'}</p>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-button" onClick={handlePrevious}>
            <FaStepBackward size={16} />
          </button>
          <button
            className="play-button"
            onClick={handlePlayPause}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} style={{ marginLeft: '2px' }} />}
          </button>
          <button className="control-button" onClick={handleNext}>
            <FaStepForward size={16} />
          </button>
          <button className="control-button" onClick={handleRandomPlay}>
            <FaRandom size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-primary)', marginRight: '8px' }}>{currentTime}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={onProgressChange}
            style={{
              width: '100%',
              height: '4px',
              appearance: 'none',
              background: `linear-gradient(to right, var(--primary) 0%, var(--purple-accent) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
              borderRadius: '2px',
              cursor: 'pointer',
              margin: '0'
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--text-primary)', marginLeft: '8px' }}>{duration}</span>
        </div>
      </div>

      <div className="volume-controls">
        <button onClick={toggleMute} style={{ color: 'var(--text-primary)' }}>
          {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          style={{
            width: '80px',
            height: '4px',
            appearance: 'none',
            background: `linear-gradient(to right, var(--primary) 0%, var(--purple-accent) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`,
            borderRadius: '2px',
            cursor: 'pointer',
            marginLeft: '8px'
          }}
        />
      </div>

      <style jsx="true">{`
        .control-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .play-button {
          background: linear-gradient(135deg, var(--primary) 0%, var(--purple-accent) 100%);
          border: none;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          margin: 0 12px;
          transition: opacity 0.2s ease;
        }

        .play-button:hover {
          opacity: 0.9;
        }

        .song-image-container {
          width: 50px;
          height: 50px;
          margin-right: 12px;
          border-radius: 8px;
          overflow: hidden;
        }

        .song-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .song-details h4 {
          font-size: 14px;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .song-details p {
          font-size: 12px;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .player {
            padding: 12px;
            position: fixed;
            bottom: 60px;
            left: 0;
            right: 0;
            background: rgba(13, 15, 27, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 999;
          }

          .control-buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 8px 0;
            margin: 0 auto;
          }

          .control-button {
            width: 36px !important;
            height: 36px !important;
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: var(--text-primary) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            margin: 0 !important;
          }

          .play-button {
            width: 42px !important;
            height: 42px !important;
            margin: 0 12px !important;
            background: linear-gradient(135deg, var(--primary) 0%, var(--purple-accent) 100%) !important;
            border: none !important;
            box-shadow: 0 0 15px rgba(255, 0, 57, 0.3) !important;
          }

          .song-info {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
          }

          .song-image-container {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }

          .volume-controls {
            display: none;
          }

          input[type="range"] {
            height: 3px;
          }

          .player-controls {
            padding: 0 5px;
          }
        }
      `}</style>
    </div>
  );
}

export default Player;