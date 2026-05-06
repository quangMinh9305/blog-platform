import React, { useState } from 'react';
import Tabs from '../../components/shared/Tabs';
import PostRow from '../../components/shared/PostRow';
import Pagination from '../../components/shared/Pagination';

// Dummy data for the management table
const MOCK_MY_POSTS = [
  {
    id: 1,
    title: 'How to build a scalable Node.js architecture',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTb9cKNgAiRdb_B8ambufMbdsx3gXR32O_1fXD0-TjwJ5IJiv_Y_IUROI3qoGKP3EIsJY7NrmsSqJfexZGTBRjmYqVKN7MaS-yCTt1R9Soi0tH1dGU6wGSopOzOxVxd0zbAlsxYgNbKbbD_1GI5YEYAVBSW47FLnrnSfCPQHb_s2m-xNptgdHKCfNX2ZnWzQcFjFB05F71yHgJY6ntaoI3G5LHYzGRhOvOk9IEvU6HXd9lz9t1kDRP3rRIKWOeWu0oNmrO3O61juA',
    status: 'published',
    views: 12500,
    likes: 342,
    comments: 56,
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'Understanding React Server Components',
    coverImage: null, // Testing the empty image state from your PostRow component
    status: 'draft',
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: '2026-05-04T15:30:00Z',
  },
  {
    id: 3,
    title: 'PostgreSQL vs MongoDB: A 2026 Perspective',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaNNJRPzOJSQZ6c2An3K-GnAX1uk6lJab6znQLMwmYCC4Q2LzRi7DjkLABXCSsNUlb-Rc5O2G5RZYm-mspvEGu7RxRNKeW9DHilnjntrpYzbT7LfQIp3QZFuf375hk7VdO8PcoLR1S4v07_GNcCeMy6ddnFlqY9hKguVuKU2LCCwmhm0mZjozkZgG9dW9a7vbIQoEvUFADJ8jXjlrmvthsTyr4OoFEXOiTDJzg4zzTsBU8jscU-QzHUjtyE7g-65sPk3utX1fEr_4',
    status: 'archived',
    views: 45210,
    likes: 1205,
    comments: 89,
    createdAt: '2025-11-20T08:15:00Z',
  }
];

const MyPosts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Tab configuration with counts
  const tabsConfig = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'published', label: 'Published', count: 18 },
    { id: 'draft', label: 'Drafts', count: 4 },
    { id: 'archived', label: 'Archived', count: 2 }
  ];

  // Action handlers for the PostRow component
  const handleEdit = (post) => console.log('Edit post:', post.id);
  const handleView = (post) => console.log('View post:', post.id);
  const handleMore = (post) => console.log('More options:', post.id);

  // Filter logic based on active tab
  const filteredPosts = activeTab === 'all' 
    ? MOCK_MY_POSTS 
    : MOCK_MY_POSTS.filter(post => post.status === activeTab);

  return (
    <div className="w-full flex flex-col gap-lg">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-h1-display text-h1-display text-on-surface mb-1">My Posts</h1>
          <p className="font-body-regular text-body-regular text-on-surface-variant">
            Manage your articles, drafts, and performance.
          </p>
        </div>
        
        {/* Search within My Posts */}
        <div className="relative w-full sm:w-[300px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search your posts..." 
            className="w-full h-[36px] pl-10 pr-4 rounded-lg border border-neutral-medium-gray bg-surface-container-lowest focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 outline-none font-body-standard text-body-standard transition-all"
          />
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs 
        tabs={tabsConfig} 
        activeTab={activeTab} 
        onTabChange={(id) => {
          setActiveTab(id);
          setCurrentPage(1); // Reset pagination when switching tabs
        }} 
      />

      {/* Data Table Section */}
      <div className="bg-surface-container-lowest border border-neutral-medium-gray rounded-[14px] overflow-hidden shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-off-white border-b border-neutral-medium-gray text-on-surface-variant font-body-standard text-label-caption uppercase tracking-wider">
                <th className="p-4 w-12">
                  <input type="checkbox" className="w-4 h-4 rounded-[3px] border-outline text-primary-container focus:ring-primary-container" />
                </th>
                <th className="p-4">Post</th>
                <th className="p-4 w-32">Status</th>
                <th className="p-4 w-32 hidden sm:table-cell">Views</th>
                <th className="p-4 w-40 hidden md:table-cell">Engagement</th>
                <th className="p-4 w-32 hidden lg:table-cell">Date</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostRow 
                    key={post.id} 
                    post={post} 
                    onEdit={handleEdit}
                    onView={handleView}
                    onMore={handleMore}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-on-surface-variant font-body-regular">
                    No posts found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Section */}
        {filteredPosts.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={3} 
            totalItems={tabsConfig.find(t => t.id === activeTab)?.count || 0} 
            itemsPerPage={10} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>

    </div>
  );
};

export default MyPosts;