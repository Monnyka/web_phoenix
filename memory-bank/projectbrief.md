# Project Brief

## Project Name
**web_phoenix** — "Phoenix Dashboard"

## Purpose
A React-based front-end admin dashboard for managing monetary contributions, rental rooms, reservations, reports, and settings. It authenticates users via JWT and provides protected, role-based management pages.

## Core Requirements
- **Authentication**: Login with JWT (access + refresh tokens); protected routes that redirect unauthenticated users to `/login`.
- **Dashboard shell**: Sidebar navigation, top navbar, and footer layout shared across all pages.
- **Monetary Contribution (Dashboard page)**: View, search, filter, create, update status, and delete contributions (list with pagination).
- **Rental Rooms (newest)**: Manage rental room records — list with filters (status, month), create, edit, delete, record payments, refresh real-time status, and an overview stats strip.
- **Reservations / Reports / Settings**: Placeholder pages (not yet implemented).
- **Toast notifications** and **confirm dialogs** for actions (HeroUI + custom).
- **Pagination**: 10 records per page for rentals; 25 for guests.

## Scope
- Front-end only. Backend is a separate Express API at `https://api-dev-phoenix.monnykapin.com/api/v1`.
- Primary deliverable in this session: the **Rental Rooms** management page.

## API Base
`https://api-dev-phoenix.monnykapin.com/api/v1` (configured via `.env` `BASE_API_URL`).
