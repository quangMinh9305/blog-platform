import React, { useState } from 'react';
import PostCard from '../../components/shared/PostCard';

// Dummy data extracted from your HTML design
const DUMMY_POSTS = [
  {
    id: 1,
    slug: 'understanding-binary-search-trees',
    author: {
      name: 'Nguyen Van A',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB99EZeR1nN_zgFvZPtQGNF3oA6TxlYu8MV2zt_LErmYaYoQjgLxCbtet0UIfC_pBJDwwHeqSF9i5RIUR_Opu_AG5HuBKJAJI5PjPY0KVwoY6AUTy_SPT6VBZBMssAOSoMyaZyfA4tDG5TDH00Ar0GVOm_a9AHY-xMUFMseNZpB21sHc_8hR-ckYaJzZNUP9hpHHDz-DiEzoCdFrmt4k45hRviwOX9A3DIfWXM9Lf8wM6AUoYr_xM9W_vpwESqXpTJ4LNVBvFYVP04'
    },
    timeAgo: '2 hours ago',
    title: 'Understanding Binary Search Trees',
    excerpt: 'A comprehensive guide to understanding binary search trees, their operations, and why they are fundamental to computer science algorithms.',
    tags: ['DSA', 'Algorithm'],
    readingTime: 5,
    likes: 42,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTb9cKNgAiRdb_B8ambufMbdsx3gXR32O_1fXD0-TjwJ5IJiv_Y_IUROI3qoGKP3EIsJY7NrmsSqJfexZGTBRjmYqVKN7MaS-yCTt1R9Soi0tH1dGU6wGSopOzOxVxd0zbAlsxYgNbKbbD_1GI5YEYAVBSW47FLnrnSfCPQHb_s2m-xNptgdHKCfNX2ZnWzQcFjFB05F71yHgJY6ntaoI3G5LHYzGRhOvOk9IEvU6HXd9lz9t1kDRP3rRIKWOeWu0oNmrO3O61juA'
  },
  {
    id: 2,
    slug: 'modern-css-layouts',
    author: {
      name: 'Tran Thi B',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1JDsQ6vb0S8SnhJpjU00GGkstNJEvctYN9vISbAsu9kje7uUr5NTGfJ2zZWHLUNWCsBkJEfIDOWhSINIVB_VSc-KWOSyF4xXE0id9l2UIGmCloaIfCEN7HqP9dxP4zLvwgOEm5i_ahl06wJ3-nA8A8Jl4ocR4TpngRcCVgNYr0LKa37Bb21ERBIeET9aKo-tYZheY4teSW7eSrp7X73lFIoNO95cCDf2GiX2EOh4iYL0GQzVouiVqXdkx-WwfUGgwkQWncuMj2Vc'
    },
    timeAgo: '5 hours ago',
    title: 'Modern CSS Layouts',
    excerpt: 'Exploring CSS Grid and Flexbox techniques for building responsive and robust web interfaces without complex media queries.',
    tags: ['Web', 'CSS'],
    readingTime: 8,
    likes: 128,
    thumbnail: null // Represents a post without a cover image
  },
  {
    id: 3,
    slug: 'scaling-cloud-infrastructure',
    author: {
      name: 'Le Van C',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE7IiRRy12ZdE1JvoWlm5woEtJJGeXl1D06_Pgx1PyR3SXpbNtePiBYdaEZ5K8PX3Et2omFnskQZIcSFgCkAqW63Yl2woDaHM6xF7QlLzZONBvVPcwbEw7qrfiF3QEMOzhtLygUw4-GACj6vIfT_HJSFnOoP3vk1-nHUNlBz0ZwM4Fk-HBo2bnCkJVMceyfrtjlSj2NPnPPREMc1mbGMQoWyRjRtdBbiffv-d4ELAM-mqQkdg_1Udj7Zcyw01-l1eN13VxzjUyVsM'
    },
    timeAgo: '1 day ago',
    title: 'Scaling Cloud Infrastructure',
    excerpt: 'Lessons learned from scaling our microservices architecture to handle 10x traffic spikes during the holiday season.',
    tags: ['Cloud', 'Devops'],
    readingTime: 12,
    likes: 89,
    thumbnail: null
  }
];

