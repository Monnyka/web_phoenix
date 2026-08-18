# Progress

## What Works
- **Authentication**: Login flow (JWT), logout with confirm dialog, protected routes, stored session in localStorage.
- **Dashboard shell**: Sidebar navigation (Monetary Contribution, Rental Rooms, Reservations, Reports, Settings), navbar with user + logout, footer.
- **Monetary Contribution page** (`/dashboard`): list + pagination, search, status filter, create, update status, delete, toast/confirm. (Pre-existing; working.)
- **Rental Rooms page** (`/dashboard/rentals`) — newly added:
  - List with search, status filter (`?status=`), month filter (`?month=YYYY-MM`), pagination.
  - Stats strip (Total Rentals, Collected Rent, Expected Rent, Outstanding Rent, Paid, Pending, Overdue).
  - Create / Edit / Delete, Record Payment (`→ paid`), Refresh Status (real-time).
  - Confirm dialogs and toast notifications.
  - Handles populated `roomId`/`tenantId` objects safely via `formatReference()`.
- **Placeholder pages**: Reservations, Reports, Settings render a simple "content can be added here" card.
- **Build**: `npm run build` passes (Vite/Rolldown). `npm run lint` runs (has pre-existing warnings, no undefined-variable errors).

## What's Left to Build
- Reservations, Reports, and Settings page content (currently placeholders).
- A proper **error boundary** (recommended — currently a render crash = blank page).
- **Test setup** (Vitest + Testing Library) — none exists.
- Optional: dev-only `public/env.js` to silence the `/env.js` 404.

## Current Status
- The Rental Rooms feature is implemented and builds cleanly.
- The last reported blank-page issue was fixed: the page was crashing because `roomId`/`tenantId` are returned as **populated objects** (`{ _id, number }`), which were being rendered directly as React children. Fixed with `formatReference()`.

## Known Issues
1. **API rate limiting**: 100 requests / 15 min. On exceed, returns `429` without CORS headers → browser `Failed to fetch` (now caught and shown as a clearer message). Wait ~15 min to recover.
2. **Token expiry**: `ProtectedRoute` only checks token existence, not validity. Expired tokens pass routing but API calls return `401` → "Unable to load rentals list." Requires re-login.
3. **`/env.js` 404 in dev**: harmless; app falls back to `import.meta.env.BASE_API_URL`.
4. **`fetchRentalStats`** (the `GET /rentals/stats` service function) is exported but **unused** — the page uses the embedded `stats` from the list response. Could be removed or wired up if backend changes.
5. **Pre-existing lint warnings**: `react-hooks/set-state-in-effect` in both `DashboardPage.jsx` and `RentalsPage.jsx` (the `setPopupMenuStyle({})` in the `openMenuId` effect) and an unused `user` variable in `DashboardPage.jsx`. Not new; consistent with existing patterns.

## Evolution of Decisions
- Rental stats were moved from a dedicated `/stats` call to the **embedded `stats` field** in the list response (fewer requests, respects rate limit).
- Month filtering changed from client-side to **server-side** `?month=YYYY-MM` to match the API and enable accurate stats per month.
- Identified the need to handle **populated reference fields** (`roomId`/`tenantId` as objects) after a production-style crash.
