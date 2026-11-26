import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Briefcase,
  Compass,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquare,
  Route as RouteIcon,
  Ship,
  Sparkles,
  Star,
  Tag,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { adminUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-title">VIBES OF EGYPT</div>
          <div className="sidebar-brand-badge">Admin Portal</div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-group-label">Overview</div>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </NavLink>

          <div className="sidebar-group-label">Catalog</div>
          <NavLink
            to="/destinations"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <MapPin size={17} />
            <span>Destinations</span>
          </NavLink>
          <NavLink
            to="/tours"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Compass size={17} />
            <span>Tours</span>
          </NavLink>
          <NavLink
            to="/packages"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Briefcase size={17} />
            <span>Packages</span>
          </NavLink>
          <NavLink
            to="/cruises"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Ship size={17} />
            <span>Cruises</span>
          </NavLink>
          <NavLink
            to="/experiences"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Sparkles size={17} />
            <span>Experiences</span>
          </NavLink>
          <NavLink
            to="/special-offers"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Tag size={17} />
            <span>Special Offers</span>
          </NavLink>
          <NavLink
            to="/journal"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <BookOpen size={17} />
            <span>Journal</span>
          </NavLink>

          <div className="sidebar-group-label">Operations</div>
          <NavLink
            to="/inquiries"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <MessageSquare size={17} />
            <span>Inquiries</span>
          </NavLink>
          <NavLink
            to="/trip-plans"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <RouteIcon size={17} />
            <span>Trip Plans</span>
          </NavLink>
          <NavLink
            to="/reviews"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Star size={17} />
            <span>Reviews</span>
          </NavLink>
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-title">Vibes of Egypt Content Management</div>
          <div className="admin-header-user">
            <span>{adminUser?.email}</span>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleSignOut}>
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
