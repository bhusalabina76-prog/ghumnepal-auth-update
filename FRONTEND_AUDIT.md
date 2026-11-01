# GhumNepal Frontend Audit — Phase 5

## Scope
This is a static review of the uploaded frontend ZIP. The app was inspected for its route map, local browser storage usage, admin demo gate, and handover needs. It was **not** possible to complete a production build in this environment because dependencies were not installed; `npm ci` timed out and `npm run build` therefore reported that Vite was unavailable.

## Routes found in `src/App.jsx`

| Route | Page / purpose | Notes |
|---|---|---|
| `/` | Homepage | Destination search, categories, wishlist actions |
| `/destinations/:slug` | Destination detail | Detail page selected by slug |
| `/planner` | Trip planner | Demo estimates only |
| `/map` | Map | Depends on Leaflet/React Leaflet and map tiles/network |
| `/login` | User sign-in demo | Not production authentication |
| `/signup` | User sign-up demo | Not production authentication |
| `/wishlist` | Saved destinations | Browser-local demo storage |
| `/profile` | Profile and preferences | Browser-local demo data |
| `/settings` | Profile/settings panel | Shares profile page component |
| `/book` | Booking request UI | Does not contact providers or check live availability |
| `/my-trips` | Booking history | Browser-local demo data |
| `/admin/login` | Admin demo login | Credentials are client-side demo credentials |
| `/admin` | Admin console | Client-side `sessionStorage` gate only |

## Important integration/storage keys

- `ghumnepal_wishlist` — saved destination names.
- `ghumnepal_demo_bookings` — demo booking requests.
- `ghumnepal_admin_destinations` — admin-created destination demo records.
- `ghumnepal_admin_packages` — admin-created package demo records.
- `ghumnepal_admin_session` in `sessionStorage` — demo admin login flag.

These are browser-local and are not shared between users, browsers, or devices.

## Limitations to resolve before production

1. Replace demo sign-in and client-side admin gate with server-verified authentication and role-based authorization.
2. Persist users, destinations, packages, bookings, and wishlist through APIs and a database.
3. Validate pricing, date availability, capacity, cancellation policy, and booking status on the server.
4. Add authorization checks to every protected API endpoint; hiding a page in React is not security.
5. Use a secure password hashing strategy, secure session/cookie settings or short-lived access tokens, rate limiting, input validation, and audit logging.
6. Configure SPA route fallback on the eventual hosting platform so direct links such as `/destinations/mustang` and `/admin/login` load correctly.
7. Confirm external map tiles and remote destination images are permitted, reliable, and have fallbacks.
8. Add an explicit not-found route and user-facing error boundaries before launch.
9. Check accessibility: keyboard navigation, visible focus, form labels, contrast, and screen-reader feedback.
10. Review `npm audit` / dependency advisories and pin a supported, tested Node.js version before deployment.

## Verification status

- ZIP archive extracted successfully.
- Source route map and demo storage keys inspected.
- Build **not verified**: `node_modules` was absent; `npm ci --ignore-scripts --no-audit --no-fund` timed out; `npm run build` could not find Vite.
- Manual browser tests remain to be run on the user's machine after `npm install` completes.
