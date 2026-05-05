import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const SideNavBar = ({ className = '' }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/explore', label: 'Explore', icon: 'explore' },
    { path: '/bookmarks', label: 'Bookmarks', icon: 'bookmark' },
    { path: '/my-posts', label: 'My Posts', icon: 'edit_document' },
    { path: '/analytics', label: 'Analytics', icon: 'analytics' }
  ];

  const bottomNavItems = [
    { path: '/settings', label: 'Settings', icon: 'settings' },
    { path: '/support', label: 'Support', icon: 'contact_support' }
  ];

  return (
    <aside className={`hidden lg:flex flex-col py-6 px-4 space-y-2 bg-white dark:bg-slate-900 border-r border-neutral-medium-gray fixed left-0 top-0 h-full w-sidebar-width overflow-y-auto z-40 ${className}`}>
      {/* Brand */}
      <div className="mb-lg px-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold">
          D
        </div>
        <div>
          <h1 className="font-h2-heading text-h2-heading text-on-surface">DevBlog</h1>
          <p className="font-label-caption text-label-caption text-on-surface-variant">Creator Community</p>
        </div>
      </div>

      {/* New Post Button */}
      <Button className="w-full mb-lg">
        <span className="material-symbols-outlined mr-2">add</span>
        New Post
      </Button>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 my-1 flex items-center gap-3 rounded-lg font-nav-display text-nav-display transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600'
                  : 'text-on-surface-variant hover:bg-neutral-off-white dark:hover:bg-blue-900/10'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'fill-icon' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto space-y-1 border-t border-neutral-medium-gray pt-4">
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="px-4 py-2 my-1 flex items-center gap-3 text-on-surface-variant hover:bg-neutral-off-white rounded-lg font-nav-display text-nav-display transition-all"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SideNavBar;