import React from 'react';

const LoadingSkeleton = ({ type = 'product', count = 6 }) => {
  const ProductSkeleton = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export default LoadingSkeleton;