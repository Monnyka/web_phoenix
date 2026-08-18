# Product Context

## Why This Project Exists
Phoenix Dashboard is the management front-end for a rental/hospitality business. It replaces manual or ad-hoc management of contributions and rental rooms with a centralized, authenticated web app.

## Problems It Solves
- **Monetary contributions**: Tracks contributions (outgoing/incoming/settled) with search, filtering, and status transitions.
- **Rental room management**: Gives staff a single place to create rental records, track rent/payment status, record payments, and see an overview (totals, collected/expected/outstanding rent).
- **Access control**: Keeps management behind JWT authentication so only authorized users can act.

## Intended User Experience
- A clean, consistent dashboard shell (sidebar + navbar + footer) across all pages.
- Immediate feedback: toast notifications on success/failure, confirm dialogs before destructive or status-changing actions, and inline error messages.
- Fast, filterable lists with server-side pagination and client-side search.
- A "card" aesthetic with a warm/teal gradient background and rounded surfaces.

## Key UX Patterns
- **List + filters + pagination**: Each management page follows the same "header row → stats (rentals) → filters → table → pagination" pattern.
- **Row actions**: A 3-dot popup menu per row (Record Payment, Refresh Status, Edit, Delete) rendered via a portal.
- **Modals**: Create and Edit open dialogs; destructive/status actions open a confirm dialog first.
- **Empty/error states**: Loading text, "no records found", "no records match your filters", and error messages with clear copy.

## User Goals (Rental Rooms page)
1. Quickly see an overview (Total Rentals, Collected Rent, Expected Rent, Outstanding Rent, Paid/Pending/Overdue).
2. Find records by search, status (`?status=`), or month (`?month=YYYY-MM`).
3. Create, edit, delete, record payments, and refresh real-time status of rentals.
