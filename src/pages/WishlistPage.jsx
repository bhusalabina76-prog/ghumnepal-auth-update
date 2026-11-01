import { useState } from 'react';
import { wishlistKey, readCatalogue } from '../phase6Data.js';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, MapPin, Compass } from 'lucide-react';
import './WishlistPage.css';

const destinationData = [
  { name: 'Mustang', location: 'Gandaki Province', category: 'Adventure', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85', slug: 'mustang', price: 'Rs. 12,000' },
  { name: 'Pokhara', location: 'Gandaki Province', category: 'Nature & Lakes', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85', slug: 'pokhara', price: 'Rs. 8,000' },
  { name: 'Chitwan', location: 'Bagmati Province', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85', slug: 'chitwan', price: 'Rs. 6,500' },
  { name: 'Everest Region', location: 'Koshi Province', category: 'Trekking', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', slug: 'everest-region', price: 'Rs. 25,000' },
];

function WishlistPage() {
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem(wishlistKey()) || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  });
  const items = readCatalogue(destinationData).map(item => ({ ...item, location: item.location || item.province, slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') })).filter((item) => saved.includes(item.name));
  const remove = (name) => {
    const next = saved.filter((item) => item !== name);
    try { localStorage.setItem(wishlistKey(), JSON.stringify(next)); } catch { /* keep UI usable */ }
    setSaved(next);
  };
  let user = null;
  try { user = JSON.parse(localStorage.getItem('ghumnepal_demo_user') || 'null'); } catch { user = null; }

  return <main className="wishlist-page">
    <Link to="/" className="wishlist-back"><ArrowLeft size={17} /> Back to explore</Link>
    <header className="wishlist-heading"><span className="wishlist-icon"><Heart size={22} /></span><p>YOUR PERSONAL COLLECTION</p><h1>Saved destinations<span>.</span></h1><div className="wishlist-subtitle">{user ? `Welcome, ${user.name}. ` : ''}Keep the places you dream of visiting all in one place.</div></header>
    {items.length ? <div className="wishlist-grid">{items.map((item) => <article className="wishlist-card" key={item.name}><div className="wishlist-photo"><img src={item.image} alt={item.name} /><span>{item.category}</span><button aria-label={`Remove ${item.name} from wishlist`} onClick={() => remove(item.name)}><Heart size={19} fill="currentColor" /></button></div><div className="wishlist-info"><small><MapPin size={13} /> {item.location}</small><h2>{item.name}</h2><div className="wishlist-bottom"><span>Estimated from <strong>{item.price}</strong></span><Link to={`/destinations/${item.slug}`} aria-label={`View ${item.name}`}><ArrowRight size={18} /></Link></div></div></article>)}</div> : <section className="wishlist-empty"><Compass size={38} /><h2>Your wishlist is waiting</h2><p>Tap the heart on any destination card to save a place for later.</p><Link to="/" className="wishlist-explore">Explore destinations <ArrowRight size={17} /></Link></section>}
    <p className="wishlist-note">Saved destinations are stored in this browser only. They are not synced across devices or accounts in this demo.</p>
  </main>;
}

export default WishlistPage;
