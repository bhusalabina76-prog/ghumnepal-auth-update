# GhumNepal — Backend API Handover Draft

This document describes the likely API contract the backend developer can implement for the existing React frontend. It is a proposal for coordination, not evidence that these endpoints already exist.

## Suggested resource model

- `User`: `id`, `fullName`, `email`, `phone`, `role`, `createdAt`, `updatedAt`
- `Destination`: `id`, `slug`, `name`, `province`, `category`, `summary`, `description`, `imageUrl`, `highlights`, `bestSeason`, `estimatedPrice`, `status`
- `TourPackage`: `id`, `destinationId`, `name`, `description`, `durationDays`, `pricePerPerson`, `status`, `inclusions`, `exclusions`
- `Booking`: `id`, `userId` (nullable only if guest bookings are deliberately supported), `packageId` or `destinationId`, `startDate`, `durationDays`, `travelerCount`, `contactName`, `contactEmail`, `contactPhone`, `specialRequests`, `priceSnapshot`, `status`, `createdAt`
- `WishlistItem`: `userId`, `destinationId`, `createdAt`
- `AuditLog`: `id`, `actorUserId`, `action`, `resourceType`, `resourceId`, `createdAt`, safe metadata

## Suggested endpoints

### Authentication
- `POST /api/auth/register` — create account; validate email/phone and hash password server-side.
- `POST /api/auth/login` — authenticate; return secure session or token strategy.
- `POST /api/auth/logout` — revoke/clear session.
- `GET /api/auth/me` — current signed-in user and role.
- `PATCH /api/users/me` — update profile fields.
- `PATCH /api/users/me/password` — change password after verifying current password.

### Destinations and packages
- `GET /api/destinations?q=&category=&province=&page=` — public destination search/filter.
- `GET /api/destinations/:slug` — destination details.
- `GET /api/packages?destinationId=&page=` — public package listing.
- `GET /api/packages/:id` — package detail.
- `POST /api/admin/destinations` — admin-only create.
- `PATCH /api/admin/destinations/:id` — admin-only update.
- `DELETE /api/admin/destinations/:id` — admin-only delete/archive.
- `POST /api/admin/packages`, `PATCH /api/admin/packages/:id`, `DELETE /api/admin/packages/:id` — admin-only package management.

### Wishlist
- `GET /api/users/me/wishlist`
- `PUT /api/users/me/wishlist/:destinationId` — add idempotently.
- `DELETE /api/users/me/wishlist/:destinationId` — remove.

### Bookings and trips
- `POST /api/bookings` — validate dates, capacity, price, and booking policy on server; return pending request.
- `GET /api/users/me/bookings` — current user's booking history.
- `GET /api/bookings/:id` — owner or authorized staff only.
- `POST /api/bookings/:id/cancellation-request` — request cancellation.
- `GET /api/admin/bookings?status=&q=&page=` — admin/staff only.
- `PATCH /api/admin/bookings/:id/status` — allowed transitions enforced server-side and audit logged.
- `GET /api/admin/reports/summary` — server-calculated counts/revenue, role-protected.

## Contract conventions

- JSON request and response bodies; consistent errors such as `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": {} } }`.
- Use ISO 8601 timestamps and ISO date strings for travel dates; document timezone expectations.
- Use NPR as the display currency, but store monetary values as integer minor units or a defined decimal type and document rounding.
- Paginate admin/user lists and support server-side filters rather than fetching all records.
- The server must derive identity and role from the authenticated session/token; never trust a client-supplied `userId`, `role`, price, or status.
- Keep payment integration separate until a verified payment provider flow and webhook verification are designed.
- Do not return password hashes, secrets, or sensitive internal audit metadata to the browser.

## Frontend integration steps

1. Agree on exact field names and booking status values with the backend developer.
2. Add an API client module and environment variable such as `VITE_API_BASE_URL` (never put private secrets in Vite env variables).
3. Replace `localStorage` reads/writes with API calls for authenticated data; optionally migrate local wishlist only after user consent and account matching.
4. Add loading, empty, validation, offline, unauthorized, and server-error states for every API-backed page.
5. Test permissions with normal user, admin, expired session, and unauthenticated requests.
