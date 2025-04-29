import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // smoooothhhh loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.documentElement.classList.add('loaded');
    }, 100);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('loaded');
    };
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="landing-page">

      <div className="video-background">
        <video
          className={`background-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          preload="auto"
        >
          <source
            src="https://res.cloudinary.com/dkyknciiv/video/upload/v1745883004/2984380-hd_1920_1080_24fps_pi0cyj.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Main Content */}
      <main className="landing-content">
        <div className={`welcome-card ${isLoaded ? 'loaded' : ''}`}>
          <div className="logo-section">
            <div className="logo-icon">
              <img src="/vite.svg" alt="BeatProbe Logo" width="32" height="32" />
            </div>
            <h1 className="logo-text">BeatProbe</h1>
          </div>

          <h2 className="welcome-title">
            Explore songs. Play what’s possible.
             <span className="accent"></span>
          </h2>

          <p className="welcome-subtitle">
            
          </p>

          <button
            className="start-button"
            onClick={() => navigate('/app/home')}
          >
            <FaPlay className="play-icon" />
            <span>Get Started</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;