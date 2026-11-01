import { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, MapPin, Users, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import './PlannerPage.css';

const rates = {
  Mustang: 3000,
  Pokhara: 2500,
  Chitwan: 2200,
  'Everest Region': 4500,
};

function PlannerPage() {
  const [destination, setDestination] = useState('Pokhara');
  const [days, setDays] = useState(3);
  const [travellers, setTravellers] = useState(2);
  const [travelStyle, setTravelStyle] = useState('standard');

  const estimate = useMemo(() => {
    const styleFactor = travelStyle === 'budget' ? 0.75 : travelStyle === 'comfort' ? 1.5 : 1;
    return Math.round((rates[destination] * Number(days) * Number(travellers) * styleFactor) / 100) * 100;
  }, [destination, days, travellers, travelStyle]);

  return (
    <main className="planner-page">
      <Link to="/" className="planner-back"><ArrowLeft size={17} /> Back to GhumNepal</Link>
      <section className="planner-heading">
        <span>YOUR TRIP, YOUR WAY</span>
        <h1>Build your Nepal trip.</h1>
        <p>Choose a destination, trip length and group size to get a starting budget estimate.</p>
      </section>

      <div className="planner-layout">
        <form className="planner-form" onSubmit={(event) => event.preventDefault()}>
          <label><span><MapPin size={17} /> Where do you want to go?</span>
            <select value={destination} onChange={(event) => setDestination(event.target.value)}>
              {Object.keys(rates).map((place) => <option key={place}>{place}</option>)}
            </select>
          </label>
          <label><span><CalendarDays size={17} /> How many days?</span>
            <input type="number" min="1" max="30" value={days} onChange={(event) => setDays(Math.min(30, Math.max(1, Number(event.target.value) || 1)))} />
          </label>
          <label><span><Users size={17} /> Number of travellers</span>
            <input type="number" min="1" max="30" value={travellers} onChange={(event) => setTravellers(Math.min(30, Math.max(1, Number(event.target.value) || 1)))} />
          </label>
          <label><span><Wallet size={17} /> Travel style</span>
            <select value={travelStyle} onChange={(event) => setTravelStyle(event.target.value)}>
              <option value="budget">Budget friendly</option>
              <option value="standard">Standard</option>
              <option value="comfort">More comfort</option>
            </select>
          </label>
        </form>

        <aside className="planner-estimate">
          <span className="planner-estimate-label">YOUR STARTING ESTIMATE</span>
          <h2>Rs. {estimate.toLocaleString('en-IN')}</h2>
          <p>Illustrative estimate for {travellers} traveller{travellers > 1 ? 's' : ''} over {days} day{days > 1 ? 's' : ''} in {destination}.</p>
          <div className="planner-estimate-line"><span>Destination</span><strong>{destination}</strong></div>
          <div className="planner-estimate-line"><span>Duration</span><strong>{days} days</strong></div>
          <div className="planner-estimate-line"><span>Group size</span><strong>{travellers}</strong></div>
          <div className="planner-estimate-warning">This is a demo estimate, not a quote or booking price. Transport, accommodation, meals, permits and activities can change the final cost.</div>
          <Link to={`/destinations/${destination.toLowerCase().replace(/\s+/g, '-')}`} className="planner-destination-link">View destination details <ArrowLeft size={16} /></Link>
        </aside>
      </div>
    </main>
  );
}

export default PlannerPage;
