# GhumNepal Manual Frontend Test Checklist

Run from the folder containing `package.json`:

```powershell
npm install
npm run dev
```

Use the local URL printed by Vite. Run the checks in a fresh browser profile if you need clean demo data.

## Navigation and pages
- [ ] Homepage loads without console errors.
- [ ] Homepage links work: destinations, map, planner, login/signup, wishlist, profile, booking, my trips.
- [ ] Directly open `/destinations/mustang`, `/planner`, `/map`, `/wishlist`, `/profile`, `/settings`, `/book`, `/my-trips`, and `/admin/login`.
- [ ] Refresh each route and verify the host serves the SPA route correctly.
- [ ] Unknown route behavior is reviewed; add a not-found page before production.

## Search, destination details, and map
- [ ] Search by destination name, province, and category.
- [ ] Combine search and category filter; clear filters.
- [ ] Open each destination detail and confirm correct title, image, details, and links.
- [ ] Save and remove each destination from the wishlist; verify list updates after refresh.
- [ ] Map loads, markers are usable, and a failed tile/network request has a reasonable fallback.

## Planner, profile, and auth demo
- [ ] Change destination, days, traveller count, and travel style; estimate updates correctly.
- [ ] Profile fields/preferences save and persist after refresh.
- [ ] Password form validates missing fields, mismatch, and minimum length; do not treat this as a real password change.
- [ ] User sign-in/sign-up UI validates input and clearly communicates demo-only behavior.

## Booking demo
- [ ] Submit valid booking request and verify a confirmation/reference is shown.
- [ ] Test missing/invalid contact details and invalid dates.
- [ ] Verify total estimate against traveller count and chosen options.
- [ ] Confirm booking appears in My Trips after refresh.
- [ ] Test cancellation-request UI and status labels.
- [ ] Confirm UI does not imply that a real reservation/payment occurred.

## Admin demo
- [ ] Open `/admin` without login and verify redirect to `/admin/login`.
- [ ] Demo credentials work; incorrect credentials show an error.
- [ ] Logout returns to login; `/admin` redirects after logout.
- [ ] Add/edit/delete destination and package; verify persistence after refresh.
- [ ] Create a demo booking, refresh admin bookings, change status, export CSV.
- [ ] Confirm admin demo limitations are documented and do not use it for real operations.

## Responsive/accessibility and release
- [ ] Test widths around 360px, 768px, 1024px, and wide desktop.
- [ ] Keyboard tab through navigation, forms, dialogs, and buttons; focus is visible.
- [ ] Check labels, alt text, color contrast, and error announcements.
- [ ] Resolve console errors, missing assets, broken links, and React warnings.
- [ ] `npm run build` passes locally and the production preview works.
- [ ] Backend/API handover contract reviewed and approved by the backend developer.
