import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, MessageCircle, Mountain, Menu, X, Heart, CalendarDays, UserRound } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Trip planning', message: '' });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`GhumNepal enquiry: ${form.subject}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.subject}\n\n${form.message}`);
    window.location.href = `mailto:hello@ghumnepal.com.np?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return <div className="contact-layout">
    <div className="announcement"><span>✦</span> Your next Nepal adventure starts here.<span className="announcement-link">Explore Nepal <ArrowRight size={14} /></span></div>
    <header className="navbar contact-navbar">
      <Link className="brand" to="/" aria-label="GhumNepal home"><span className="brand-icon"><Mountain size={25} /></span><span>ghum<span className="brand-green">nepal</span><small>YOUR JOURNEY, YOUR NEPAL</small></span></Link>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        <Link to="/#destinations" onClick={() => setMenuOpen(false)}>Explore</Link>
        <Link to="/map" onClick={() => setMenuOpen(false)}>Map</Link>
        <Link to="/#categories" onClick={() => setMenuOpen(false)}>Experiences</Link>
        <Link to="/planner" onClick={() => setMenuOpen(false)}>Trip planner</Link>
        <Link to="/#about" onClick={() => setMenuOpen(false)}>About us</Link>
        <Link className="nav-active" to="/contact" onClick={() => setMenuOpen(false)}>Contact us</Link>
      </nav>
      <div className="nav-actions">
        <Link className="saved-button" to="/wishlist"><Heart size={18} /><span>Saved</span></Link>
        <Link className="auth-nav-button" to="/my-trips"><CalendarDays size={16} /> My trips</Link>
        <Link className="auth-nav-button" to="/book"><ArrowRight size={16} /> Book a trip</Link>
        <Link className="auth-nav-button" to="/profile"><UserRound size={16} /> Profile</Link>
        <Link className="auth-nav-button" to="/login"><UserRound size={16} /> Sign in</Link>
      </div>
    </header>
    <main className="contact-page">
    <section className="contact-hero">
      <div className="contact-hero-copy">
        <span className="contact-eyebrow"><Mountain size={16} /> WE’RE HERE TO HELP</span>
        <h1>Let’s plan your<br /><span>next Nepal story.</span></h1>
        <p>Have a question, need a little travel inspiration, or want to work with us? Send us a message and let’s make your next journey special.</p>
        <Link to="/planner" className="contact-hero-link">Start planning <ArrowRight size={17} /></Link>
      </div>
      <div className="contact-hero-photo" role="img" aria-label="Beautiful Himalayan mountain landscape" />
    </section>
    <section className="contact-content">
      <div className="contact-info">
        <span className="contact-eyebrow">GET IN TOUCH</span>
        <h2>We’d love to<br />hear from you.</h2>
        <p>Tell us what you’re dreaming of. Whether it’s a quiet lakeside escape or a Himalayan adventure, we’ll help point you in the right direction.</p>
        <div className="contact-info-card"><span><Mail size={20} /></span><div><small>Email us</small><a href="mailto:hello@ghumnepal.com.np">hello@ghumnepal.com.np</a></div></div>
        <div className="contact-info-card"><span><MapPin size={20} /></span><div><small>Made for Nepal</small><strong>Connecting travellers with local experiences</strong></div></div>
        <div className="contact-note"><MessageCircle size={18} /><span>Local travel partner? We’re always happy to hear from hotels, homestays and experience providers.</span></div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <span className="contact-eyebrow">SEND A MESSAGE</span>
        <h2>How can we help?</h2>
        <p>Fill in the details below and your email app will open with your message ready to send.</p>
        {submitted && <div className="contact-success" role="status">Your email draft has been prepared. Please send it from your email app to complete your enquiry.</div>}
        <div className="contact-form-row">
          <label>Your name<input name="name" value={form.name} onChange={update} placeholder="e.g. Abina Bhusal" required /></label>
          <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label>
        </div>
        <label>What is this about?
          <select name="subject" value={form.subject} onChange={update}><option>Trip planning</option><option>Destination information</option><option>Booking support</option><option>Travel partnership</option><option>Website feedback</option><option>Other enquiry</option></select>
        </label>
        <label>Your message<textarea name="message" value={form.message} onChange={update} placeholder="Tell us a little about what you need..." rows="6" required /></label>
        <button type="submit">Prepare message <ArrowRight size={18} /></button>
        <small className="contact-form-footnote">This demo form opens your email application; it does not send or store your message on this website.</small>
      </form>
    </section>
  </main>
  </div>;
}
