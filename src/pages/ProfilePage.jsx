import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mountain, UserRound, Mail, Phone, MapPin, Save, Settings, Bell, LockKeyhole, CheckCircle2 } from 'lucide-react';
import './ProfilePage.css';

const USER_KEY = 'ghumnepal_demo_user';
const SETTINGS_KEY = 'ghumnepal_demo_settings';
const defaultUser = { name: '', email: '', phone: '', location: '', bio: '' };
const defaultSettings = { tripUpdates: true, travelTips: false, productEmails: false };

function readJSON(key, fallback) {
  try { return { ...fallback, ...(JSON.parse(localStorage.getItem(key) || '{}')) }; }
  catch { return fallback; }
}

export default function ProfilePage() {
  const [tab, setTab] = useState('profile');
  const [profile, setProfile] = useState(() => readJSON(USER_KEY, defaultUser));
  const [settings, setSettings] = useState(() => readJSON(SETTINGS_KEY, defaultSettings));
  const [notice, setNotice] = useState('');
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    const handleStorage = () => setProfile(readJSON(USER_KEY, defaultUser));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateProfile = (event) => {
    event.preventDefault();
    if (!profile.name.trim()) { setNotice('Please enter your full name.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) { setNotice('Please enter your email address.'); return; }
    const oldEmail = readJSON(USER_KEY, defaultUser).email;
    if (oldEmail && oldEmail.toLowerCase() !== profile.email.trim().toLowerCase()) { setNotice('Email changes require account verification in Phase 7.'); return; }
    const updated = { ...profile, name: profile.name.trim(), email: profile.email.trim().toLowerCase() };
    localStorage.setItem(USER_KEY, JSON.stringify(updated));
    setProfile(updated);
    setNotice('Profile saved in this browser.');
  };

  const saveSettings = (event) => {
    event.preventDefault();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setNotice('Your demo preferences have been saved.');
  };

  const submitPassword = (event) => {
    event.preventDefault();
    if (passwordForm.next.length < 6) { setNotice('New password must be at least 6 characters.'); return; }
    if (passwordForm.next !== passwordForm.confirm) { setNotice('New password and confirmation do not match.'); return; }
    setNotice('Password UI validated. A real password change requires backend authentication.');
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  return (
    <main className="profile-page">
      <header className="profile-topbar">
        <Link to="/" className="profile-brand"><span><Mountain size={23} /></span><strong>ghum<span>nepal</span></strong></Link>
        <Link to="/" className="profile-back"><ArrowLeft size={16} /> Back to explore</Link>
      </header>
      <div className="profile-shell">
        <div className="profile-heading"><span className="profile-eyebrow">YOUR TRAVEL SPACE</span><h1>Account & profile</h1><p>Manage your traveller details and personal preferences.</p></div>
        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-avatar"><UserRound size={31} /></div>
            <strong>{profile.name || 'Traveller'}</strong>
            <span>{profile.email || 'Add your email address'}</span>
            <nav aria-label="Account sections">
              <button className={tab === 'profile' ? 'active' : ''} onClick={() => { setTab('profile'); setNotice(''); }}><UserRound size={17} /> Personal profile</button>
              <button className={tab === 'settings' ? 'active' : ''} onClick={() => { setTab('settings'); setNotice(''); }}><Settings size={17} /> Preferences</button>
              <button className={tab === 'security' ? 'active' : ''} onClick={() => { setTab('security'); setNotice(''); }}><LockKeyhole size={17} /> Password UI</button>
            </nav>
            <p className="profile-demo-note">Demo profile: information is stored in this browser only.</p>
          </aside>
          <section className="profile-panel">
            {tab === 'profile' && <>
              <div className="profile-panel-heading"><div><h2>Personal information</h2><p>Keep your contact details up to date.</p></div><span className="profile-heading-icon"><UserRound size={21} /></span></div>
              <form onSubmit={updateProfile} className="profile-form">
                <label><span>Full name *</span><div className="profile-input"><UserRound size={17} /><input value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Enter your full name" autoComplete="name" required /></div></label>
                <label><span>Email address *</span><div className="profile-input"><Mail size={17} /><input type="email" value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })} placeholder="you@example.com" autoComplete="email" required /></div></label>
                <label><span>Phone number</span><div className="profile-input"><Phone size={17} /><input type="tel" value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+977 98XXXXXXXX" autoComplete="tel" /></div></label>
                <label><span>Home city / district</span><div className="profile-input"><MapPin size={17} /><input value={profile.location || ''} onChange={e => setProfile({ ...profile, location: e.target.value })} placeholder="e.g. Kathmandu, Nepal" /></div></label>
                <label className="profile-full-width"><span>About you</span><textarea value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })} placeholder="Tell us a little about your travel interests..." rows="4" maxLength={280} /></label>
                <div className="profile-form-footer"><small>{(profile.bio || '').length}/280 characters</small><button className="profile-primary" type="submit"><Save size={16} /> Save profile</button></div>
              </form>
            </>}
            {tab === 'settings' && <>
              <div className="profile-panel-heading"><div><h2>Travel preferences</h2><p>Choose what kind of updates you would like to receive.</p></div><span className="profile-heading-icon"><Bell size={21} /></span></div>
              <form className="profile-settings-form" onSubmit={saveSettings}>
                {[['tripUpdates','Trip updates','Reminders and updates for trips you plan.'],['travelTips','Travel tips','Seasonal ideas and useful Nepal travel guides.'],['productEmails','Product announcements','News about new GhumNepal features.']].map(([key,title,desc]) => <label className="profile-toggle-row" key={key}><span><strong>{title}</strong><small>{desc}</small></span><input type="checkbox" checked={Boolean(settings[key])} onChange={e => setSettings({ ...settings, [key]: e.target.checked })} /></label>)}
                <div className="profile-form-footer"><small>Preferences are saved locally in this demo.</small><button className="profile-primary" type="submit"><Save size={16} /> Save preferences</button></div>
              </form>
            </>}
            {tab === 'security' && <>
              <div className="profile-panel-heading"><div><h2>Password interface</h2><p>Frontend validation preview for the future account security flow.</p></div><span className="profile-heading-icon"><LockKeyhole size={21} /></span></div>
              <form className="profile-form profile-password-form" onSubmit={submitPassword}>
                <label className="profile-full-width"><span>Current password</span><input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} placeholder="Enter current password" autoComplete="current-password" required /></label>
                <label><span>New password</span><input type="password" value={passwordForm.next} onChange={e => setPasswordForm({ ...passwordForm, next: e.target.value })} placeholder="At least 6 characters" minLength={6} autoComplete="new-password" required /></label>
                <label><span>Confirm new password</span><input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} placeholder="Re-enter new password" autoComplete="new-password" required /></label>
                <p className="profile-security-warning">This form does not change a real password yet. Secure password updates must be handled by the backend.</p>
                <div className="profile-form-footer"><span /><button className="profile-primary" type="submit"><LockKeyhole size={16} /> Validate form</button></div>
              </form>
            </>}
            {notice && <p className="profile-notice" role="status"><CheckCircle2 size={17} /> {notice}</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
