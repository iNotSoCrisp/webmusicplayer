import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepBackward, FaStepForward, FaRandom } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';
import { useEffect, useRef, useState } from 'react';

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
    cloudinarySongs,
    playRandomSong,
    playNext,
    playPrevious
  } = useMusic();

  const [visualizerBars, setVisualizerBars] = useState([]);
  const visualizerRef = useRef(null);

  // Generate random visualizer bars for visual effect
  useEffect(() => {
    const generateVisualizer = () => {
      const numBars = 28;
      const newBars = [];
      for (let i = 0; i < numBars; i++) {
        // Generate heights between 10% and 90%
        const height = isPlaying
          ? Math.floor(Math.random() * 80) + 10
          : Math.floor(Math.random() * 20) + 5;
        newBars.push(height);
      }
      setVisualizerBars(newBars);
    };

    // Initial generation
    generateVisualizer();

    // Update visualizer while playing
    let interval;
    if (isPlaying) {
      interval = setInterval(generateVisualizer, 200);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const onVolumeChange = (e) => {
    handleVolumeChange(parseInt(e.target.value));
  };

  const onProgressChange = (e) => {
    handleProgressChange(parseInt(e.target.value));
  };

  const getBarColor = (index) => {
    // Create a spectrum of colors across visualizer bars
    if (index % 3 === 0) return 'var(--primary)';
    if (index % 3 === 1) return 'var(--purple-accent)';
    return 'var(--blue-accent)';
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
            {isPlaying && (
              <div className="playing-waves">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
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
          <h4 style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
            {currentSong ? currentSong.title : 'No song selected'}
          </h4>
          <p style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
            {currentSong ? currentSong.artist : 'Select a song to play'}
          </p>
        </div>
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button className="control-button" onClick={handlePrevious}>
            <FaStepBackward />
          </button>
          <button
            className="play-button"
            onClick={handlePlayPause}
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--purple-accent) 100%)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 0 15px rgba(255, 0, 57, 0.3)',
              margin: '0 15px'
            }}
          >
            {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} style={{ marginLeft: '2px' }} />}
          </button>
          <button className="control-button" onClick={handleNext}>
            <FaStepForward />
          </button>
          <button
            className="control-button"
            onClick={handleRandomPlay}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--text-primary)',
              transition: 'all 0.3s ease',
              marginLeft: '10px'
            }}
          >
            <FaRandom size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-primary)', marginRight: '8px', fontWeight: '500' }}>{currentTime}</span>

          {/* Visualizer bars */}
          <div
            ref={visualizerRef}
            style={{
              position: 'absolute',
              left: '30px',
              right: '30px',
              height: '20px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              zIndex: 0
            }}
          >
            {visualizerBars.map((height, index) => (
              <div
                key={index}
                style={{
                  width: '2px',
                  height: `${height}%`,
                  backgroundColor: getBarColor(index),
                  opacity: 0.4,
                  borderRadius: '1px',
                  transition: 'height 0.2s ease'
                }}
              />
            ))}
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={onProgressChange}
            style={{
              width: '100%',
              height: '6px', /* Increased height for better visibility */
              appearance: 'none',
              background: `linear-gradient(to right, var(--primary) 0%, var(--purple-accent) ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
              borderRadius: '3px',
              cursor: 'pointer',
              margin: '0',
              position: 'relative',
              zIndex: 1
            }}
          />
          <span style={{ fontSize: '12px', color: 'var(--text-primary)', marginLeft: '8px', fontWeight: '500' }}>{duration}</span>
        </div>
      </div>

      <div className="volume-controls">
        <button
          onClick={toggleMute}
          style={{ color: 'var(--text-primary)' }}
        >
          {isMuted || volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={onVolumeChange}
          style={{
            width: '100px',
            height: '5px',
            appearance: 'none',
            background: `linear-gradient(to right, var(--blue-accent) 0%, var(--purple-accent) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`,
            borderRadius: '3px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        />
      </div>

      <style jsx="true">{`
        .control-button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .control-button:hover {
          color: var(--purple-accent);
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .play-button {
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(127, 90, 240, 0.5);
        }

        .song-image-container {
          position: relative;
          width: 60px;
          height: 60px;
          margin-right: 15px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          z-index: 5;
        }

        .song-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .song-image-container:hover .song-image {
          transform: scale(1.1);
        }

        .song-image-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,0,57,0.2), rgba(127,90,240,0.2));
          z-index: 1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .song-image-container:hover::before {
          opacity: 1;
        }

        .playing-waves {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 20px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
        }

        .playing-waves span {
          display: inline-block;
          width: 3px;
          margin: 0 2px;
          background: white;
          border-radius: 3px;
          animation: waves-animation 1.2s infinite ease-in-out;
        }

        .playing-waves span:nth-child(1) {
          height: 10px;
          animation-delay: 0s;
        }

        .playing-waves span:nth-child(2) {
          height: 16px;
          animation-delay: 0.3s;
        }

        .playing-waves span:nth-child(3) {
          height: 12px;
          animation-delay: 0.6s;
        }

        .playing-waves span:nth-child(4) {
          height: 8px;
          animation-delay: 0.9s;
        }

        @keyframes waves-animation {
          0% {
            height: 5px;
          }
          50% {
            height: 15px;
          }
          100% {
            height: 5px;
          }
        }

        @media (max-width: 768px) {
          .control-buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 10px;
          }

          .control-button {
            width: 36px;
            height: 36px;
          }

          .play-button {
            width: 44px;
            height: 44px;
          }
        }
      `}</style>
    </div>
  );
}

export default Player;