import { useEffect } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

function ContactPage() {
  const email = 'shubhikr@proton.me';
  const githubUsername = 'iNotSoCrisp';

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
            <FaEnvelope />
          </div>
          <div className="card-content">
            <h3>Email</h3>
            <p>{email}</p>
          </div>
        </div>

        <div className="contact-card github-card" onClick={handleGithubClick}>
          <div className="card-icon">
            <FaGithub />
          </div>
          <div className="card-content">
            <h3>GitHub</h3>
            <p>@{githubUsername}</p>
          </div>
        </div>

        <div className="contact-card notes-card">
          <h3>🎧 Developer's Note</h3>
          <p>
            Hey there! So here's a fun little twist about this app... <br /><br />

            You can <strong>search for any song</strong> using the Spotify API—artist names, song titles, everything shows up just fine. But when you try to <strong>play them</strong>, well... nothing happens. <br />
            <strong>Why?</strong><br />
            Because Spotify no longer provides those sweet 30-second preview clips to developers like me. Sad, I know. I asked. They ghosted me. <br /><br />

            So what did I do? I built a <strong>Stream section</strong> instead, where I've personally uploaded a bunch of songs using a cloud service. That's where the real music lives now. 🎵 <br /><br />

            So to recap:<br />
            - <strong>Search</strong> page: Great for looking up songs... just don't expect sound. Pretty useless right? IK <br />
            - <strong>Stream</strong> page: That's where your ears should be. <br /><br />

            I know it's a bit funky, but hey—I worked with what I had. Thanks for checking it out anyway. You're awesome. 😄 <br /><br />

            — <em>Crisp (Shubh)</em>
          </p>
        </div>

        <div className="contact-card social-card">
          <h3>More Links</h3>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/shubh-arya-022386191/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;