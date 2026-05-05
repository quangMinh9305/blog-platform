import React from 'react';
import StatusBadge from './StatusBadge';

const PostRow = ({ post, onEdit, onView, onMore }) => {
  return (
    <tr className="border-b border-surface-variant hover:bg-neutral-off-white transition-colors group">
      <td className="p-4">
        <input
          type="checkbox"
          className="w-4 h-4 rounded-[3px] border-outline text-primary-container focus:ring-primary-container focus:ring-offset-0"
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded bg-surface-container-high flex-shrink-0 bg-cover bg-center"
            style={{ backgroundImage: post.coverImage ? `url(${post.coverImage})` : 'none' }}
          >
            {!post.coverImage && (
              <div className="w-full h-full flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[20px]">image</span>
              </div>
            )}
          </div>
          <span className="font-h2-heading text-h2-heading">{post.title}</span>
        </div>
      </td>
      <td className="p-4">
        <StatusBadge status={post.status} />
      </td>
      <td className="p-4 hidden sm:table-cell">{post.views.toLocaleString()}</td>
      <td className="p-4 hidden md:table-cell">
        <div className="flex items-center gap-3 text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">thumb_up</span> {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">chat_bubble</span> {post.comments}
          </span>
        </div>
      </td>
      <td className="p-4 hidden lg:table-cell text-on-surface-variant">
        {new Date(post.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(post)}
            className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded transition-colors"
            title="Edit"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button
            onClick={() => onView(post)}
            className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded transition-colors"
            title="View"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </button>
          <button
            onClick={() => onMore(post)}
            className="p-1.5 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded transition-colors"
            title="More options"
          >
            <span className="material-symbols-outlined text-[18px]">more_vert</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PostRow;