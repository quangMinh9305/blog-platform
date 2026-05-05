import React, { useState } from 'react';
import SearchResultCard from '../../components/shared/SearchResultCard';
import Pagination from '../../components/shared/Pagination'; // Import your Pagination component

// Mock search results
const MOCK_RESULTS = [
  {
    id: 1,
    slug: 'mastering-binary-tree-inversion',
    author: { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDePX-bqHXtdnyOIHD3EfIWYQzPmvH54C_X6i_nyww-h7hD_oj18CNJMOxp5lLrwKjd5sfPC58IlM9wzAknI8f6mrNdrMwc5i-LA879CKR0gijGQXzzvgPNO1A7KTG-hV7ekz-D4CnYF8w8cyire0yHl_ScAgXkWT7lotBLHoYA0y9Qk11dc6Rwj7NiiZx64zkzkhpkvb5AvwyzdndVwfWkJssCRlNt9-XYTF-tl7qkeY0QNIxJAi9OI6fe1SBptlgmUOsVSlWaIw' },
    publishDate: 'Oct 12',
    titleHighlighted: 'Mastering the <span class="bg-[#fef08a] px-[2px] rounded-sm text-neutral-charcoal">Binary Tree</span> Inversion Interview Question',
    excerptHighlighted: 'An in-depth look at one of the most infamous software engineering interview questions. We\'ll walk through exactly how to invert a <span class="bg-[#fef08a] px-[2px] rounded-sm text-neutral-charcoal">binary tree</span> using both recursive and iterative approaches...',
    likes: 128,
    comments: 24,
    category: 'DSA'
  },
  {
    id: 2,
    slug: 'visualizing-traversal-algorithms',
    author: { name: 'David Kumar', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmpv_uIqNBVUaa-vJX-eLE5Hky6OcmeT0cmPqxFwjvK9Ru_nEnQQD-jTxrRcDFPXiQ35fB3eprkl0vHINx2rlRJtdpCmfDfl6HKzC8bzEkIGjbLPjwgHD17ypln-NhRnQIoAj2Y4Tphw2kroFtvBwuI9TJpHenbFcpYgy3_yP9ROiZFxK5hSBupfMAjgrFOZQtLK4vLfy_T_L7jCKKGbuhLmF6QevyANNjma6hScIC45coBmQIHbxtrwOrsRCUYyDP08BByQjggCk' },
    publishDate: 'Sep 28',
    titleHighlighted: 'Visualizing <span class="bg-[#fef08a] px-[2px] rounded-sm text-neutral-charcoal">Binary Tree</span> Traversal Algorithms',
    excerptHighlighted: 'Understanding pre-order, in-order, and post-order traversals can be tricky. This interactive guide uses D3.js to animate how algorithms navigate through a <span class="bg-[#fef08a] px-[2px] rounded-sm text-neutral-charcoal">binary tree</span> structure...',
    likes: 85,
    comments: 12,
    category: 'Algorithms'
  }
];

const SearchResultsPage = () => {
  const [query, setQuery] = useState('binary tree');
  const [currentPage, setCurrentPage] = useState(1);

  const handleClearSearch = () => {
    setQuery('');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  };

  return (
    <div className="max-w-[1088px] mx-auto px-4 md:px-6 py-lg w-full">
      
      {/* Search Header Area */}
      <div className="mb-lg">
        <div className="relative w-full max-w-3xl mb-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-[48px] pl-12 pr-12 rounded-lg border border-neutral-medium-gray bg-surface-container-lowest focus:border-primary-container focus:ring-1 focus:ring-primary-container/30 outline-none shadow-sm font-body-regular text-lg text-on-surface transition-all" 
            placeholder="Search articles, tags, authors..." 
          />
          {query && (
            <button onClick={handleClearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface flex items-center">
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="font-body-standard text-on-surface-variant">
            Showing {MOCK_RESULTS.length} results for "<span className="font-bold text-on-surface">{query}</span>"
          </p>
          
          {/* Filters & Sort */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <button className="px-3 py-1.5 rounded-full bg-neutral-off-white border border-accent-blue-light text-primary-blue-dark font-body-standard text-sm whitespace-nowrap">All</button>
            <button className="px-3 py-1.5 rounded-full bg-surface-container-lowest border border-neutral-medium-gray text-on-surface-variant hover:bg-neutral-light-gray font-body-standard text-sm whitespace-nowrap transition-colors">DSA</button>
            <button className="px-3 py-1.5 rounded-full bg-surface-container-lowest border border-neutral-medium-gray text-on-surface-variant hover:bg-neutral-light-gray font-body-standard text-sm whitespace-nowrap transition-colors">Algorithm</button>
            <div className="w-[1px] h-6 bg-neutral-medium-gray mx-1"></div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-lowest border border-neutral-medium-gray text-on-surface-variant hover:bg-neutral-light-gray font-body-standard text-sm whitespace-nowrap transition-colors">
              Sort: Relevance
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row gap-xxl">
        
        {/* Main Content Area (Results + Pagination) */}
        <main className="flex-1 flex flex-col gap-6">
          {MOCK_RESULTS.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
          
          {/* Reusable Pagination Component */}
          <div className="mt-4">
            <Pagination 
              currentPage={currentPage}
              totalPages={5} 
              totalItems={42} 
              itemsPerPage={10}
              onPageChange={handlePageChange}
            />
          </div>
        </main>

        {/* Sidebar (Desktop Only) - Related Content */}
        <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
          <div className="bg-surface-bright border border-neutral-medium-gray rounded-[14px] p-5">
            <h3 className="font-h2-heading text-on-surface mb-3">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['Data Structures', 'Algorithms', 'LeetCode', 'Graphs'].map((topic, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-neutral-light-gray rounded-full text-sm font-body-standard text-on-surface-variant cursor-pointer hover:bg-neutral-medium-gray transition-colors">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default SearchResultsPage;