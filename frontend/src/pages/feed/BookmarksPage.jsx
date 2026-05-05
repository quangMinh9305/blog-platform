import React, { useState } from 'react';
import BookmarkCard from '../../components/shared/BookmarkCard';

const INITIAL_BOOKMARKS = [
  {
    id: 1,
    slug: 'architecting-resilient-microservices',
    title: 'Architecting Resilient Microservices in Go',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaNNJRPzOJSQZ6c2An3K-GnAX1uk6lJab6znQLMwmYCC4Q2LzRi7DjkLABXCSsNUlb-Rc5O2G5RZYm-mspvEGu7RxRNKeW9DHilnjntrpYzbT7LfQIp3QZFuf375hk7VdO8PcoLR1S4v07_GNcCeMy6ddnFlqY9hKguVuKU2LCCwmhm0mZjozkZgG9dW9a7vbIQoEvUFADJ8jXjlrmvthsTyr4OoFEXOiTDJzg4zzTsBU8jscU-QzHUjtyE7g-65sPk3utX1fEr_4',
    author: { name: 'Sarah Chen', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALd5Eu_T20PvWOOW2r6hgc2UEzQrs5ouSxR7eNjBjWwCgGv81TjKrsGSWsQD79eMLmjnS82xA4WYYnt7N8dYgzBB_3hfG4lglUJYrNUuRUhKzHc8J8oVrAagaAwiQIdIy5g8TVkJdIrLmdRmB-TOTyiR0iL9Oxa4mVhA5vdaookC8SCUyPq1_gZSfRqWyg40M6bGv-kIZHRFqJfhZVMybQ7_SNpNUKVU5lLB77-1Mxi_sZmeqy-aGTiuw8COccsCKcP_nNFhi00rY' },
    publishDate: 'Aug 12',
    readingTime: 8,
    savedAgo: '2 days ago'
  },
  {
    id: 2,
    slug: 'understanding-ebpf',
    title: 'Understanding eBPF: The Future of Observability',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeZ_olpSqoizq3VT3ImTpo9UMbXRGZ97tpfDnIv6EDl4N0v5OaiaHKj2cknORmR8GnZNpDPA3prrsWOkxfDv1_5UfIdOH64z_EoMDvn2I9ASh2Lmxp1LwnKTBXDAmTz6UjGxgeRRlv57suWVxq1A6SBh8Y2pxqc294q3SARk_An2knOPGbISL5qcg-R_nMksyILDI2LVQm9z6hNCAbEPv_IurNgDdHaUZ8v0p2jZqDYaxqDllR4megHpyQd8Qb2YfwALcp70vz4u4',
    author: { name: 'Marcus Johnson', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1pT1Vau72Yj73k6WTuA5RSz0XVQPYrIqVp74j6ccjLqgUchZptRFTp_rP0m8PmWjt01zOEwsFnWBBLqWv6fAeKQW-9XDbN0KiPBedF_SMImDZV8ra0OyNTot_U0FK7SEynPGqo56o8-r8Koy540XhhlrEtMtOLy_2OFZ3G0alTMxDXz30BbmARtlQft7f5Z_GFl_-rJtq__5EWK9v2itKfNBH1hYYWTwVj6OVDlBtms8w1Zf0W_wUz5b6qO-V4TKSZifLST2uBW0' },
    publishDate: 'Aug 10',
    readingTime: 12,
    savedAgo: '1 week ago'
  }
];

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState(INITIAL_BOOKMARKS);

  const handleRemoveBookmark = (id) => {
    // Optimistic UI update: Remove the item from state
    setBookmarks(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div className="w-full max-w-[1088px] mx-auto pt-6 px-4 md:px-lg pb-xxl">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-4">
        <div>
          <h1 className="font-h1-display text-h1-display text-neutral-charcoal mb-1">Your Reading List</h1>
          <p className="font-body-regular text-body-regular text-neutral-dark-gray">
            {bookmarks.length} saved articles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body-regular text-label-caption text-outline">Sort by:</span>
          <button className="flex items-center gap-1 font-body-standard text-body-standard text-on-surface hover:text-primary-container transition-colors">
            Recently saved
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="flex flex-col gap-md">
        {bookmarks.length > 0 ? (
          bookmarks.map(post => (
            <BookmarkCard key={post.id} post={post} onRemove={handleRemoveBookmark} />
          ))
        ) : (
          <div className="text-center py-xxl text-on-surface-variant font-body-regular">
            You have no saved articles yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;