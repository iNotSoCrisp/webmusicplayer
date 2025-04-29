import { useState, useEffect } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function ContactPage() {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [notes, setNotes] = useState('');

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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), 2000);
  };

  return (
    <div className="contact-container">
      <h1 className="page-title">Get in Touch</h1>

      <div className="contact-grid">
        <div className="contact-card email-card" onClick={() => handleCopy('your.email@example.com')}>
          <div className="card-icon">
            <FaEnvelope size={24} />
          </div>
          <div className="card-content">
            <h3>Email</h3>
            <p>your.email@example.com</p>
          </div>
          {showCopyMessage && (
            <div className="copy-message">Copied to clipboard!</div>
          )}
        </div>

        <div className="contact-card github-card" onClick={() => handleCopy('@yourusername')}>
          <div className="card-icon">
            <FaGithub size={24} />
          </div>
          <div className="card-content">
            <h3>GitHub</h3>
            <p>@yourusername</p>
          </div>
        </div>

        <div className="contact-card notes-card">
          <h3>Notes</h3>
          <textarea
            placeholder="Add your personal notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="contact-card social-card">
          <h3>More Links</h3>
          <div className="social-links">
            <a href="#" className="social-icon linkedin">
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="social-icon twitter">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;