import React from 'react';
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
    handleProgressChangeEnd,
    playNext,
    playPrevious,
    playRandomSong
  } = useMusic();

  if (!currentSong) return null;

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
          <button className="control-button" onClick={playPrevious}>
            <FaStepBackward size={16} />
          </button>
          <button
            className="player-play-button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} style={{ marginLeft: '3px' }} />}
          </button>
          <button className="control-button" onClick={playNext}>
            <FaStepForward size={16} />
          </button>
          <button className="control-button" onClick={playRandomSong}>
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
            onChange={handleProgressChange}
            onMouseUp={handleProgressChangeEnd}
            onTouchEnd={handleProgressChangeEnd}
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
        <button onClick={toggleMute} style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
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
          transition: all 0.2s ease;
        }

        .control-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .player-play-button {
          background: linear-gradient(135deg, var(--primary) 0%, var(--purple-accent) 100%);
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          margin: 0 12px;
          transition: all 0.2s ease;
          box-shadow: 0 0 15px rgba(255, 0, 57, 0.3);
        }

        .player-play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 0, 57, 0.4);
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

          .player-play-button {
            width: 45px !important;
            height: 45px !important;
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

        input[type="range"] {
          -webkit-appearance: none;
          height: 4px;
          background: transparent;
          cursor: pointer;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: none;
          margin-top: -4px;
          box-shadow: 0 0 10px rgba(255, 0, 57, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 0, 57, 0.3);
        }

        input[type="range"]:hover::-webkit-slider-thumb {
          transform: scale(1.2);
        }

        input[type="range"]:hover::-moz-range-thumb {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}

export default Player;