import React from 'react';
import { useAppSelector } from '../hooks';
import ProductCard from './ProductCard';

const ProductList: React.FC = () => {
  const { filteredProducts, status, error, searchTerm } = useAppSelector(
    (state) => state.products
  );

  if (status === 'loading') {
    return (
      <div className='loading-container'>
        <div className='loading-spinner'></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className='error-container'>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className='empty-results'>
        <h2 className='empty-message'>
          {searchTerm
            ? `No products found matching "${searchTerm}"`
            : 'No products available'}
        </h2>
        {searchTerm && (
          <p>Try adjusting your search criteria for better results.</p>
        )}
      </div>
    );
  }

  return (
    <div className='product-grid'>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
