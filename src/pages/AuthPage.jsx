import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mountain, Mail, LockKeyhole, UserRound, Heart } from 'lucide-react';
import './AuthPage.css';

function AuthPage({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    if (mode === 'signup' && name.trim().length < 2) {
      setMessage('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || password.length < 6) {
      setMessage('Please enter your email and password.');
      return;
    }
    const accounts = JSON.parse(localStorage.getItem('ghumnepal_demo_accounts') || '{}');
    const normalizedEmail = email.trim().toLowerCase();
    if (mode === 'signup' && accounts[normalizedEmail]) { setMessage('This demo email is already registered. Sign in instead.'); return; }
    if (mode === 'login' && !accounts[normalizedEmail]) { setMessage('No demo profile found. Create an account first.'); return; }
    if (mode === 'signup') { accounts[normalizedEmail] = { name: name.trim(), email: normalizedEmail }; localStorage.setItem('ghumnepal_demo_accounts', JSON.stringify(accounts)); }
    const user = { name: mode === 'signup' ? name.trim() : accounts[normalizedEmail].name, email: normalizedEmail };
    localStorage.setItem('ghumnepal_demo_user', JSON.stringify(user));
    setMessage(mode === 'signup' ? 'Demo profile created! Welcome to GhumNepal.' : 'You are signed in to this demo.');
    window.setTimeout(() => navigate('/wishlist'), 700);
  };

  return (
    <main className="auth-page">
      <Link to="/" className="auth-back"><ArrowLeft size={17} /> Back to GhumNepal</Link>
      <section className="auth-card">
        <Link to="/" className="auth-brand"><span><Mountain size={25} /></span><strong>ghum<span>nepal</span></strong></Link>
        <div className="auth-icon"><Heart size={23} /></div>
        <p className="auth-eyebrow">YOUR NEPAL JOURNEY</p>
        <h1>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
        <p className="auth-intro">{mode === 'signup' ? 'Create a traveller profile and keep your favourite places close.' : 'Sign in to revisit the destinations you love.'}</p>
        <form onSubmit={submit} className="auth-form">
          {mode === 'signup' && <label><span><UserRound size={16} /> Full name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" required /></label>}
          <label><span><Mail size={16} /> Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required /></label>
          <label><span><LockKeyhole size={16} /> Password</span><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={6} /></label>
          <label style={{display:"flex",alignItems:"center",gap:8,fontSize:13}}><input type="checkbox" checked={showPassword} onChange={e => setShowPassword(e.target.checked)} /> Show password</label>
          <button type="submit" className="auth-submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <ArrowLeft size={16} /></button>
        </form>
        {message && <p className="auth-message" role="status">{message}</p>}
        <p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : "New to GhumNepal?"}{' '}<button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setMessage(''); }}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p>
        <p className="auth-demo-note">Demo only: this prototype stores a profile in this browser. Passwords are not verified in this demo. Never use a real password here; secure authentication requires a backend.</p>
      </section>
    </main>
  );
}

export default AuthPage;
