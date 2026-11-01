
import { useState, useEffect } from 'react';
import { readCatalogue, wishlistKey } from './phase6Data.js';
import {
  Search,
  MapPin,
  Compass,
  Mountain,
  Hotel,
  Bus,
  CalendarDays,
  ArrowRight,
  Menu,
  X,
  Heart,
  Users,
  Star,
  UserRound,
} from 'lucide-react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Link,
} from 'react-router-dom';

import DestinationPage from './pages/DestinationPage.jsx';
import PlannerPage from './pages/PlannerPage.jsx';
import MapPage from './pages/MapPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import BookingPage, { MyTripsPage } from './pages/BookingPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import './App.css';

const starterDestinations = [
  {
    name: 'Mustang',
    location: 'Gandaki Province',
    category: 'Adventure',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
    price: 'Rs. 12,000',
    days: '4 days',
  },
  {
    name: 'Pokhara',
    location: 'Gandaki Province',
    category: 'Nature & Lakes',
    image:
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85',
    price: 'Rs. 8,000',
    days: '3 days',
  },
  {
    name: 'Chitwan',
    location: 'Bagmati Province',
    category: 'Wildlife',
    image:
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85',
    price: 'Rs. 6,500',
    days: '2 days',
  },
  {
    name: 'Everest Region',
    location: 'Koshi Province',
    category: 'Trekking',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85',
    price: 'Rs. 25,000',
    days: '7 days',
  },
];

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=90', caption: 'The Himalayas, Nepal' },
  { image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=2200&q=90', caption: 'Peaceful lakes of Pokhara' },
  { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90', caption: 'Find your mountain escape' },
];

const categories = [
  { name: 'Destinations', icon: Compass, description: 'Discover places' },
  { name: 'Hotels & Stays', icon: Hotel, description: 'Find your stay' },
  { name: 'Transport', icon: Bus, description: 'Plan your journey' },
  { name: 'Trip Planner', icon: CalendarDays, description: 'Build your trip' },
];

function Home() {
  const [search, setSearch] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 5000); return () => window.clearInterval(timer); }, []);
  const [destinations] = useState(() => readCatalogue(starterDestinations));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return JSON.parse(localStorage.getItem(wishlistKey()) || '[]'); }
    catch { return []; }
  });

  const navigate = useNavigate();

  const destinationFilters = ['All', ...new Set(destinations.map((item) => item.category))];

  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch = `${destination.name} ${destination.location} ${destination.category}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSaved = (name) => {
    setSaved((current) => {
      const next = current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name];
      localStorage.setItem(wishlistKey(), JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="website">
      <div className="announcement">
        <span>✦</span> Your next Nepal adventure starts here.
        <span className="announcement-link">
          Explore Nepal <ArrowRight size={14} />
        </span>
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="GhumNepal home">
          <span className="brand-icon">
            <Mountain size={25} />
          </span>
          <span>
            ghum<span className="brand-green">nepal</span>
            <small>YOUR JOURNEY, YOUR NEPAL</small>
          </span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
          <a
            className="nav-active"
            href="#destinations"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </a>
          <a href="/map" onClick={() => setMenuOpen(false)}>Map</a>
          <a
            href="#categories"
            onClick={() => setMenuOpen(false)}
          >
            Experiences
          </a>
          <a
            href="#planner"
            onClick={() => setMenuOpen(false)}
          >
            Trip planner
          </a>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About us
          </a>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact us</Link>
        </nav>

        <div className="nav-actions">
          <Link className="saved-button" to="/wishlist">
            <Heart size={18} />
            <span>Saved ({saved.length})</span>
          </Link>
          <Link className="auth-nav-button" to="/my-trips"><CalendarDays size={16} /> My trips</Link>
          <Link className="auth-nav-button" to="/book"><ArrowRight size={16} /> Book a trip</Link>
          <Link className="auth-nav-button" to="/profile"><UserRound size={16} /> Profile</Link>
          <Link className="auth-nav-button" to="/login"><UserRound size={16} /> Sign in</Link>

          <a className="partner-button" href="#partner">
            Become a partner <ArrowRight size={15} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-background" style={{ backgroundImage: `linear-gradient(90deg, rgba(12,38,29,.85) 0%, rgba(12,38,29,.63) 39%, rgba(12,38,29,.13) 100%), linear-gradient(0deg, rgba(10,34,26,.24), transparent 45%), url("${heroSlides[heroSlide].image}")` }} />

          <div className="hero-content">
            <div className="hero-eyebrow">
              <span /> MADE FOR YOUR NEXT ADVENTURE
            </div>

            <h1>
              Find your own
              <br />
              piece of <span>Nepal.</span>
            </h1>

            <p className="hero-description">
              From Himalayan peaks to peaceful lakeside towns,
              discover Nepal your way. Plan less, experience more.
            </p>

            <div className="search-panel">
              <label className="search-field">
                <MapPin size={21} />
                <span>
                  <strong>Where to?</strong>
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);

                      document
                        .getElementById('destinations')
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                        });
                    }}
                  />
                </span>
              </label>

              <div className="search-divider" />

              <div className="search-date">
                <CalendarDays size={21} />
                <span>
                  <strong>When?</strong>
                  <small>Anytime works</small>
                </span>
              </div>

              <button
                className="search-submit"
                onClick={() =>
                  document
                    .getElementById('destinations')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Search size={19} /> Explore
              </button>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>A</span>
                <span>N</span>
                <span>S</span>
              </div>

              <p>
                <strong>Made for curious travellers</strong>
                <br />
                Discover local places, people & experiences.
              </p>
            </div>
          </div>

          <div className="hero-caption">
            <MapPin size={15} /> The Himalayas, Nepal
          </div>

          <div className="hero-scroll">
            SCROLL TO DISCOVER <span />
          </div>
        </section>

        <section
          className="categories-section section-wrap"
          id="categories"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                YOUR JOURNEY STARTS HERE
              </span>
              <h2>What are you looking for?</h2>
            </div>

            <p>
              Everything you need to plan a memorable trip,
              <br className="desktop-break" /> all in one place.
            </p>
          </div>

          <div className="category-grid">
            {categories.map(({ name, icon: Icon, description }) => (
              <a
                href={name === 'Trip Planner' ? '#planner' : '#destinations'}
                className="category-card"
                key={name}
              >
                <span className="category-icon">
                  <Icon size={24} strokeWidth={1.7} />
                </span>

                <span className="category-text">
                  <strong>{name}</strong>
                  <small>{description}</small>
                </span>

                <ArrowRight
                  className="category-arrow"
                  size={19}
                />
              </a>
            ))}
          </div>
        </section>

        <section
          className="destinations-section section-wrap"
          id="destinations"
        >
          <div className="section-heading destination-heading">
            <div>
              <span className="eyebrow">
                A COUNTRY FULL OF WONDER
              </span>

              <h2>
                Places worth the journey<span>.</span>
              </h2>

              <p className="section-subtitle">
                Find the place that speaks to your soul.
              </p>
            </div>

            <a className="text-link" href="#destinations">
              Explore all destinations <ArrowRight size={17} />
            </a>
          </div>

          <div className="destination-filter-row" aria-label="Filter destinations by travel style">
            <span className="destination-filter-label">Travel style</span>
            <div className="destination-filter-buttons">
              {destinationFilters.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'destination-filter is-active' : 'destination-filter'}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            {(search || selectedCategory !== 'All') && (
              <button className="destination-filter-reset" type="button" onClick={() => { setSearch(''); setSelectedCategory('All'); }}>
                Clear filters
              </button>
            )}
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="destination-grid">
              {filteredDestinations.map((destination, index) => (
                <article
                  className={`destination-card destination-card-${index + 1}`}
                  key={destination.name}
                >
                  <div className="destination-image">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      loading="lazy"
                    />

                    <span className="destination-category">
                      {destination.category}
                    </span>

                    <button
                      className={
                        saved.includes(destination.name)
                          ? 'favorite-button favorite-active'
                          : 'favorite-button'
                      }
                      onClick={() => toggleSaved(destination.name)}
                      aria-label={`Save ${destination.name}`}
                    >
                      <Heart
                        size={19}
                        fill={
                          saved.includes(destination.name)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>

                    <span className="destination-days">
                      {destination.days}
                    </span>
                  </div>

                  <div className="destination-info">
                    <span className="destination-location">
                      <MapPin size={14} />
                      {destination.location}
                    </span>

                    <h3>{destination.name}</h3>

                    <div className="destination-bottom">
                      <span>
                        Estimated from{' '}
                        <strong>{destination.price}</strong>
                      </span>

                      <button
                        aria-label={`Explore ${destination.name}`}
                        onClick={() => {
                          navigate(
                            `/destinations/${destination.name
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`
                          );
                        }}
                      >
                        <ArrowRight size={19} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <Compass size={32} />
              <h3>No destinations found</h3>
              <p>
                Try another place name, province or travel style.
              </p>
              <button onClick={() => setSearch('')}>
                Clear search
              </button>
            </div>
          )}
        </section>

        <section className="map-promo-section section-wrap" id="map-preview">
          <div className="map-promo-copy">
            <span className="eyebrow">EXPLORE EVERY CORNER</span>
            <h2>Nepal is waiting.<br /><span>Find it on the map.</span></h2>
            <p>Browse destinations across Nepal, discover where each place is, and open directions for your next adventure.</p>
            <a className="map-promo-button" href="/map">Explore interactive map <ArrowRight size={17} /></a>
          </div>
          <a className="map-promo-visual" href="/map" aria-label="Open the interactive Nepal map">
            <div className="map-promo-grid" />
            <span className="map-bubble map-bubble-one"><MapPin size={15} /> Mustang</span>
            <span className="map-bubble map-bubble-two"><MapPin size={15} /> Pokhara</span>
            <span className="map-bubble map-bubble-three"><MapPin size={15} /> Chitwan</span>
            <span className="map-promo-label"><Compass size={18} /> Explore Nepal</span>
          </a>
        </section>

        <section className="planner-section" id="planner">
          <div className="planner-image" />

          <div className="planner-content">
            <span className="eyebrow">YOUR TRIP, YOUR WAY</span>

            <h2>
              Big adventure.
              <br />
              <span>Smart budget.</span>
            </h2>

            <p>
              Tell us where you want to go, how many days you have
              and what you want to spend. Start turning your travel
              dreams into a plan.
            </p>

            <div className="planner-benefits">
              <span>
                <Users size={18} /> Plan for your group
              </span>
              <span>
                <CalendarDays size={18} /> Choose your trip length
              </span>
              <span>
                <Star size={18} /> Discover local experiences
              </span>
            </div>

            <button
              className="planner-button"
              onClick={() => navigate('/planner')}
            >
              Start planning <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <section className="partner-section section-wrap" id="partner">
          <div>
            <span className="eyebrow">GROW WITH GHUMNEPAL</span>
            <h2>Are you a local travel partner?</h2>
            <p>
              Connect your hotel, homestay, transport service or
              local experience with travellers exploring Nepal.
            </p>
          </div>

          <a
            href="mailto:partners@ghumnepal.com.np"
            className="partner-cta"
          >
            Become a partner <ArrowRight size={18} />
          </a>
        </section>
      </main>

      <footer className="footer" id="about">
        <div className="footer-main">
          <div className="footer-about">
            <a className="brand footer-brand" href="#home">
              <span className="brand-icon"><Mountain size={25} /></span>
              <span>ghum<span className="brand-green">nepal</span><small>YOUR JOURNEY, YOUR NEPAL</small></span>
            </a>
            <p>Discover more. Travel deeper. Love Nepal. Find your next story across the mountains, cities, lakes and living cultures of Nepal.</p>
          </div>
          <div className="footer-links"><h3>Explore</h3><a href="#destinations">Destinations</a><a href="/map">Explore map</a><a href="/planner">Trip planner</a><a href="/wishlist">Saved places</a></div>
          <div className="footer-links"><h3>Plan your trip</h3><a href="/book">Book a trip</a><a href="/my-trips">My trips</a><a href="/login">Sign in</a><Link to="/contact">Contact us</Link></div>
          <div className="footer-contact"><h3>Let’s talk</h3><p>Questions about your next Nepal adventure? We’d love to hear from you.</p><Link to="/contact" className="footer-contact-button">Get in touch <ArrowRight size={16} /></Link><a href="mailto:hello@ghumnepal.com.np">hello@ghumnepal.com.np</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} GhumNepal. Made with love for Nepal.</span><span>Travel thoughtfully. Leave only good footprints.</span></div>
      </footer>
    </div>
  );
}

function ProtectedAdminRoute() {
  const location = useLocation();
  const isAdminLoggedIn = sessionStorage.getItem('ghumnepal_admin_session') === 'active';
  return isAdminLoggedIn ? <AdminPage /> : <Navigate to="/admin/login" replace state={{ from: location }} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />\n      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/destinations/:slug"
        element={<DestinationPage />}
      />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage initialMode="signup" />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<ProfilePage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/my-trips" element={<MyTripsPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedAdminRoute />} />
      <Route path="*" element={<main style={{minHeight:"75vh",display:"grid",placeContent:"center",textAlign:"center",padding:24}}><h1>404 — Page not found</h1><p>This GhumNepal page does not exist.</p><Link to="/">Return to homepage</Link></main>} />
    </Routes>
  );
}

export default App;