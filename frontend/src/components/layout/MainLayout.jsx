import React, { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="bg-neutral-off-white min-h-screen text-on-surface flex font-body-regular text-body-regular">
      
      {/* 
        * LEFT SIDEBAR (Desktop Only)
        * Fixed positioned on the left side, visible on large screens
        */}
      <aside className="fixed left-0 top-0 h-full w-[248px] overflow-y-auto bg-surface-container-lowest border-r border-surface-container-high hidden lg:flex flex-col py-6 px-4 space-y-2 z-40">
        
        {/* Brand Logo */}
        <div className="px-4 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">code</span>
          </div>
          <div>
            <h1 className="font-h1-display text-h1-display text-on-surface">DevBlog</h1>
            <p className="font-label-caption text-label-caption text-on-surface-variant">Creator Community</p>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 space-y-1">
          <Link to="/" className="px-4 py-2 my-1 flex items-center gap-3 bg-neutral-off-white text-primary-container border-l-4 border-primary-container font-semibold rounded-r-lg">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
            <span className="font-nav-display text-nav-display">Home</span>
          </Link>
          <Link to="/explore" className="px-4 py-2 my-1 flex items-center gap-3 text-on-surface-variant hover:bg-neutral-light-gray rounded-lg transition-all">
            <span className="material-symbols-outlined">explore</span>
            <span className="font-nav-display text-nav-display">Explore</span>
          </Link>
          <Link to="/bookmarks" className="px-4 py-2 my-1 flex items-center gap-3 text-on-surface-variant hover:bg-neutral-light-gray rounded-lg transition-all">
            <span className="material-symbols-outlined">bookmark</span>
            <span className="font-nav-display text-nav-display">Bookmarks</span>
          </Link>
        </nav>

        {/* Action Button */}
        <div className="px-4 mt-6 mb-4">
          <button className="w-full bg-primary-container text-on-primary h-[36px] rounded-lg font-body-standard text-body-standard flex items-center justify-center gap-2 hover:bg-primary-blue-dark transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Post
          </button>
        </div>

        {/* Footer User Info */}
        <div className="mt-auto border-t border-surface-container-high pt-4">
          <div className="px-4 flex items-center gap-3 py-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHp3VozXHVdhk32vSjhpvYxfDujzS72GYe1G1O-VHsm2GBnwhDcFOVOSvrkYtSjwvzKm6iLK7eZgL08hQgzDPN-CyVxCl5W19yJ-60vZzC32gMHrs3h-I-wUCNcGtEFLcbSGay4iRmDIJL1uj-oQ22wUFJLweVtiCXdLBVQkfZKhqlPHLax9CIO_tVuXZhsGooHPJursMzz5kXPuBYpqwhLQBJyzn5f-EriyI-3BponId6PdC_bOAkCSInySHu8ySvaS2qRk3SPkI" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full border border-surface-container object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body-standard text-body-standard text-on-surface truncate">user01</p>
            </div>
            <div className="relative cursor-pointer">
              <span className="material-symbols-outlined text-outline hover:text-on-surface transition-colors">notifications</span>
              <span className="absolute -top-1 -right-1 bg-danger-red text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
            </div>
          </div>
        </div>
      </aside>

      {/* 
        * MAIN WRAPPER 
        * Pushes content to the right to accommodate the fixed sidebar 
        */}
      <div className="flex-1 lg:ml-[248px] flex flex-col min-h-screen">
        
        {/* TOP NAVBAR (Sticky) */}
        <header className="sticky top-0 w-full z-30 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high shadow-sm flex items-center justify-between px-6 h-[64px]">
          
          {/* Mobile Brand */}
          <div className="flex items-center gap-6 lg:hidden">
            <span className="material-symbols-outlined text-[24px] text-primary-container">code</span>
            <span className="font-h1-display text-[20px] font-black tracking-tight text-primary-container">DevBlog</span>
          </div>

          {/* Global Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-auto relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Search posts, tags..." 
              className="w-full h-[36px] pl-10 pr-4 bg-surface rounded-lg border border-surface-container text-body-standard font-body-standard focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
            />
          </div>

          {/* Top Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex text-on-surface-variant hover:text-primary-container hover:bg-neutral-light-gray w-9 h-9 items-center justify-center rounded-full transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <div className="relative flex items-center gap-4">
              <button className="text-on-surface-variant hover:text-primary-container hover:bg-neutral-light-gray p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>

              {/* Avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="flex items-center gap-2 hover:bg-neutral-light-gray p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-surface-container"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZRHfQoRBvirTtQtyJ40J5rcpERGznBGZ9m1gppaG5hI1wzuQrFKDW669gcGN9YWZuMUuOC9fx9BtJ84X1-_D5U3Tv9-t_Tl6gtc6dwhRW3joSNuPVMT2tg1pVOWDUAsXflZ1-9Oai7TUaxJi5Z5mIMahhMzObqhEXoyY2XFR5S5eYWTyEG30lSyEgWVdHKpUbe9m2Utn1FdZWfr_ESBzltZov4JTeBn4IkTrQmM94iKD1szmlfU81T82G9FP-Dm8p4UQooh1QSHE"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="material-symbols-outlined text-[20px] text-outline">expand_more</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-surface-container-high">
                      <p className="font-body-standard text-body-standard text-on-surface truncate">{user?.name ?? 'User'}</p>
                      <p className="font-label-caption text-label-caption text-on-surface-variant truncate">{user?.email ?? ''}</p>
                    </div>
                    <Link
                      to="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-neutral-light-gray transition-colors font-body-standard text-body-standard"
                    >
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-danger-red hover:bg-neutral-light-gray transition-colors font-body-standard text-body-standard"
                    >
                      <span className="material-symbols-outlined text-[20px]">logout</span>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* 
          * PAGE CONTENT 
          * Dynamic content injected here via React Router 
          */}
        <Outlet />
        
      </div>
    </div>
  );
};

export default MainLayout;