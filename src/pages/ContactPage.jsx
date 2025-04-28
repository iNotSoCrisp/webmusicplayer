import { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function ContactPage() {
  const [notes, setNotes] = useState(localStorage.getItem('contactNotes') || '');
  const [email] = useState('your.email@example.com');
  const [github] = useState('yourusername');
  const [copied, setCopied] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const notesRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('contactNotes', notes);
  }, [notes]);

  useEffect(() => {
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMouseEnter = (link) => {
    setActiveLink(link);
  };

  const handleMouseLeave = () => {
    setActiveLink(null);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get in Touch</h1>

      <div className="contact-grid">
        <div
          className="contact-card email-card"
          onMouseEnter={() => handleMouseEnter('email')}
          onMouseLeave={handleMouseLeave}
          onClick={() => copyToClipboard(email, 'email')}
        >
          <div className="card-icon">
            <FaEnvelope size={32} />
          </div>
          <div className="card-content">
            <h3>Email</h3>
            <p>{email}</p>
            <span className={`copy-message ${copied === 'email' ? 'visible' : ''}`}>
              Copied to clipboard!
            </span>
          </div>
          <div className={`card-hover-overlay ${activeLink === 'email' ? 'active' : ''}`}>
            <span>Click to copy</span>
          </div>
        </div>

        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card github-card"
          onMouseEnter={() => handleMouseEnter('github')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-icon">
            <FaGithub size={32} />
          </div>
          <div className="card-content">
            <h3>GitHub</h3>
            <p>@{github}</p>
          </div>
          <div className={`card-hover-overlay ${activeLink === 'github' ? 'active' : ''}`}>
            <span>Visit profile</span>
          </div>
        </a>

        <div className="contact-card notes-card">
          <h3>Notes</h3>
          <textarea
            ref={notesRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your personal notes here..."
          />
        </div>

        <div className="contact-card social-card">
          <h3>More Links</h3>
          <div className="social-links">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon twitter"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;