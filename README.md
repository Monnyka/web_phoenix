# Phoenix Dashboard

A React + Vite web application for managing monetary contributions with a full dashboard experience.

## Features

- **Authentication** — Login with JWT token; protected routes
- **Dashboard** — Sidebar navigation, navbar, and footer layout
- **Monetary Contributions** — View, search, filter, create, update status, and delete contributions
- **Pagination** — 25 records per page
- **Toast Notifications** — HeroUI toast feedback on create, update, and delete
- **Confirm Dialogs** — Confirmation popup before destructive or status-change actions

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)
- [HeroUI v3](https://heroui.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

```
src/
  assets/         Static assets
  components/     Shared components (DashboardLayout, ProtectedRoute)
  lib/            Utilities (toast queue)
  pages/          Route-level pages (LoginPage, DashboardPage, …)
  services/       API client functions (auth, guests)
  App.jsx         Route definitions
  main.jsx        App entry point
```

## API

Connects to `https://api-dev-phoenix.monnykapin.com/api/v1/guests`.

| Method | Endpoint      | Description                     |
| ------ | ------------- | ------------------------------- |
| GET    | `/guests`     | List contributions (pagination) |
| POST   | `/guests`     | Create contribution             |
| PATCH  | `/guests/:id` | Update status                   |
| DELETE | `/guests/:id` | Delete contribution             |
