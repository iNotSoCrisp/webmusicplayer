import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaMusic } from 'react-icons/fa';

function LandingPage() {
  const navigate = useNavigate();

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

      <div className="features-section">
        <div className="feature fade-in">
          <div className="feature-icon-container">
            <div className="feature-icon-bg"></div>
            <FaMusic className="feature-icon" />
          </div>
          <h3>Curated Playlists</h3>
          <p>Specially designed music collections to enhance your mood and productivity</p>
        </div>

        <div className="feature fade-in">
          <div className="feature-icon-container">
            <div className="feature-icon-bg"></div>
            <FaGithub className="feature-icon" />
          </div>
          <h3>Open Source</h3>
          <p>Built with transparency and collaboration at its core</p>
        </div>

        <div className="feature fade-in">
          <div className="feature-icon-container">
            <div className="feature-icon-bg"></div>
            <FaMusic className="feature-icon" />
          </div>
          <h3>Music Library</h3>
          <p>Access a vast collection of carefully selected tracks for every moment</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;