const HomePage = () => {
  // State to manage active feed tab
  const [activeTab, setActiveTab] = useState('for-you');

  // In a real app, this would filter based on API data. 
  // For now, we use the dummy data.
  const displayedPosts = DUMMY_POSTS;

  return (
    <main className="flex-1 w-full max-w-[1088px] mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Left Column: Feed Area */}
      <div className="flex-1 w-full max-w-[700px]">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-surface-container-high mb-6">
          <button 
            onClick={() => setActiveTab('for-you')}
            className={`px-6 py-3 font-nav-display text-nav-display ${
              activeTab === 'for-you' 
                ? 'text-primary-container border-b-2 border-primary-container' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            For You
          </button>
          <button 
            onClick={() => setActiveTab('following')}
            className={`px-6 py-3 font-nav-display text-nav-display ${
              activeTab === 'following' 
                ? 'text-primary-container border-b-2 border-primary-container' 
                : 'text-on-surface-variant hover:text-on-surface transition-colors'
            }`}
          >
            Following
          </button>
        </div>

        {/* Filters & Tags */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-primary-container text-on-primary font-body-standard text-body-standard shadow-sm">All</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface-variant hover:bg-neutral-off-white font-body-standard text-body-standard transition-colors">DSA</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface-variant hover:bg-neutral-off-white font-body-standard text-body-standard transition-colors">Web</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface-variant hover:bg-neutral-off-white font-body-standard text-body-standard transition-colors">Cloud</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface-variant hover:bg-neutral-off-white font-body-standard text-body-standard transition-colors">OS</button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface-variant hover:bg-neutral-off-white font-body-standard text-body-standard transition-colors">Database</button>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-1 text-on-surface-variant font-body-standard text-body-standard hover:text-on-surface">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Newest
            </button>
          </div>
        </div>

        {/* Post Cards List */}
        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {/* Faded partial card indicating more content/loading state */}
          <article className="bg-surface-container-lowest p-[20px] rounded-xl border border-surface-container hover:border-accent-blue-light shadow-sm transition-all flex flex-col md:flex-row gap-6 opacity-70">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-surface-variant"></div>
                <span className="font-body-standard text-body-standard text-on-surface">Database Expert</span>
              </div>
              <h2 className="font-h2-heading text-h2-heading text-on-surface mb-2">Deep Dive into Database Indexing</h2>
              <p className="font-body-regular text-body-regular text-on-surface-variant line-clamp-1 mb-4">Understanding B-trees and Hash indexes for optimal query performance...</p>
            </div>
          </article>
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <aside className="hidden xl:block w-[240px] shrink-0 space-y-6">
        
        {/* Trending Tags Widget */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container p-5 shadow-sm">
          <h3 className="font-h2-heading text-h2-heading text-on-surface mb-4">Trending tags</h3>
          <div className="flex flex-col gap-3">
            <a href="#" className="flex items-center justify-between group">
              <span className="font-body-standard text-body-standard text-on-surface-variant group-hover:text-primary-container transition-colors">#reactjs</span>
              <span className="text-label-caption font-label-caption text-outline">2.4k</span>
            </a>
            <a href="#" className="flex items-center justify-between group">
              <span className="font-body-standard text-body-standard text-on-surface-variant group-hover:text-primary-container transition-colors">#python</span>
              <span className="text-label-caption font-label-caption text-outline">1.8k</span>
            </a>
            <a href="#" className="flex items-center justify-between group">
              <span className="font-body-standard text-body-standard text-on-surface-variant group-hover:text-primary-container transition-colors">#systemdesign</span>
              <span className="text-label-caption font-label-caption text-outline">956</span>
            </a>
            <a href="#" className="flex items-center justify-between group">
              <span className="font-body-standard text-body-standard text-on-surface-variant group-hover:text-primary-container transition-colors">#aws</span>
              <span className="text-label-caption font-label-caption text-outline">842</span>
            </a>
            <a href="#" className="flex items-center justify-between group">
              <span className="font-body-standard text-body-standard text-on-surface-variant group-hover:text-primary-container transition-colors">#machinelearning</span>
              <span className="text-label-caption font-label-caption text-outline">720</span>
            </a>
          </div>
        </div>

        {/* Suggested Authors Widget */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-container p-5 shadow-sm">
          <h3 className="font-h2-heading text-h2-heading text-on-surface mb-4">Suggested authors</h3>
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQMZc3z2R34UhnpMIoifijkv4iUt1jw0Nln3Eppl0Riaile_APJbOHAmrdA7HCnRJ9X3x-J17NeQurgg-E69DsfIKV9cco0LFSu_WtRNW9NXFIlH3RO_YIGiO02IbNajdF9gAOidnPrOxUzzle68EivYCCtDBJZzXR9TfKcx2FiIuubCt9J8mbwY3Xq7fT1ULr3AWjprPYxdQt_w0PL75os5zLzptp8Cojw5djToUtf2fVHIT5PqNiOnWkhDehKi7ZMHgW9Fn3eOA" 
                  alt="Sarah Chen" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div className="flex flex-col">
                  <span className="font-body-standard text-body-standard text-on-surface text-[13px] leading-none">Sarah Chen</span>
                  <span className="text-label-caption font-label-caption text-on-surface-variant">@schen_dev</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-surface-container-lowest border border-surface-container text-primary-container font-body-standard text-[12px] rounded hover:bg-neutral-off-white transition-colors">
                Follow
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPQgy_jVg4oXvA2gNn9or0JdYID-_ihXQu0nNXvyBPJ745Q67gQcxXoBMNRtbnr53ZnT8Y7z4-lb4wJXTcDONkpjqChs06NVBw8RYW1yKtBWOoTrPvkIelNBBA3Tk7vZ6FQnp5Txjvac7IVYJq6NvAWDhCIpvucQsFLH5liKn4f06x58yEYN3ROVn17RglUNpTCGBc-pyBAIpc3dElsxJOyO_VHHfz-ey64h27eldcbYZiXnIIlmwKMGJQ7GHSm851taT49jmoSTs" 
                  alt="Alex Rivera" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <div className="flex flex-col">
                  <span className="font-body-standard text-body-standard text-on-surface text-[13px] leading-none">Alex Rivera</span>
                  <span className="text-label-caption font-label-caption text-on-surface-variant">@arivera</span>
                </div>
              </div>
              <button className="px-3 py-1 bg-surface-container-lowest border border-surface-container text-primary-container font-body-standard text-[12px] rounded hover:bg-neutral-off-white transition-colors">
                Follow
              </button>
            </div>

          </div>
        </div>

      </aside>
    </main>
  );
};

export default HomePage;