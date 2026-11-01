import { ArrowLeft, MapPin, CalendarDays, Mountain } from 'lucide-react';
import { Link } from 'react-router-dom';

function Mustang() {
  return (
    <main style={{ padding: '40px 8%', color: '#18372f' }}>
      <Link to="/" style={{ display: 'inline-flex', gap: 8, color: '#277a52' }}>
        <ArrowLeft size={18} /> Back to home
      </Link>

      <p style={{ marginTop: 35, color: '#277a52' }}>EXPLORE NEPAL</p>
      <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>Discover Mustang</h1>

      <p style={{ maxWidth: 650, lineHeight: 1.8, color: '#718078' }}>
        Explore dramatic Himalayan landscapes, traditional villages,
        ancient monasteries and the unique culture of Nepal's Mustang region.
      </p>

      <img
        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85"
        alt="Himalayan mountain landscape"
        style={{
          width: '100%',
          height: 400,
          objectFit: 'cover',
          borderRadius: 12,
          marginTop: 20,
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 30, marginTop: 25 }}>
        <p><MapPin size={17} /> Gandaki Province, Nepal</p>
        <p><CalendarDays size={17} /> Suggested duration: 4–5 days</p>
        <p><Mountain size={17} /> Mountain adventure</p>
      </div>

      <h2>Experience Mustang</h2>
      <p style={{ maxWidth: 700, lineHeight: 1.8, color: '#718078' }}>
        Plan your journey, explore accommodation options and discover
        transportation choices. Detailed listings and verified prices will
        be connected as the GhumNepal platform develops.
      </p>

      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginTop: 15,
          padding: '13px 20px',
          background: '#277a52',
          color: 'white',
          borderRadius: 5,
        }}
      >
        Explore more destinations
      </Link>
    </main>
  );
}

export default Mustang;