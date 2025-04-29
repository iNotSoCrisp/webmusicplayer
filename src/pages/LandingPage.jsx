import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Tranition lag fix karne ke liye
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
            A brand new <span className="accent">lofi</span> experience
          </h2>

          <p className="welcome-subtitle">
            Immerse yourself in the perfect ambience
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

      <style jsx="true">{`
        .landing-page {
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .background-video {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .background-video.loaded {
          opacity: 1;
        }

        .landing-content {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .welcome-card {
          background: rgba(13, 15, 27, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 3.5rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.5s ease-out;
        }

        .welcome-card.loaded {
          transform: translateY(0);
          opacity: 1;
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0066FF, #9933FF);
          border-radius: 14px;
          padding: 10px;
          box-shadow: 0 0 25px rgba(0, 102, 255, 0.3);
        }

        .logo-text {
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(135deg, #0066FF, #9933FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .welcome-title {
          font-size: 2.2rem;
          margin: 0 0 1rem;
          background: linear-gradient(135deg, #fff, #b3b3b3);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.3;
        }

        .welcome-title .accent {
          background: linear-gradient(135deg, #0066FF, #9933FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-subtitle {
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 3rem;
          font-size: 1.2rem;
        }

        .start-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #0066FF, #9933FF);
          color: white;
          border: none;
          padding: 1rem 3rem;
          border-radius: 50px;
          font-size: 1.2rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: auto;
          margin: 0 auto 1.5rem;
        }

        .start-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0, 102, 255, 0.4);
        }

        .play-icon {
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .welcome-card {
            padding: 2.5rem;
            margin: 1.5rem;
            max-width: 500px;
          }

          .logo-text {
            font-size: 2rem;
          }

          .welcome-title {
            font-size: 1.8rem;
          }

          .welcome-subtitle {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .welcome-card {
            padding: 2rem;
            margin: 1rem;
          }

          .logo-text {
            font-size: 1.8rem;
          }

          .welcome-title {
            font-size: 1.5rem;
          }

          .welcome-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
          }

          .start-button {
            padding: 0.875rem 2rem;
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;