import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mountain, Mail, LockKeyhole, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import './AdminLoginPage.css';

const DEMO_ADMIN_EMAIL = 'admin@ghumnepal.com';
const DEMO_ADMIN_PASSWORD = 'GhumNepal@123';

export default function AdminLoginPage() {
  const [email, setEmail] = useState(DEMO_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEMO_ADMIN_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (email.trim().toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      sessionStorage.setItem('ghumnepal_admin_session', 'active');
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
      return;
    }
    setError('Email or password is incorrect. Use the demo credentials shown below.');
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-visual" aria-label="GhumNepal introduction">
        <Link to="/" className="admin-login-brand"><span className="admin-login-brand-icon"><Mountain size={25} /></span><span>ghum<span>nepal</span><small>YOUR JOURNEY, YOUR NEPAL</small></span></Link>
        <div className="admin-login-visual-copy"><span className="admin-login-kicker">ADMIN WORKSPACE</span><h1>Every journey,<br />beautifully <em>managed.</em></h1><p>Manage destinations, tour packages and booking requests from one place.</p></div>
        <div className="admin-login-visual-foot"><ShieldCheck size={17} /> GhumNepal management console</div>
      </section>
      <section className="admin-login-form-side">
        <form className="admin-login-card" onSubmit={handleSubmit}>
          <div className="admin-login-mobile-brand"><Mountain size={25} /> <strong>ghum<span>nepal</span></strong></div>
          <span className="admin-login-kicker">WELCOME BACK</span>
          <h2>Admin sign in</h2>
          <p className="admin-login-subtitle">Sign in to manage your GhumNepal workspace.</p>
          <label className="admin-login-label" htmlFor="admin-email">Admin email</label>
          <div className="admin-login-input-wrap"><Mail size={18} /><input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ghumnepal.com" required /></div>
          <label className="admin-login-label" htmlFor="admin-password">Password</label>
          <div className="admin-login-input-wrap"><LockKeyhole size={18} /><input id="admin-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" required /><button type="button" className="admin-password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          {error && <div className="admin-login-error" role="alert">{error}</div>}
          <button className="admin-login-submit" type="submit">Sign in to dashboard <ArrowRight size={18} /></button>
          <div className="admin-demo-credentials"><strong>Demo credentials</strong><span>Email: <code>{DEMO_ADMIN_EMAIL}</code></span><span>Password: <code>{DEMO_ADMIN_PASSWORD}</code></span></div>
          <Link to="/" className="admin-login-back">← Back to GhumNepal website</Link>
          <p className="admin-login-note">Frontend demo only. This client-side login is not secure authentication; protect admin routes with server-side authentication before production.</p>
        </form>
      </section>
    </main>
  );
}
