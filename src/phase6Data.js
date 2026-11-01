// Shared browser-only catalogue and per-demo-profile wishlist helpers. Not secure storage.
export function wishlistKey() {
  try {
    const user = JSON.parse(localStorage.getItem('ghumnepal_demo_user') || 'null');
    return user?.email ? `ghumnepal_wishlist_${user.email.trim().toLowerCase()}` : 'ghumnepal_wishlist_guest';
  } catch { return 'ghumnepal_wishlist_guest'; }
}
export function readCatalogue(fallback = []) {
  try {
    const raw = localStorage.getItem('ghumnepal_admin_destinations');
    if (!raw) return fallback;
    const entries = JSON.parse(raw);
    if (!Array.isArray(entries)) return fallback;
    return entries.filter(item => item.status === 'Published').map(item => {
      const previous = fallback.find(entry => entry.name === item.name);
      return { ...previous, name: item.name, location: item.province || previous?.location || 'Nepal', category: item.category || previous?.category || 'Travel', price: `Rs. ${Number(item.price || 0).toLocaleString('en-IN')}`, days: previous?.days || 'Flexible', image: item.image || previous?.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85' };
    });
  } catch { return fallback; }
}

// A single browser-local booking ledger; records are scoped by the demo account's email.
export function currentDemoEmail() {
  try { return (JSON.parse(localStorage.getItem('ghumnepal_demo_user') || 'null')?.email || '').trim().toLowerCase(); }
  catch { return ''; }
}
export function visibleBookings(all) {
  const email = currentDemoEmail();
  return all.filter(item => email ? item.ownerEmail === email : !item.ownerEmail);
}
export function destinationSlug(name) { return String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
