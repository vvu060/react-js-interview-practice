import React from 'react';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../features/cartSlice';
import type { Product } from '../features/cartSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className='product-card'>
      <div className='product-image'>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className='product-details'>
        <h3 className='product-title'>{product.title}</h3>
        <p className='product-description'>
          {product.description.substring(0, 100)}...
        </p>
        <div className='product-footer'>
          <span className='product-price'>${product.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className='add-to-cart-button'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
