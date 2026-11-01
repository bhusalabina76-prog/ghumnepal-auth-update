# GhumNepal Phase 6 — updated frontend handover

## Implemented in this update
- My Trips filters the shared demo booking ledger by the active demo profile email (guest bookings remain guest-only).
- Demo cancellation asks for confirmation and updates the shared ledger without overwriting other accounts' bookings.
- Booking request IDs include a random suffix; contact email and phone receive stronger validation.
- Published admin destinations are offered in the booking selector with illustrative price and duration.
- Demo signup prevents duplicate account emails and demo sign-in requires an existing profile; no passwords are stored or verified.
- Show/hide password toggle; profile email changes blocked pending real verification.
- Previous partial Phase 6 changes retained (404, admin settings persistence, public catalogue integration, per-profile wishlist).

## Known limitations / not verified
- **Not a production application.** No backend, database, real password authentication, payments or operator notifications.
- Local storage can be inspected or modified and is not a secure user-data boundary.
- npm install/build could not be verified in this environment because dependency installation did not finish within the available execution window.
- No real-browser click-through or visual responsive audit was performed.
- Admin destinations may not yet have full dynamic detail-page and map coverage; those require follow-up integration.
- Browser storage migrations from older demo bookings without ownerEmail will show only in guest view.
- Existing demo accounts do not authenticate passwords; do not enter real credentials.

## Manual QA
1. Install dependencies, run `npm run build` and `npm run dev`.
2. Sign up two demo profiles; verify duplicate signup is rejected and that sign-in requires a registered demo email.
3. Create bookings for each profile and verify My Trips lists only the matching profile's bookings.
4. Request cancellation and confirm that other profile's bookings are preserved.
5. Add/publish a destination in Admin; verify it appears on the homepage and booking selector.
6. Test 404 route, Admin Settings save, wishlist isolation, and all navbar links.
7. Test widths 360, 390, 768, 1024, 1440 pixels and keyboard navigation.

## Phase 7 handover
Replace browser storage with server APIs, enforce real authentication/authorization and user-scoped bookings, and consolidate the destination/package catalogue in the database.
