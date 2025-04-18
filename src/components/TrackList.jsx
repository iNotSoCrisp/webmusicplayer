import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';
import { useMusic } from '../context/MusicContext';

function TrackList({ tracks, title }) {
  const { playSong, currentSong, isPlaying } = useMusic();

  if (!tracks || tracks.length === 0) {
    return null;
  }

  return (
    <div className="track-list">
      {title && <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{title}</h2>}

      <div className="tracks-container">
        {tracks.map(track => {
          const isCurrentTrack = currentSong.id === track.id;

          return (
            <div
              key={track.id}
              className="track-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: isCurrentTrack ? 'rgba(29, 185, 84, 0.1)' : 'transparent',
                borderRadius: '4px',
                marginBottom: '8px',
                transition: 'background-color 0.2s',
                cursor: 'pointer'
              }}
              onClick={() => playSong(track)}
            >
              <div style={{ position: 'relative', width: '48px', height: '48px', marginRight: '16px' }}>
                {track.cover ? (
                  <img
                    src={track.cover}
                    alt={track.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#2e2e2e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px'
                  }}>
                    <FaMusic />
                  </div>
                )}

                <button
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isCurrentTrack ? '1' : '0',
                    transition: 'opacity 0.2s'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isCurrentTrack) {
                      // Toggle play/pause for current track
                      useMusic().togglePlay();
                    } else {
                      // Play this track
                      playSong(track);
                    }
                  }}
                  className="play-button-hover"
                >
                  {isCurrentTrack && isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontWeight: isCurrentTrack ? 'bold' : 'normal',
                  color: isCurrentTrack ? 'var(--primary)' : 'var(--white)',
                  fontSize: '14px',
                  marginBottom: '5px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                  {track.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--light-gray)',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}>
                  {track.artist}
                </div>
              </div>

              <div style={{
                fontSize: '12px',
                color: 'var(--light-gray)',
                marginLeft: '10px',
                whiteSpace: 'nowrap'
              }}>
                {track.duration}
              </div>

              {!track.preview && (
                <div style={{
                  fontSize: '10px',
                  color: 'var(--light-gray)',
                  marginLeft: '10px',
                  padding: '3px 6px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap'
                }}>
                  No Preview
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrackList;