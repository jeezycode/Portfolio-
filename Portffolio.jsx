import { useState, useEffect } from 'react';

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      return;
    }
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  const projects = [
    { id: 1, title: "MedTime", category: "Healthcare App", year: "2024", color: "#E8D5B7",
      description: "Designing an app to help people remember to take their medication on time through smart reminders and a stress-free experience.",
      fullDescription: "Missed medication doses are a common but dangerous problem, especially for people managing chronic conditions or caring for others. In this project, I designed a mobile application that helps users remember to take their medication on time through smart reminders, clear scheduling, and a simple, stress-free experience. The goal was not just to send reminders, but to reduce cognitive load, build trust, and support healthy daily routines.",
      role: "Lead Product Designer", duration: "1 month", tools: ["Figma"],
      highlights: ["Conducted 10 interviews with patients, caregivers, and pharmacists", "Created an accessible mobile UI for diverse age groups", "Simplified complex medication schedules into clear daily flows", "Delivered a complete mobile app concept from problem to solution"] },
    {
      id: 2,
      title: "Greenhouse",
      category: "SaaS Platform",
      year: "2024",
      description: "Redesigning the onboarding experience for a B2B sustainability tracking platform.",
      color: "#B8D4E3",
      fullDescription: "Greenhouse helps enterprises track and reduce their carbon footprint. I led the complete redesign of their onboarding experience, focusing on reducing time-to-value for new customers.",
      role: "Senior Product Designer",
      duration: "4 months",
      tools: ["Figma", "Amplitude", "Loom"],
      highlights: [
        "Reduced onboarding time from 2 weeks to 3 days",
        "Designed interactive data import wizards",
        "Created contextual help system reducing support tickets by 50%",
        "Established new information architecture for complex data views"
      ]
    },
    {
      id: 3,
      title: "Kinetic",
      category: "Health & Fitness",
      year: "2023",
      description: "A wearable companion app focused on movement quality and injury prevention.",
      color: "#D4B8D9",
      fullDescription: "Kinetic pairs with smart wearables to analyze movement patterns and provide real-time feedback to prevent injuries. The app targets fitness enthusiasts and professional athletes.",
      role: "Product Designer",
      duration: "8 months",
      tools: ["Figma", "Principle", "After Effects"],
      highlights: [
        "Designed real-time motion visualization interfaces",
        "Created adaptive workout recommendations based on fatigue levels",
        "Built accessibility features for visually impaired athletes",
        "Designed Apple Watch complications and widgets"
      ]
    },
    {
      id: 4,
      title: "Mosaic",
      category: "Design System",
      year: "2023",
      description: "Building a scalable component library serving 12 product teams.",
      color: "#C4D9B8",
      fullDescription: "Mosaic is a comprehensive design system built to unify the product experience across multiple teams and platforms. It includes foundations, components, patterns, and extensive documentation.",
      role: "Design System Lead",
      duration: "12 months",
      tools: ["Figma", "Storybook", "Zeroheight"],
      highlights: [
        "Created 300+ reusable components with variants",
        "Established design tokens for consistent theming",
        "Reduced design-to-development handoff time by 60%",
        "Built contribution guidelines adopted by 50+ designers"
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/joelboachie' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/joelboachie' },
    { name: 'Dribbble', url: 'https://dribbble.com/joelboachie' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      color: '#F5F5F0',
      fontFamily: '"Playfair Display", Georgia, serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Cursor follower */}
      <div className="cursor-follower" style={{
        position: 'fixed',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,213,183,0.08) 0%, transparent 70%)',
        transform: `translate(${mousePos.x - 150}px, ${mousePos.y - 150}px)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'transform 0.3s ease-out'
      }} />

      {/* Navigation */}
      <nav className="nav">
        <button 
          className="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'none',
            border: 'none',
            color: '#F5F5F0',
            cursor: 'pointer'
          }}
        >
          JB © 2024
        </button>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: '#F5F5F0',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
          }} />
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: '#F5F5F0',
            margin: '6px 0',
            opacity: mobileMenuOpen ? 0 : 1,
            transition: 'all 0.3s ease'
          }} />
          <span style={{
            display: 'block',
            width: '24px',
            height: '2px',
            background: '#F5F5F0',
            transition: 'all 0.3s ease',
            transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
          }} />
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {['Work', 'About', 'Contact'].map((item, i) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              style={{
                color: '#F5F5F0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(-20px)',
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.1}s`,
                position: 'relative',
                fontFamily: '"Space Mono", monospace',
                fontSize: '12px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-line" style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '1px',
          height: loaded ? '200px' : '0',
          background: 'linear-gradient(to bottom, transparent, #E8D5B7, transparent)',
          transition: 'height 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
        }} />
        
        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '12px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#E8D5B7',
          marginBottom: '24px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
        }}>
          Product Designer
        </p>

        <h1 className="hero-title">
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
          }}>
            Joel
          </span>
          <span style={{
            display: 'block',
            fontStyle: 'italic',
            color: '#E8D5B7',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s'
          }}>
            Boachie
          </span>
        </h1>

        <button 
          className="scroll-indicator"
          onClick={() => scrollToSection('work')}
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1s ease 1.2s',
            background: 'none',
            border: 'none',
            color: '#F5F5F0',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '48px',
            height: '1px',
            background: '#F5F5F0'
          }} />
          <span style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            Scroll to explore
          </span>
        </button>
      </section>

      {/* Projects Section */}
      <section id="work" className="section-work">
        <div className="section-header">
          <h2 style={{
            fontSize: '14px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: '#E8D5B7'
          }}>
            Selected Work
          </h2>
          <span style={{
            fontSize: '14px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.1em',
            color: '#666'
          }}>
            ( 0{projects.length} )
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              onClick={() => setSelectedProject(project)}
              className="project-item"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
            >
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                background: activeProject === project.id ? project.color : 'transparent',
                opacity: 0.05,
                transition: 'all 0.4s ease'
              }} />
              
              <div style={{ position: 'relative', gridColumn: 'span 1' }}>
                <h3 className="project-title" style={{
                  fontWeight: 400,
                  margin: 0,
                  transform: activeProject === project.id ? 'translateX(24px)' : 'translateX(0)',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {project.title}
                </h3>
                <p className="project-desc" style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '12px',
                  color: '#888',
                  marginTop: '8px',
                  maxHeight: activeProject === project.id ? '60px' : '0',
                  overflow: 'hidden',
                  opacity: activeProject === project.id ? 1 : 0,
                  transform: activeProject === project.id ? 'translateX(24px)' : 'translateX(0)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}>
                  {project.description}
                </p>
              </div>
              
              <span className="project-category" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#666',
                position: 'relative'
              }}>
                {project.category}
              </span>
              
              <span className="project-year" style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '12px',
                color: '#444',
                textAlign: 'right',
                position: 'relative'
              }}>
                {project.year}
              </span>

              <div className="project-arrow" style={{
                position: 'absolute',
                right: '0',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: activeProject === project.id ? 1 : 0,
                transform: activeProject === project.id ? 'translateX(0) rotate(0deg)' : 'translateX(-20px) rotate(-45deg)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8D5B7" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="modal-header" style={{ borderLeft: `3px solid ${selectedProject.color}` }}>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#888'
              }}>
                {selectedProject.category}
              </span>
              <h2 style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: 400,
                margin: '16px 0',
                lineHeight: 1
              }}>
                {selectedProject.title}
              </h2>
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '14px',
                color: '#888',
                lineHeight: 1.6
              }}>
                {selectedProject.fullDescription}
              </p>
            </div>

            <div className="modal-meta">
              <div>
                <h4>Role</h4>
                <p>{selectedProject.role}</p>
              </div>
              <div>
                <h4>Duration</h4>
                <p>{selectedProject.duration}</p>
              </div>
              <div>
                <h4>Tools</h4>
                <p>{selectedProject.tools.join(', ')}</p>
              </div>
            </div>

            <div className="modal-highlights">
              <h4>Key Highlights</h4>
              <ul>
                {selectedProject.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>

            <button className="modal-cta">
              View Full Project
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* About Section */}
      <section id="about" className="section-about">
        <div>
          <h2 style={{
            fontSize: '14px',
            fontFamily: '"Space Mono", monospace',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontWeight: 400,
            color: '#E8D5B7',
            marginBottom: '48px'
          }}>
            About
          </h2>

          <div className="profile-image-container" style={{
            position: 'relative',
            marginBottom: '48px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              right: '8px',
              bottom: '8px',
              border: '1px solid #E8D5B7',
              opacity: 0.3
            }} />
            <img 
              src="joel-profile.jpg" 
              alt="Joel Boachie"
              style={{
                width: '100%',
                maxWidth: '320px',
                height: 'auto',
                display: 'block',
                filter: 'grayscale(100%) contrast(1.1)',
                position: 'relative'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-16px',
              right: '-16px',
              width: '80px',
              height: '80px',
              border: '1px solid #E8D5B7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#0A0A0A'
            }}>
              <span style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '24px',
                fontStyle: 'italic',
                color: '#E8D5B7'
              }}>JB</span>
            </div>
          </div>
          
          <p className="about-headline" style={{
            lineHeight: 1.5,
            fontWeight: 400,
            color: '#CCC'
          }}>
            I craft{' '}
            <em style={{ color: '#F5F5F0', fontStyle: 'italic' }}>intuitive</em>{' '}
            digital products that solve real problems and delight users along the way.
          </p>
          
          <p style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#888',
            marginTop: '32px',
            fontFamily: '"Space Mono", monospace'
          }}>
            Product designer with a focus on building user-centered experiences from 0→1. I thrive at the intersection of research, strategy, and craft—turning complex problems into elegant solutions.
          </p>
        </div>

        <div className="about-details">
          <div>
            <h3 style={{
              fontSize: '11px',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '16px'
            }}>
              Services
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '18px'
            }}>
              {['Product Strategy', 'UX/UI Design', 'Design Systems', 'Prototyping'].map((service) => (
                <li key={service} style={{
                  padding: '12px 0',
                  borderBottom: '1px solid #222'
                }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '11px',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#666',
              marginBottom: '16px'
            }}>
              Recognition
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              fontSize: '14px',
              fontFamily: '"Space Mono", monospace',
              color: '#888'
            }}>
              {['Awwwards SOTD 2024', 'CSS Design Awards', 'Featured in Typewolf'].map((award) => (
                <li key={award} style={{ padding: '8px 0' }}>
                  {award}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-contact">
        <div style={{
          position: 'absolute',
          top: 0,
          left: '24px',
          right: '24px',
          height: '1px',
          background: 'linear-gradient(to right, #E8D5B7, transparent)'
        }} />

        <div className="contact-content">
          <div className="contact-main">
            <p style={{
              fontSize: '14px',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#E8D5B7',
              marginBottom: '24px'
            }}>
              Let's create something
            </p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  rows={4}
                />
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Sending...' : 
                 formStatus === 'success' ? 'Sent!' : 
                 formStatus === 'error' ? 'Please fill all fields' :
                 'Send Message'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>

            <div className="contact-alt">
              <span>Or email directly:</span>
              <a href="mailto:hello@joelboachie.com">hello@joelboachie.com</a>
            </div>
          </div>

          <div className="social-links">
            {socialLinks.map((social) => (
              <a 
                key={social.name} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#666',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="contact-footer">
          <span>© 2024 All rights reserved</span>
          <span>Designed with intention</span>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Space+Mono:wght@400;700&display=swap');
        
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        a:hover { color: #E8D5B7 !important; }
        ::selection { background: #E8D5B7; color: #0A0A0A; }

        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 32px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          mix-blend-mode: difference;
        }

        .nav-links {
          display: flex;
          gap: 48px;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .nav-links button { position: relative; }
        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #E8D5B7;
          transition: width 0.3s ease;
        }
        .nav-links button:hover::after,
        .nav-links button.active::after { width: 100%; }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 101;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 48px;
          position: relative;
        }

        .hero-title {
          font-size: clamp(48px, 12vw, 160px);
          font-weight: 400;
          line-height: 0.9;
          margin: 0;
          letter-spacing: -0.03em;
        }

        .scroll-indicator:hover { opacity: 0.7; }

        .section-work {
          padding: 120px 48px;
          position: relative;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 80px;
        }

        .project-item {
          display: grid;
          grid-template-columns: 1fr 200px 100px;
          gap: 24px;
          align-items: center;
          padding: 40px 0;
          border-top: 1px solid #222;
          cursor: pointer;
          position: relative;
          transition: all 0.4s ease;
        }

        .project-item:focus { outline: none; }
        .project-item:focus-visible { outline: 2px solid #E8D5B7; outline-offset: 4px; }
        .project-title { font-size: clamp(32px, 6vw, 72px); }
        .project-category, .project-year { display: block; }
        .project-arrow { display: flex; }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.95);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.3s ease;
          overflow-y: auto;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-content {
          background: #111;
          border: 1px solid #222;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 48px;
          position: relative;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px;
          transition: color 0.3s ease;
        }
        .modal-close:hover { color: #F5F5F0; }
        .modal-header { padding-left: 24px; margin-bottom: 40px; }

        .modal-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 24px 0;
          border-top: 1px solid #222;
          border-bottom: 1px solid #222;
          margin-bottom: 32px;
        }

        .modal-meta h4 {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          margin: 0 0 8px 0;
          font-weight: 400;
        }
        .modal-meta p { font-size: 14px; color: #CCC; margin: 0; }

        .modal-highlights h4 {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          margin: 0 0 16px 0;
          font-weight: 400;
        }
        .modal-highlights ul { list-style: none; padding: 0; margin: 0; }
        .modal-highlights li {
          font-family: "Space Mono", monospace;
          font-size: 13px;
          color: #888;
          padding: 12px 0;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
          padding-left: 20px;
        }
        .modal-highlights li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #E8D5B7;
        }

        .modal-cta {
          margin-top: 40px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: transparent;
          border: 1px solid #E8D5B7;
          color: #E8D5B7;
          padding: 16px 32px;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .modal-cta:hover { background: #E8D5B7; color: #0A0A0A; }

        .section-about {
          padding: 120px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 120px;
          align-items: start;
        }
        .profile-image-container { max-width: 320px; }
        .about-headline { font-size: clamp(24px, 3vw, 36px); }
        .about-details { display: flex; flex-direction: column; gap: 48px; padding-top: 64px; }

        .section-contact { padding: 120px 48px 80px; position: relative; }
        .contact-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 80px;
        }
        .contact-main { flex: 1; max-width: 480px; }
        .contact-form { display: flex; flex-direction: column; gap: 24px; }

        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group label {
          font-family: "Space Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
        }
        .form-group input,
        .form-group textarea {
          background: transparent;
          border: 1px solid #333;
          padding: 16px;
          color: #F5F5F0;
          font-family: "Space Mono", monospace;
          font-size: 14px;
          transition: border-color 0.3s ease;
          resize: none;
        }
        .form-group input:focus,
        .form-group textarea:focus { outline: none; border-color: #E8D5B7; }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: #444; }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #E8D5B7;
          border: none;
          color: #0A0A0A;
          padding: 16px 32px;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          align-self: flex-start;
        }
        .submit-btn:hover:not(:disabled) { background: #F5F5F0; }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .contact-alt {
          margin-top: 32px;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          color: #666;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .contact-alt a { color: #E8D5B7; text-decoration: none; }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-family: "Space Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.1em;
        }

        .contact-footer {
          margin-top: 120px;
          display: flex;
          justify-content: space-between;
          font-family: "Space Mono", monospace;
          font-size: 11px;
          color: #444;
          letter-spacing: 0.1em;
        }

        @media (max-width: 1024px) {
          .nav { padding: 24px 32px; }
          .nav-links { gap: 32px; }
          .hero { padding: 0 32px; }
          .section-work { padding: 80px 32px; }
          .section-header { margin-bottom: 48px; }
          .project-item { grid-template-columns: 1fr 150px 80px; gap: 16px; padding: 32px 0; }
          .modal-content { padding: 32px; }
          .modal-meta { grid-template-columns: 1fr 1fr; }
          .section-about { padding: 80px 32px; gap: 60px; }
          .about-details { padding-top: 0; }
          .section-contact { padding: 80px 32px 60px; }
          .contact-content { gap: 48px; }
          .contact-footer { margin-top: 80px; }
        }

        @media (max-width: 768px) {
          .cursor-follower { display: none; }
          .nav { padding: 20px 24px; }
          .mobile-menu-btn { display: block; }
          .nav-links {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: #0A0A0A;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }
          .nav-links.open { opacity: 1; visibility: visible; }
          .nav-links button { font-size: 24px; }
          .hero { padding: 0 24px; }
          .hero-line { display: none; }
          .scroll-indicator { left: 24px !important; bottom: 32px !important; }
          .section-work { padding: 60px 24px; }
          .section-header { margin-bottom: 32px; }
          .project-item { grid-template-columns: 1fr; gap: 8px; padding: 24px 0; }
          .project-title { font-size: clamp(28px, 8vw, 48px); }
          .project-category { font-size: 10px !important; margin-top: 4px; }
          .project-year { display: none; }
          .project-arrow { display: none; }
          .project-desc { max-height: 60px !important; opacity: 1 !important; transform: none !important; }
          .modal-content { padding: 24px; max-height: 100vh; border: none; }
          .modal-meta { grid-template-columns: 1fr; gap: 16px; }
          .section-about { padding: 60px 24px; grid-template-columns: 1fr; gap: 48px; }
          .profile-image-container { max-width: 260px; }
          .about-headline { font-size: 22px; }
          .about-details { gap: 32px; }
          .section-contact { padding: 60px 24px 48px; }
          .contact-content { flex-direction: column; align-items: flex-start; gap: 48px; }
          .social-links { flex-direction: row; gap: 24px; }
          .contact-footer { margin-top: 60px; flex-direction: column; gap: 8px; }
        }

        @media (max-width: 480px) {
          .nav { padding: 16px 20px; }
          .hero { padding: 0 20px; }
          .section-work, .section-about, .section-contact { padding-left: 20px; padding-right: 20px; }
          .project-title { font-size: 28px; }
          .about-headline { font-size: 20px; }
          .submit-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
