import React from 'react';
import { Link } from 'react-router-dom';

const SearchResultCard = ({ result }) => {
  return (
    <article className="bg-surface-container-lowest border border-neutral-medium-gray rounded-[14px] p-5 shadow-sm hover:border-accent-blue-light hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row gap-5">
      <div className="flex-1 flex flex-col">
        
        <div className="flex items-center gap-2 mb-3">
          <img src={result.author.avatar} alt={result.author.name} className="w-6 h-6 rounded-full object-cover" />
          <span className="font-body-standard text-sm text-on-surface">{result.author.name}</span>
          <span className="text-on-surface-variant text-xs">•</span>
          <span className="font-label-caption text-on-surface-variant">{result.publishDate}</span>
        </div>

        {/* Note: In a real app, you would use a library like 'react-highlight-words' to dynamically wrap keywords with <span className="bg-yellow-200 px-1 rounded"> */}
        <Link to={`/post/${result.slug}`}>
          {/* dangerouslySetInnerHTML is used here ONLY to simulate the highlighted HTML tags from your static design. Use safer methods in production. */}
          <h2 
            className="font-h2-heading text-lg mb-2 text-on-surface group-hover:text-primary-blue-dark transition-colors"
            dangerouslySetInnerHTML={{ __html: result.titleHighlighted }}
          />
          <p 
            className="font-body-regular text-on-surface-variant line-clamp-2 mb-4 flex-1"
            dangerouslySetInnerHTML={{ __html: result.excerptHighlighted }}
          />
        </Link>

        <div className="flex items-center gap-4 mt-auto">
          <span className="inline-flex items-center gap-1 font-label-caption text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">favorite</span> {result.likes}
          </span>
          <span className="inline-flex items-center gap-1 font-label-caption text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">chat_bubble</span> {result.comments}
          </span>
          <span className="font-label-caption bg-neutral-light-gray px-2 py-1 rounded text-on-surface ml-auto">
            {result.category}
          </span>
        </div>
      </div>
    </article>
  );
};

export default SearchResultCard;