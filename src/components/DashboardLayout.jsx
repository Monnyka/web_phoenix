import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearAuthSession, getStoredUser } from "../services/auth";

const menuItems = [
  { label: "Monetary Contribution", path: "/dashboard" },
  { label: "Reservations", path: "/dashboard/reservations" },
  { label: "Reports", path: "/dashboard/reports" },
  { label: "Settings", path: "/dashboard/settings" },
];

function DashboardLayout({ title, kicker = "Phoenix", children, footerNote }) {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    clearAuthSession();
    navigate("/login", { replace: true });
  };

  return (
    <main className="dashboard-shell">
      <header className="dashboard-navbar">
        <div>
          <p className="hero-kicker">{kicker}</p>
          <h1>{title}</h1>
        </div>
        <div className="dashboard-navbar-right">
          <p className="dashboard-user">{user?.name || "User"}</p>
          <button
            type="button"
            className="dashboard-logout-btn"
            onClick={() => setShowLogoutConfirm(true)}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <p className="sidebar-title">Menu</p>
          <nav>
            <ul className="sidebar-menu">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      isActive ? "sidebar-link active" : "sidebar-link"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="dashboard-content">{children}</section>
      </div>

      <footer className="dashboard-footer">
        <p>Since 2026</p>
        <p>{footerNote || `${title} workspace`}</p>
      </footer>

      {showLogoutConfirm ? (
        <div
          className="confirm-overlay"
          role="presentation"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="hero-kicker">Confirm action</p>
            <h3 id="logout-dialog-title">Logout</h3>
            <p className="confirm-copy">
              Are you sure you want to logout from this session?
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-primary"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default DashboardLayout;
