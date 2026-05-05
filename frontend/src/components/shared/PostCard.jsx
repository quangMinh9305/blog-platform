import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Destructure the post data for easier usage
  const { 
    author, 
    timeAgo, 
    title, 
    excerpt, 
    tags, 
    readingTime, 
    likes, 
    thumbnail,
    slug 
  } = post;

  return (
    <article className="bg-surface-container-lowest p-[20px] rounded-xl border border-surface-container hover:border-accent-blue-light shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
      
      {/* Left Content Area */}
      <div className="flex-1">
        
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-6 h-6 rounded-full object-cover" 
          />
          <span className="font-body-standard text-body-standard text-on-surface">
            {author.name}
          </span>
          <span className="text-on-surface-variant text-[12px]">• {timeAgo}</span>
        </div>
        
        {/* Post Title & Excerpt */}
        <Link to={`/post/${slug}`}>
          <h2 className="font-h2-heading text-h2-heading text-on-surface mb-2 hover:text-primary-container cursor-pointer transition-colors">
            {title}
          </h2>
        </Link>
        <p className="font-body-regular text-body-regular text-on-surface-variant line-clamp-2 mb-4">
          {excerpt}
        </p>
        
        {/* Footer: Tags & Metrics */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-neutral-light-gray rounded text-[12px] text-on-surface-variant">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant text-[12px]">
            <span>{readingTime} min read</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">thumb_up</span>
              <span>{likes}</span>
            </div>
            <button className="hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Thumbnail (Only renders if a thumbnail is provided) */}
      {thumbnail && (
        <Link to={`/post/${slug}`} className="hidden md:block w-[200px] h-[128px] shrink-0 rounded-lg overflow-hidden bg-surface-variant relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-fixed-dim to-primary-container opacity-20 group-hover:opacity-10 transition-opacity"></div>
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>
      )}
      
    </article>
  );
};

export default PostCard;