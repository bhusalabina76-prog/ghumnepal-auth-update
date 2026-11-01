import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ArrowLeft, ArrowUpRight, MapPin, Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

const places = [
  { name: 'Kathmandu', province: 'Bagmati Province', category: 'Culture & Heritage', position: [27.7172, 85.324], description: 'Explore historic squares, temples and lively local streets.' },
  { name: 'Pokhara', province: 'Gandaki Province', category: 'Nature & Lakes', position: [28.2096, 83.9856], description: 'Enjoy lakeside views and a gateway to Himalayan adventures.' },
  { name: 'Mustang', province: 'Gandaki Province', category: 'Adventure', position: [29.18, 83.97], description: 'Discover dramatic landscapes and the culture of the trans-Himalaya.' },
  { name: 'Chitwan', province: 'Bagmati Province', category: 'Wildlife', position: [27.5291, 84.3542], description: 'Experience jungle landscapes and wildlife in southern Nepal.' },
  { name: 'Lumbini', province: 'Lumbini Province', category: 'Spiritual & Heritage', position: [27.6792, 83.507], description: 'Visit the birthplace of Buddha and peaceful monastic gardens.' },
  { name: 'Everest Region', province: 'Koshi Province', category: 'Trekking', position: [27.9881, 86.925], description: 'Explore iconic Himalayan trails and mountain scenery.' },
  { name: 'Bandipur', province: 'Gandaki Province', category: 'Culture & Heritage', position: [27.9389, 84.406], description: 'Wander through a preserved hilltop town with mountain views.' },
  { name: 'Rara Lake', province: 'Karnali Province', category: 'Nature & Lakes', position: [29.526, 82.087], description: 'Find a tranquil alpine lake surrounded by forested hills.' },
];

function FitPlaces({ placesToShow }) {
  const map = useMap();
  if (placesToShow.length === 1) map.setView(placesToShow[0].position, 9);
  return null;
}

export default function MapPage() {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => places.filter((place) => `${place.name} ${place.province} ${place.category}`.toLowerCase().includes(search.toLowerCase())), [search]);

  return <main className="map-page">
    <header className="map-page-header">
      <Link to="/" className="map-back"><ArrowLeft size={17} /> Back to GhumNepal</Link>
      <span className="map-eyebrow">EXPLORE NEPAL</span>
      <h1>Find your next <span>destination.</span></h1>
      <p>Explore places across Nepal, select a marker for details, and open directions in Google Maps.</p>
      <label className="map-search"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search a destination or province..." /></label>
    </header>
    <div className="map-layout">
      <aside className="map-place-list">
        <div className="map-list-title"><strong>Destinations</strong><span>{filtered.length} places</span></div>
        {filtered.map((place) => <button className="map-place-item" key={place.name} onClick={() => window.dispatchEvent(new CustomEvent('ghumnepal-map-focus', { detail: place.name }))}>
          <span className="map-pin-icon"><MapPin size={18} /></span><span className="map-place-copy"><strong>{place.name}</strong><small>{place.province}</small></span><ArrowUpRight size={17} />
        </button>)}
        {filtered.length === 0 && <p className="map-empty">No places found. Try another search.</p>}
      </aside>
      <div className="map-canvas-wrap">
        <MapContainer center={[28.25, 84.2]} zoom={7} scrollWheelZoom className="nepal-map">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <FitPlaces placesToShow={filtered} />
          {filtered.map((place) => <Marker key={place.name} position={place.position}>
            <Popup><div className="map-popup"><strong>{place.name}</strong><span>{place.category}</span><p>{place.description}</p><a href={`https://www.google.com/maps/dir/?api=1&destination=${place.position[0]},${place.position[1]}`} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a></div></Popup>
          </Marker>)}
          <MapFocusListener />
        </MapContainer>
        <div className="map-note">Map tiles by OpenStreetMap contributors. An internet connection is required to load the map.</div>
      </div>
    </div>
    <footer className="map-footer"><Link to="/">← Return to homepage</Link><span>Discover more. Travel deeper. Love Nepal.</span></footer>
  </main>;
}

function MapFocusListener() {
  const map = useMap();
  useEffect(() => {
    const handler = (event) => {
      const place = places.find((item) => item.name === event.detail);
      if (place) map.flyTo(place.position, 9, { duration: 0.8 });
    };
    window.addEventListener('ghumnepal-map-focus', handler);
    return () => window.removeEventListener('ghumnepal-map-focus', handler);
  }, [map]);
  return null;
}
