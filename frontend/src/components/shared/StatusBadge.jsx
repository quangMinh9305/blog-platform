import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const statusConfig = {
    published: {
      label: 'Published',
      classes: 'bg-surface-tertiary text-success-green border-success-green/20'
    },
    draft: {
      label: 'Draft',
      classes: 'bg-surface-container-high text-on-surface-variant border-outline-variant'
    },
    archived: {
      label: 'Archived',
      classes: 'bg-neutral-light-gray text-neutral-dark-gray border-neutral-medium-gray'
    }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-[6px] font-label-caption text-label-caption font-medium border ${config.classes} ${className}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;