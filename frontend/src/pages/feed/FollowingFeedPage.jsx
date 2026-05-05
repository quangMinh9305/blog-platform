import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '../../components/shared/Tabs'; // Import your Tabs component

const FollowingFeedPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('following');
  
  // In a real app, this would be fetched from an API
  const [followingPosts, setFollowingPosts] = useState([]);

  const tabsConfig = [
    { id: 'for-you', label: 'For You' },
    { id: 'following', label: 'Following' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'for-you') {
      navigate('/'); // Redirect back to home if "For You" is clicked
    }
  };

  return (
    <div className="w-full max-w-layout-max mx-auto px-md md:px-lg py-lg flex flex-col min-h-[80vh]">
      
      {/* Reusable Tabs Component */}
      <div className="mb-lg">
        <Tabs 
          tabs={tabsConfig} 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
      </div>

      {/* Dynamic Content Area */}
      {followingPosts.length > 0 ? (
        <div className="space-y-4">
          {/* Map through your PostCard components here when data is available */}
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center py-xxl px-4 bg-surface-container-lowest rounded-[14px] border border-neutral-medium-gray shadow-sm">
          
          <div className="w-48 h-48 mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-accent-blue-light/10 rounded-full blur-xl"></div>
            <svg className="relative z-10" fill="none" height="160" viewBox="0 0 160 160" width="160" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="80" fill="#F5F9FF" r="70" stroke="#E2E2E2" strokeWidth="2"></circle>
              <path d="M55 75C61.6274 75 67 69.6274 67 63C67 56.3726 61.6274 51 55 51C48.3726 51 43 56.3726 43 63C43 69.6274 48.3726 75 55 75Z" fill="#DCE0E6"></path>
              <path d="M35 105C35 93.9543 43.9543 85 55 85H65C69.056 85 72.83 86.2081 75.9431 88.2573C70.6136 91.5647 67 97.3503 67 104V105H35Z" fill="#DCE0E6"></path>
              <path d="M105 75C111.627 75 117 69.6274 117 63C117 56.3726 111.627 51 105 51C98.3726 51 93 56.3726 93 63C93 69.6274 98.3726 75 105 75Z" fill="#DCE0E6"></path>
              <path d="M84.0569 88.2573C87.17 86.2081 90.944 85 95 85H105C116.046 85 125 93.9543 125 105V106H93V104C93 97.3503 89.3864 91.5647 84.0569 88.2573Z" fill="#DCE0E6"></path>
              <path d="M80 85C88.2843 85 95 78.2843 95 70C95 61.7157 88.2843 55 80 55C71.7157 55 65 61.7157 65 70C65 78.2843 71.7157 85 80 85Z" fill="#8FB6FF"></path>
              <path d="M55 120C55 106.193 66.1929 95 80 95C93.8071 95 105 106.193 105 120V121H55V120Z" fill="#8FB6FF"></path>
              <circle cx="115" cy="45" fill="#1D52DE" r="18" stroke="#FFFFFF" strokeWidth="3"></circle>
              <path d="M115 37V53M107 45H123" stroke="#FFFFFF" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-[20px] font-bold font-h2-heading text-neutral-charcoal mb-3">Your following feed is empty</h2>
            <p className="text-[14px] text-neutral-dark-gray font-body-regular mb-8 leading-relaxed">
              Follow authors you like to see their posts here.
            </p>
            <button className="bg-primary-container text-on-primary h-[36px] px-6 rounded-lg font-body-standard text-body-standard hover:bg-primary-blue-dark transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 mx-auto">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Discover authors
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default FollowingFeedPage;