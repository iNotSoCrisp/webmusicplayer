import { useEffect } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

function ContactPage() {
  const email = 'shubhikr@proton.me';
  const githubUsername = 'iNotSoCrisp';
  const developerNote = ''; 

  // Animation on mount
  useEffect(() => {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleGithubClick = () => {
    window.open(`https://github.com/${githubUsername}`, '_blank');
  };

  return (
    <div className="contact-container">
      <h1 className="page-title">Get in Touch</h1>

      <div className="contact-grid">
        <div className="contact-card email-card" onClick={handleEmailClick}>
          <div className="card-icon">
            <FaEnvelope size={24} />
          </div>
          <div className="card-content">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
        </div>

        <div className="contact-card github-card" onClick={handleGithubClick}>
          <div className="card-icon">
            <FaGithub size={24} />
          </div>
          <div className="card-content">
            <h3>GitHub</h3>
            <p>@{githubUsername}</p>
          </div>
        </div>

        <div className="contact-card notes-card">
          <h3>Developer Note</h3>
          <p className="developer-note">{developerNote}</p>
        </div>

        <div className="contact-card social-card">
          <h3>More Links</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/shubh-arya-022386191/" target="_blank" className="social-icon linkedin">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;