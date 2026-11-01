import { wishlistKey } from '../phase6Data.js';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Mountain,
  Wallet,
  Heart,
  Route as RouteIcon,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import './DestinationPage.css';

const destinationData = {
  mustang: {
    name: 'Mustang',
    province: 'Gandaki Province',
    category: 'Mountain adventure',
    duration: '4–5 days',
    budget: 'From Rs. 12,000',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    intro:
      'Discover dramatic Himalayan landscapes, traditional villages, ancient monasteries and the distinctive culture of Mustang.',
    bestTime: 'Spring (March–May) and autumn (September–November). Upper Mustang travel may have additional permit requirements.',
    highlights: ['Jomsom and Kagbeni', 'Traditional villages and monasteries', 'Himalayan landscapes', 'Local food and culture'],
    itinerary: [
      ['Day 1', 'Travel to Pokhara and prepare for the journey.'],
      ['Day 2', 'Travel toward Jomsom and explore the town.'],
      ['Day 3', 'Visit Kagbeni and nearby cultural sites.'],
      ['Day 4', 'Explore local landscapes and return planning.'],
    ],
    note: 'Upper Mustang access and permits depend on current government rules. Confirm routes, transport, and permit costs before travel.',
  },
  pokhara: {
    name: 'Pokhara',
    province: 'Gandaki Province',
    category: 'Nature & lakes',
    duration: '3 days',
    budget: 'From Rs. 8,000',
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=85',
    intro:
      'Enjoy lakeside walks, mountain views, peaceful cafés and outdoor adventures in one of Nepal’s best-known travel destinations.',
    bestTime: 'Autumn and spring generally offer pleasant conditions. Weather can change quickly in the mountains.',
    highlights: ['Phewa Lake and Lakeside', 'World Peace Pagoda', 'Sarangkot sunrise viewpoint', 'Local cafés and adventure activities'],
    itinerary: [
      ['Day 1', 'Arrive, explore Lakeside and enjoy Phewa Lake.'],
      ['Day 2', 'Visit viewpoints and choose a local activity.'],
      ['Day 3', 'Explore nearby attractions and travel onward.'],
    ],
    note: 'Activity fees, boat rentals and transport vary by provider. Confirm current prices and weather before booking.',
  },
  chitwan: {
    name: 'Chitwan',
    province: 'Bagmati Province',
    category: 'Wildlife & nature',
    duration: '2–3 days',
    budget: 'From Rs. 6,500',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1600&q=85',
    intro:
      'Experience the Terai landscape, community culture and wildlife-focused activities around the Chitwan area.',
    bestTime: 'October–March is often more comfortable for outdoor activities; conditions and wildlife sightings vary.',
    highlights: ['Chitwan National Park area', 'Guided nature activities', 'Tharu culture and food', 'Sunset views around the river'],
    itinerary: [
      ['Day 1', 'Arrive in the area and explore the local community.'],
      ['Day 2', 'Join a permitted guided nature or wildlife activity.'],
      ['Day 3', 'Enjoy a relaxed morning and depart, if staying three days.'],
    ],
    note: 'Use licensed guides and follow park rules. Wildlife sightings are never guaranteed; verify activity availability and fees.',
  },
  'everest-region': {
    name: 'Everest Region',
    province: 'Koshi Province',
    category: 'Trekking',
    duration: '7+ days',
    budget: 'From Rs. 25,000',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    intro:
      'Explore high Himalayan trails, Sherpa communities and extraordinary mountain scenery in Nepal’s Everest region.',
    bestTime: 'Spring and autumn are popular trekking seasons. High-altitude weather can change rapidly.',
    highlights: ['Mountain panoramas', 'Sherpa culture and villages', 'Trekking trails and teahouses', 'Acclimatisation and nature'],
    itinerary: [
      ['Day 1', 'Travel to the trek starting point, subject to route and transport.'],
      ['Days 2–4', 'Trek gradually with rest and acclimatisation as needed.'],
      ['Days 5–7+', 'Continue the chosen route and return according to your plan.'],
    ],
    note: 'This is a high-altitude region. Choose a route suited to your fitness, allow acclimatisation time, check permits and weather, and consider a qualified guide. The displayed budget is illustrative only.',
  },
};

