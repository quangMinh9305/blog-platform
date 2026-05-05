import React from 'react';
import { Link } from 'react-router-dom';

const BookmarkCard = ({ post, onRemove }) => {
  return (
    <div className="group relative bg-surface-container-lowest p-5 rounded-[14px] border border-neutral-medium-gray hover:border-accent-blue-light shadow-[0px_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_6px_rgba(0,0,0,0.15)] transition-all flex flex-col sm:flex-row gap-lg">
      
      {/* Remove Bookmark Button */}
      <button 
        onClick={() => onRemove(post.id)}
        aria-label="Remove bookmark" 
        className="absolute top-4 right-4 text-outline hover:text-error-red transition-colors bg-white/80 rounded-full p-1 z-10"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>

      {/* Thumbnail */}
      <Link to={`/post/${post.slug}`} className="shrink-0 w-full sm:w-[200px] h-[128px] rounded-[10px] overflow-hidden bg-surface-container-highest cursor-pointer">
        <img 
          src={post.thumbnail} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-2 mb-2">
          <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
          <span className="font-body-standard text-label-caption text-neutral-dark-gray">{post.author.name}</span>
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span className="font-body-regular text-label-caption text-outline">{post.publishDate}</span>
        </div>
        
        <Link to={`/post/${post.slug}`}>
          <h2 className="font-h2-heading text-h2-heading text-neutral-charcoal mb-2 group-hover:text-primary-container transition-colors pr-8">
            {post.title}
          </h2>
        </Link>
        
        <div className="mt-auto flex items-center gap-4">
          <div className="flex items-center gap-1 font-body-regular text-label-caption text-outline">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-1 font-body-regular text-label-caption text-outline">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            <span>Saved {post.savedAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCard;