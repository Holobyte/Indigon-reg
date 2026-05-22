import React from 'react';

/**
 * A highly reusable visual card container with sleek styling matching the
 * Indigon cinematic branding colors.
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all duration-200 hover:shadow-md ${className}`}>
      {children}
    </div>
  );
}
