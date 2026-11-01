import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mountain, LayoutDashboard, MapPinned, Package, CalendarCheck, Users,
  ChartNoAxesCombined, Settings, Search, Bell, ChevronDown, ArrowUpRight,
  ArrowDownRight, Plus, MoreHorizontal, Eye, Pencil, Trash2, Check, X,
  Menu, ExternalLink, Download, SlidersHorizontal, Clock3, CircleCheck,
  CircleX, Wallet, TrendingUp, MapPin, LogOut, RefreshCw,
} from 'lucide-react';
import './AdminPage.css';

const BOOKING_KEY = 'ghumnepal_demo_bookings';
const DESTINATION_KEY = 'ghumnepal_admin_destinations';
const PACKAGE_KEY = 'ghumnepal_admin_packages';
const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
const initialDestinations = [
  { id: 'dest-mustang', name: 'Mustang', province: 'Gandaki Province', category: 'Adventure', price: 12000, status: 'Published' },
  { id: 'dest-pokhara', name: 'Pokhara', province: 'Gandaki Province', category: 'Nature & Lakes', price: 8000, status: 'Published' },
  { id: 'dest-chitwan', name: 'Chitwan', province: 'Bagmati Province', category: 'Wildlife', price: 6500, status: 'Published' },
  { id: 'dest-everest', name: 'Everest Region', province: 'Koshi Province', category: 'Trekking', price: 25000, status: 'Published' },
];
const initialPackages = [
  { id: 'pkg-001', name: 'Mustang Cultural Escape', destination: 'Mustang', days: 4, price: 12000, status: 'Active' },
  { id: 'pkg-002', name: 'Pokhara Lakeside Getaway', destination: 'Pokhara', days: 3, price: 8000, status: 'Active' },
  { id: 'pkg-003', name: 'Chitwan Nature Weekend', destination: 'Chitwan', days: 2, price: 6500, status: 'Active' },
];
const demoUsers = [
  { id: 'USR-1001', name: 'Aarav Sharma', email: 'aarav@example.com', joined: 'Oct 24, 2026', trips: 2, status: 'Active' },
  { id: 'USR-1002', name: 'Sanjana Karki', email: 'sanjana@example.com', joined: 'Oct 21, 2026', trips: 1, status: 'Active' },
  { id: 'USR-1003', name: 'Nischal Thapa', email: 'nischal@example.com', joined: 'Oct 18, 2026', trips: 0, status: 'Active' },
  { id: 'USR-1004', name: 'Mira Gurung', email: 'mira@example.com', joined: 'Oct 14, 2026', trips: 3, status: 'Inactive' },
];
function readJson(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; }
  catch { return fallback; }
}
function money(value) { return `Rs. ${Number(value || 0).toLocaleString('en-IN')}`; }
function bookingTotal(booking) {
  if (Number.isFinite(Number(booking.total))) return Number(booking.total);
  if (Number.isFinite(Number(booking.estimatedTotal))) return Number(booking.estimatedTotal);
  return 0;
}
function normalizeBooking(item, index) {
  return {
    ...item,
    id: item.id || `GN-DEMO-${index + 1}`,
    destination: item.destination || 'Not specified',
    startDate: item.startDate || item.date || 'Not selected',
    travelers: Number(item.travelers || 1),
    contact: item.contact || { name: item.name || 'Guest traveller', email: item.email || '—', phone: item.phone || '—' },
    status: STATUS_OPTIONS.includes(item.status) || item.status === 'Cancellation requested' ? item.status : 'Pending',
  };
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState('Overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [bookings, setBookings] = useState(() => readJson(BOOKING_KEY, []).map(normalizeBooking));
  const [destinations, setDestinations] = useState(() => readJson(DESTINATION_KEY, initialDestinations));
  const [packages, setPackages] = useState(() => readJson(PACKAGE_KEY, initialPackages));
  const [toast, setToast] = useState('');
  const [workspace, setWorkspace] = useState(() => readJson('ghumnepal_admin_preferences', { name: 'GhumNepal', currency: 'NPR' }));
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem(DESTINATION_KEY, JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem(PACKAGE_KEY, JSON.stringify(packages)); }, [packages]);
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(''), 2600); return () => window.clearTimeout(timer); }, [toast]);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((item) => item.status === 'Pending' || item.status === 'Cancellation requested').length;
  const confirmedBookings = bookings.filter((item) => item.status === 'Confirmed').length;
  const estimatedRevenue = bookings.filter((item) => item.status === 'Confirmed' || item.status === 'Completed').reduce((sum, item) => sum + bookingTotal(item), 0);
  const filteredBookings = useMemo(() => bookings.filter((item) => `${item.id} ${item.destination} ${item.contact?.name} ${item.contact?.email} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [bookings, query]);
  const filteredDestinations = useMemo(() => destinations.filter((item) => `${item.name} ${item.province} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [destinations, query]);
  const filteredPackages = useMemo(() => packages.filter((item) => `${item.name} ${item.destination} ${item.status}`.toLowerCase().includes(query.toLowerCase())), [packages, query]);

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, group: 'WORKSPACE' },
    { label: 'Bookings', icon: CalendarCheck, group: 'WORKSPACE', count: pendingBookings || null },
    { label: 'Destinations', icon: MapPinned, group: 'MANAGEMENT' },
    { label: 'Packages', icon: Package, group: 'MANAGEMENT' },
    { label: 'Users', icon: Users, group: 'MANAGEMENT' },
    { label: 'Reports', icon: ChartNoAxesCombined, group: 'INSIGHTS' },
    { label: 'Settings', icon: Settings, group: 'SYSTEM' },
  ];

  function updateBooking(id, status) {
    setBookings((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setToast(`Booking updated to ${status.toLowerCase()}.`);
  }
  function openAddDestination(item = null) {
    setForm(item ? { ...item } : { name: '', province: 'Gandaki Province', category: 'Nature & Lakes', price: '', status: 'Published' });
    setModal({ type: 'destination', item });
  }
  function saveDestination(event) {
    event.preventDefault();
    if (!form.name?.trim() || !form.province?.trim() || Number(form.price) < 0 || form.price === '') return setToast('Please enter a name, province and valid price.');
    const item = { ...form, id: form.id || `dest-${Date.now()}`, name: form.name.trim(), price: Number(form.price) };
    const next = modal.item ? destinations.map((destination) => destination.id === item.id ? item : destination) : [...destinations, item];
    setDestinations(next); localStorage.setItem(DESTINATION_KEY, JSON.stringify(next)); setModal(null); setToast(modal.item ? 'Destination updated.' : 'Destination added.');
  }
  function openAddPackage(item = null) {
    setForm(item ? { ...item } : { name: '', destination: destinations[0]?.name || '', days: 3, price: '', status: 'Active' });
    setModal({ type: 'package', item });
  }
  function savePackage(event) {
    event.preventDefault();
    if (!form.name?.trim() || !form.destination || Number(form.days) < 1 || Number(form.price) < 0 || form.price === '') return setToast('Please complete all required package fields.');
    const item = { ...form, id: form.id || `pkg-${Date.now()}`, name: form.name.trim(), days: Number(form.days), price: Number(form.price) };
    const next = modal.item ? packages.map((entry) => entry.id === item.id ? item : entry) : [...packages, item];
    setPackages(next); localStorage.setItem(PACKAGE_KEY, JSON.stringify(next)); setModal(null); setToast(modal.item ? 'Package updated.' : 'Package added.');
  }
  function deleteItem(type, id) {
    if (!window.confirm(`Delete this ${type}? This only changes the local demo data.`)) return;
    if (type === 'destination') setDestinations((current) => current.filter((item) => item.id !== id));
    if (type === 'package') setPackages((current) => current.filter((item) => item.id !== id));
    setToast(`${type === 'destination' ? 'Destination' : 'Package'} deleted from demo data.`);
  }
  function refreshBookings() {
    setBookings(readJson(BOOKING_KEY, []).map(normalizeBooking));
    setToast('Booking list refreshed from this browser.');
  }
  function exportBookings() {
    const headers = ['Booking ID', 'Destination', 'Traveller', 'Email', 'Phone', 'Date', 'Travellers', 'Status', 'Estimated total'];
    const rows = bookings.map((item) => [item.id, item.destination, item.contact?.name, item.contact?.email, item.contact?.phone, item.startDate, item.travelers, item.status, bookingTotal(item)]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'ghumnepal-demo-bookings.csv'; anchor.click(); URL.revokeObjectURL(url);
    setToast('Demo booking CSV exported.');
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <Link to="/" className="admin-brand"><span className="admin-brand-icon"><Mountain size={23} /></span><span>ghum<span>nepal</span><small>ADMIN CONSOLE</small></span></Link>
        <div className="admin-workspace"><span className="workspace-dot" /><span><strong>GhumNepal</strong><small>Travel workspace</small></span><ChevronDown size={15} /></div>
        {['WORKSPACE', 'MANAGEMENT', 'INSIGHTS', 'SYSTEM'].map((group) => (
          <div className="admin-nav-group" key={group}><p>{group}</p>{navItems.filter((item) => item.group === group).map(({ label, icon: Icon, count }) => (
            <button type="button" key={label} className={`admin-nav-item ${section === label ? 'admin-nav-active' : ''}`} onClick={() => { setSection(label); setQuery(''); setSidebarOpen(false); }}><Icon size={18} /><span>{label}</span>{count ? <b>{count}</b> : null}</button>
          ))}</div>
        ))}
        <div className="admin-sidebar-bottom"><div className="admin-help-card"><div className="help-icon">?</div><strong>Need a hand?</strong><p>Keep your travel workspace organized.</p><button type="button" onClick={() => setToast('Support contact can be connected during backend integration.')}>Contact support <ArrowUpRight size={14} /></button></div><Link to="/" className="admin-back-home"><ExternalLink size={16} /> Back to website</Link></div>
      </aside>
      {sidebarOpen && <button className="admin-sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
      <main className="admin-main">
        <header className="admin-topbar"><button className="admin-mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21} /></button><div className="admin-breadcrumb"><span>Workspace</span><span>/</span><strong>{section}</strong></div><div className="admin-top-actions"><label className="admin-global-search"><Search size={17} /><input aria-label="Search current section" placeholder="Search this page..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label><button className="admin-icon-button" title="Notifications" onClick={() => setToast(`${pendingBookings} booking request(s) need review.`)}><Bell size={18} />{pendingBookings > 0 && <i />}</button><div className="admin-profile-chip"><span className="admin-avatar">A</span><span><strong>Admin User</strong><small>Workspace admin</small></span></div><button type="button" className="admin-logout-button" onClick={() => { sessionStorage.removeItem('ghumnepal_admin_session'); navigate('/admin/login', { replace: true }); }} title="Sign out"><LogOut size={17} /><span>Logout</span></button></div></header>
        <div className="admin-content">
          <div className="admin-page-heading"><div><span className="admin-eyebrow">GHUMNEPAL MANAGEMENT</span><h1>{section === 'Overview' ? 'Good afternoon, Admin 👋' : section}</h1><p>{section === 'Overview' ? 'Here’s what’s happening across your travel workspace.' : section === 'Bookings' ? 'Review booking requests and update their demo status.' : section === 'Destinations' ? 'Manage the places travellers can discover.' : section === 'Packages' ? 'Manage sample tours and package pricing.' : section === 'Users' ? 'Review sample traveller accounts.' : section === 'Reports' ? 'A snapshot of your current browser demo data.' : 'Configure the demo workspace preferences.'}</p></div><div className="admin-heading-actions"><span className="admin-date-pill"><Clock3 size={15} /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>{section === 'Bookings' && <button className="admin-button admin-button-light" onClick={refreshBookings}><RefreshCw size={16} /> Refresh</button>}{section === 'Bookings' && <button className="admin-button admin-button-primary" onClick={exportBookings}><Download size={16} /> Export CSV</button>}{section === 'Destinations' && <button className="admin-button admin-button-primary" onClick={() => openAddDestination()}><Plus size={17} /> Add destination</button>}{section === 'Packages' && <button className="admin-button admin-button-primary" onClick={() => openAddPackage()}><Plus size={17} /> Add package</button>}</div></div>

          {section === 'Overview' && <>
            <div className="admin-stat-grid">
              <StatCard label="Total bookings" value={totalBookings} change="From this browser" icon={CalendarCheck} tone="green" trend="up" />
              <StatCard label="Pending requests" value={pendingBookings} change="Need your attention" icon={Clock3} tone="amber" trend="down" />
              <StatCard label="Confirmed trips" value={confirmedBookings} change="Confirmed in demo" icon={CircleCheck} tone="blue" trend="up" />
              <StatCard label="Estimated revenue" value={money(estimatedRevenue)} change="Confirmed/completed only" icon={Wallet} tone="violet" trend="up" />
            </div>
            <div className="admin-overview-grid"><section className="admin-panel admin-recent-panel"><div className="admin-panel-heading"><div><h2>Recent bookings</h2><p>Latest requests from this browser</p></div><button className="admin-text-button" onClick={() => setSection('Bookings')}>View all <ArrowUpRight size={15} /></button></div>{bookings.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Booking</th><th>Traveller</th><th>Destination</th><th>Travel date</th><th>Status</th></tr></thead><tbody>{[...bookings].slice(-5).reverse().map((item) => <tr key={item.id}><td><strong className="admin-id">{item.id}</strong></td><td><span className="admin-person-cell"><span className="person-avatar">{(item.contact?.name || 'G').slice(0, 1).toUpperCase()}</span>{item.contact?.name || 'Guest traveller'}</span></td><td>{item.destination}</td><td>{item.startDate}</td><td><StatusPill status={item.status} /></td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarCheck} title="No booking requests yet" text="When demo bookings are created on this browser, they’ll appear here." action={() => setSection('Bookings')} actionLabel="Open bookings" />}</section><section className="admin-panel admin-quick-panel"><div className="admin-panel-heading"><div><h2>Quick overview</h2><p>Your demo workspace at a glance</p></div><SlidersHorizontal size={18} /></div><div className="admin-mini-metric"><span className="mini-metric-icon green"><MapPinned size={18} /></span><span><strong>{destinations.length} destinations</strong><small>Available in admin demo</small></span><button onClick={() => setSection('Destinations')} aria-label="Manage destinations"><ArrowUpRight size={17} /></button></div><div className="admin-mini-metric"><span className="mini-metric-icon purple"><Package size={18} /></span><span><strong>{packages.length} tour packages</strong><small>Sample package catalogue</small></span><button onClick={() => setSection('Packages')} aria-label="Manage packages"><ArrowUpRight size={17} /></button></div><div className="admin-mini-metric"><span className="mini-metric-icon blue"><Users size={18} /></span><span><strong>{demoUsers.length} sample users</strong><small>Illustrative user records</small></span><button onClick={() => setSection('Users')} aria-label="Manage users"><ArrowUpRight size={17} /></button></div><div className="admin-tip-box"><TrendingUp size={18} /><p><strong>Tip for your handover</strong><br />These demo records use browser storage. Connect the API before using this console for real operations.</p></div></section></div>
          </>}

          {section === 'Bookings' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Booking requests</h2><p>{filteredBookings.length} request(s) match your search</p></div><button className="admin-button admin-button-light" onClick={exportBookings}><Download size={15} /> Export CSV</button></div>{filteredBookings.length ? <div className="admin-table-wrap"><table className="admin-table admin-wide-table"><thead><tr><th>Booking ID</th><th>Traveller</th><th>Destination</th><th>Travel date</th><th>People</th><th>Estimate</th><th>Status</th><th>Update status</th></tr></thead><tbody>{filteredBookings.map((item) => <tr key={item.id}><td><strong className="admin-id">{item.id}</strong></td><td><span className="admin-person-cell"><span className="person-avatar">{(item.contact?.name || 'G').slice(0, 1).toUpperCase()}</span><span>{item.contact?.name || 'Guest'}<small className="admin-cell-sub">{item.contact?.email || '—'}</small></span></span></td><td>{item.destination}</td><td>{item.startDate}</td><td>{item.travelers}</td><td>{money(bookingTotal(item))}</td><td><StatusPill status={item.status} /></td><td><select className="admin-status-select" value={STATUS_OPTIONS.includes(item.status) ? item.status : 'Pending'} onChange={(event) => updateBooking(item.id, event.target.value)} aria-label={`Update status for ${item.id}`}>{STATUS_OPTIONS.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}</tbody></table></div> : <EmptyState icon={CalendarCheck} title={query ? 'No matching bookings' : 'No booking requests yet'} text={query ? 'Try a different search term.' : 'Create a demo booking from the public website, then refresh this list.'} action={query ? () => setQuery('') : () => window.open('/book', '_blank', 'noopener,noreferrer')} actionLabel={query ? 'Clear search' : 'Open booking page'} />}</section>}

          {section === 'Destinations' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Destination catalogue</h2><p>{filteredDestinations.length} destination(s)</p></div><button className="admin-button admin-button-primary" onClick={() => openAddDestination()}><Plus size={16} /> Add destination</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Destination</th><th>Province</th><th>Category</th><th>Base estimate</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredDestinations.map((item) => <tr key={item.id}><td><span className="admin-destination-cell"><span className="destination-thumb"><MapPin size={17} /></span><strong>{item.name}</strong></span></td><td>{item.province}</td><td><span className="admin-category-tag">{item.category}</span></td><td>{money(item.price)}</td><td><StatusPill status={item.status} /></td><td><div className="admin-row-actions"><button title="Edit destination" onClick={() => openAddDestination(item)}><Pencil size={15} /></button><button title="Delete destination" onClick={() => deleteItem('destination', item.id)}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>{!filteredDestinations.length && <EmptyState icon={MapPinned} title="No destinations found" text="Try changing the search term or add a destination." action={() => openAddDestination()} actionLabel="Add destination" />}</section>}

          {section === 'Packages' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Tour packages</h2><p>{filteredPackages.length} package(s) in this demo</p></div><button className="admin-button admin-button-primary" onClick={() => openAddPackage()}><Plus size={16} /> Add package</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Package</th><th>Destination</th><th>Duration</th><th>Per person</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filteredPackages.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small className="admin-cell-sub">{item.id}</small></td><td>{item.destination}</td><td>{item.days} days</td><td>{money(item.price)}</td><td><StatusPill status={item.status} /></td><td><div className="admin-row-actions"><button title="Edit package" onClick={() => openAddPackage(item)}><Pencil size={15} /></button><button title="Delete package" onClick={() => deleteItem('package', item.id)}><Trash2 size={15} /></button></div></td></tr>)}</tbody></table></div>{!filteredPackages.length && <EmptyState icon={Package} title="No packages found" text="Try changing the search term or add a package." action={() => openAddPackage()} actionLabel="Add package" />}</section>}

          {section === 'Users' && <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Traveller accounts</h2><p>Illustrative records for the admin UI</p></div><span className="admin-demo-label">DEMO DATA</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>User</th><th>User ID</th><th>Joined</th><th>Trips</th><th>Status</th><th>Note</th></tr></thead><tbody>{demoUsers.filter((item) => `${item.name} ${item.email} ${item.id}`.toLowerCase().includes(query.toLowerCase())).map((item) => <tr key={item.id}><td><span className="admin-person-cell"><span className="person-avatar">{item.name.slice(0, 1)}</span><span>{item.name}<small className="admin-cell-sub">{item.email}</small></span></span></td><td>{item.id}</td><td>{item.joined}</td><td>{item.trips}</td><td><StatusPill status={item.status} /></td><td><span className="admin-muted">Sample only</span></td></tr>)}</tbody></table></div><p className="admin-inline-note">User management is read-only sample data until backend authentication and user APIs are connected.</p></section>}

          {section === 'Reports' && <div className="admin-report-grid"><section className="admin-panel"><div className="admin-panel-heading"><div><h2>Booking status</h2><p>Current local demo bookings</p></div><ChartNoAxesCombined size={20} /></div>{['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => { const count = bookings.filter((item) => item.status === status).length; const max = Math.max(1, bookings.length); return <div className="report-bar-row" key={status}><div><span>{status}</span><strong>{count}</strong></div><div className="report-track"><span className={`report-bar bar-${status.toLowerCase()}`} style={{ width: `${(count / max) * 100}%` }} /></div></div>; })}<p className="admin-inline-note">Charts reflect only requests saved in this browser. This is not production analytics.</p></section><section className="admin-panel"><div className="admin-panel-heading"><div><h2>Catalogue summary</h2><p>Published demo inventory</p></div><MapPinned size={20} /></div><div className="report-summary"><span>Destinations</span><strong>{destinations.length}</strong></div><div className="report-summary"><span>Tour packages</span><strong>{packages.length}</strong></div><div className="report-summary"><span>Estimated confirmed revenue</span><strong>{money(estimatedRevenue)}</strong></div><button className="admin-button admin-button-light report-export" onClick={exportBookings}><Download size={15} /> Export booking CSV</button></section></div>}

          {section === 'Settings' && <section className="admin-panel admin-settings-panel"><div className="admin-panel-heading"><div><h2>Workspace settings</h2><p>Frontend demo preferences</p></div><Settings size={20} /></div><div className="admin-setting-row"><div><strong>Workspace name</strong><p>The label shown in this admin console.</p></div><input value={workspace.name} onChange={e => setWorkspace({ ...workspace, name: e.target.value })} aria-label="Workspace name" /></div><div className="admin-setting-row"><div><strong>Default currency</strong><p>Used for illustrative package estimates.</p></div><select value={workspace.currency} onChange={e => setWorkspace({ ...workspace, currency: e.target.value })} aria-label="Default currency"><option value="NPR">NPR — Nepalese Rupee</option><option value="USD">USD — US Dollar</option></select></div><div className="admin-setting-row"><div><strong>Demo data storage</strong><p>Bookings, destinations and packages are stored in this browser only.</p></div><span className="admin-demo-label">LOCAL STORAGE</span></div><div className="admin-setting-actions"><button className="admin-button admin-button-primary" onClick={() => { if (!workspace.name.trim()) { setToast('Workspace name is required.'); return; } localStorage.setItem('ghumnepal_admin_preferences', JSON.stringify(workspace)); setToast('Demo workspace preferences saved in this browser.'); }}>Save preferences</button><button className="admin-button admin-button-light" onClick={() => { if (window.confirm('Reset destination and package lists to the starter demo values?')) { setDestinations(initialDestinations); setPackages(initialPackages); setToast('Demo catalogue reset.'); } }}>Reset demo catalogue</button></div><div className="admin-security-note"><CircleCheck size={18} /><p><strong>Backend handover note</strong><br />This page is not protected by real admin authentication. Add server-side role-based access control before handling real users, bookings, or payments.</p></div></section>}
        </div>
      </main>
      {toast && <div className="admin-toast" role="status"><Check size={17} />{toast}<button onClick={() => setToast('')} aria-label="Dismiss notification"><X size={15} /></button></div>}
      {modal && <div className="admin-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null); }}><form className="admin-modal" onSubmit={modal.type === 'destination' ? saveDestination : savePackage}><div className="admin-modal-heading"><div><span className="admin-eyebrow">CATALOGUE MANAGEMENT</span><h2>{modal.item ? 'Edit' : 'Add'} {modal.type === 'destination' ? 'destination' : 'tour package'}</h2></div><button type="button" className="admin-icon-button" onClick={() => setModal(null)} aria-label="Close dialog"><X size={18} /></button></div>{modal.type === 'destination' ? <><label>Destination name<input required value={form.name || ''} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Ilam" /></label><label>Province<input required value={form.province || ''} onChange={(event) => setForm({ ...form, province: event.target.value })} placeholder="e.g. Koshi Province" /></label><label>Category<select value={form.category || 'Nature & Lakes'} onChange={(event) => setForm({ ...form, category: event.target.value })}>{['Adventure', 'Nature & Lakes', 'Wildlife', 'Trekking', 'Culture & Heritage', 'Spiritual', 'Food & Culture'].map((item) => <option key={item}>{item}</option>)}</select></label><label>Estimated base price (NPR)<input required min="0" type="number" value={form.price ?? ''} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="12000" /></label><label>Status<select value={form.status || 'Published'} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Published</option><option>Draft</option></select></label></> : <><label>Package name<input required value={form.name || ''} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Lakeside Weekend" /></label><label>Destination<select required value={form.destination || ''} onChange={(event) => setForm({ ...form, destination: event.target.value })}>{destinations.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label><div className="admin-modal-two-col"><label>Duration (days)<input required min="1" type="number" value={form.days ?? 3} onChange={(event) => setForm({ ...form, days: event.target.value })} /></label><label>Price per person (NPR)<input required min="0" type="number" value={form.price ?? ''} onChange={(event) => setForm({ ...form, price: event.target.value })} /></label></div><label>Status<select value={form.status || 'Active'} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Active</option><option>Draft</option></select></label></>}<div className="admin-modal-actions"><button type="button" className="admin-button admin-button-light" onClick={() => setModal(null)}>Cancel</button><button type="submit" className="admin-button admin-button-primary"><Check size={16} /> Save {modal.type === 'destination' ? 'destination' : 'package'}</button></div></form></div>}
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, tone, trend }) {
  return <section className="admin-stat-card"><div className={`admin-stat-icon ${tone}`}><Icon size={19} /></div><span className="admin-stat-label">{label}</span><strong className="admin-stat-value">{value}</strong><div className="admin-stat-foot"><span className={`admin-trend ${trend}`} >{trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span></div></section>;
}
function StatusPill({ status }) {
  const className = String(status || 'Pending').toLowerCase().replaceAll(' ', '-');
  return <span className={`admin-status-pill status-${className}`}>{status || 'Pending'}</span>;
}
function EmptyState({ icon: Icon, title, text, action, actionLabel }) {
  return <div className="admin-empty-state"><span><Icon size={24} /></span><h3>{title}</h3><p>{text}</p>{action && <button className="admin-button admin-button-light" onClick={action}>{actionLabel}</button>}</div>;
}
