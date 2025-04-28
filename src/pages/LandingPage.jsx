import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaMusic } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoConfig = {
    url: "https://res.cloudinary.com/dkyknciiv/video/upload/v1745883004/2984380-hd_1920_1080_24fps_pi0cyj.mp4",
    fallbackImage: "/assets/lofi-desk-bg.jpg"
  };

  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      const parallaxItems = document.querySelectorAll('.parallax');

      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollY * 0.002);
      }

      parallaxItems.forEach((item) => {
        const speed = item.getAttribute('data-speed');
        item.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Animation when page loads
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('active');
      }, 200 * index);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/app/home');
  };

  return (
    <div className="landing-page">
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`background-video ${isVideoLoaded ? 'loaded' : ''}`}
          poster={videoConfig.fallbackImage}
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoConfig.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="landing-overlay"></div>

      <div className="hero-section">
        <div className="hero-content">
          <div className="logo-container fade-in">
            <div className="logo-icon">
              <FaMusic size={40} />
            </div>
            <h1 className="logo-text">BeatProbe</h1>
          </div>

          <h2 className="hero-title fade-in">
            A brand new <span className="accent">lofi</span> experience
          </h2>

          <p className="hero-subtitle fade-in">
            Immerse yourself in the perfect ambience for focus, relaxation, and creativity
          </p>

          <button
            className="get-started-btn fade-in"
            onClick={handleGetStarted}
          >
            Get Started
          </button>

          <div className="platforms fade-in">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="platform-link">
              <FaGithub size={24} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="parallax-container">
          <div className="parallax-item parallax lamp" data-speed="-0.2"></div>
          <div className="parallax-item parallax plant-left" data-speed="0.1"></div>
          <div className="parallax-item parallax plant-right" data-speed="0.15"></div>
          <div className="parallax-item parallax window-light" data-speed="-0.05"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;