function DestinationPage() {
  const { slug } = useParams();
  const destination = destinationData[slug];
  const [saved, setSaved] = useState(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem(wishlistKey()) || '[]');
      return Array.isArray(wishlist) && wishlist.includes(destinationData[slug]?.name);
    } catch {
      return false;
    }
  });

  // Keep destination details and the homepage/Wishlist in sync via the same storage key.
  const toggleSaved = () => {
    try {
      const current = JSON.parse(localStorage.getItem(wishlistKey()) || '[]');
      const wishlist = Array.isArray(current) ? current : [];
      const next = wishlist.includes(destination.name)
        ? wishlist.filter((name) => name !== destination.name)
        : [...wishlist, destination.name];
      localStorage.setItem(wishlistKey(), JSON.stringify(next));
      setSaved(next.includes(destination.name));
    } catch {
      setSaved(false);
    }
  };

  if (!destination) {
    return (
      <main className="destination-page destination-not-found">
        <h1>Destination not found</h1>
        <p>We are still adding this destination to GhumNepal.</p>
        <Link className="destination-primary-button" to="/">
          <ArrowLeft size={17} /> Back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="destination-page">
      <div className="destination-page-top">
        <Link to="/" className="destination-back">
          <ArrowLeft size={17} /> Back to destinations
        </Link>
        <button type="button" className={`destination-save ${saved ? 'is-saved' : ''}`} onClick={toggleSaved} aria-pressed={saved}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
          {saved ? 'Saved to wishlist' : 'Save destination'}
        </button>
      </div>

      <section className="destination-hero">
        <img src={destination.image} alt={`${destination.name} landscape`} />
        <div className="destination-hero-overlay" />
        <div className="destination-hero-content">
          <span className="destination-kicker">EXPLORE NEPAL · {destination.category.toUpperCase()}</span>
          <h1>Discover {destination.name}</h1>
          <p><MapPin size={17} /> {destination.province}, Nepal</p>
        </div>
      </section>

      <div className="destination-detail-layout">
        <section className="destination-detail-main">
          <p className="destination-intro">{destination.intro}</p>

          <div className="destination-facts">
            <div><CalendarDays /><span><small>Suggested duration</small><strong>{destination.duration}</strong></span></div>
            <div><Wallet /><span><small>Illustrative budget</small><strong>{destination.budget}</strong></span></div>
            <div><Mountain /><span><small>Travel style</small><strong>{destination.category}</strong></span></div>
          </div>

          <section className="destination-content-section">
            <span className="destination-section-label">DON'T MISS</span>
            <h2>Highlights and experiences</h2>
            <div className="destination-highlights">
              {destination.highlights.map((item) => (
                <div key={item}><CheckCircle2 size={18} /> {item}</div>
              ))}
            </div>
          </section>

          <section className="destination-content-section">
            <span className="destination-section-label">PLAN YOUR DAYS</span>
            <h2>Suggested itinerary</h2>
            <div className="destination-itinerary">
              {destination.itinerary.map(([day, activity]) => (
                <article key={day}>
                  <span className="itinerary-day"><Clock3 size={16} /> {day}</span>
                  <p>{activity}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="destination-content-section best-time-card">
            <CalendarDays size={22} />
            <div><h2>When to visit</h2><p>{destination.bestTime}</p></div>
          </section>

          <div className="destination-travel-note">
            <strong>Before you go</strong>
            <p>{destination.note}</p>
          </div>
        </section>

        <aside className="destination-side-card">
          <span className="destination-section-label">START YOUR JOURNEY</span>
          <h2>Make this trip yours.</h2>
          <p>Use the trip planner to start organising your travel dates, group size and estimated budget.</p>
          <Link to={`/book?destination=${slug}`} className="destination-primary-button">
            Book this trip <ArrowLeft size={17} className="plan-button-arrow" />
          </Link>
          <Link to="/planner" className="destination-secondary-link">Plan your own itinerary <ArrowLeft size={15} className="plan-button-arrow" /></Link>
          <div className="destination-side-divider" />
          <p className="destination-side-note"><RouteIcon size={17} /> Itinerary and costs are starting points, not confirmed bookings or live prices.</p>
          <Link to="/" className="destination-secondary-link">Explore other destinations <ArrowLeft size={15} className="plan-button-arrow" /></Link>
        </aside>
      </div>
    </main>
  );
}

export default DestinationPage;
