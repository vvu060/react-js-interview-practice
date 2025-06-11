import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../features/cartSlice';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, totalItems, totalAmount } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className='cart-overlay'>
      <div className='cart-container'>
        <div className='cart-header'>
          <h2 className='cart-title'>Your Cart ({totalItems} items)</h2>
          <button onClick={onClose} className='cart-close-button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='cart-items-container'>
          {items.length === 0 ? (
            <div className='cart-empty'>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className='cart-item-list'>
              {items.map((item) => (
                <li key={item.id} className='cart-item'>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className='cart-item-image'
                  />
                  <div className='cart-item-details'>
                    <h3 className='cart-item-title'>{item.title}</h3>
                    <p className='cart-item-price'>${item.price.toFixed(2)}</p>
                    <div className='cart-quantity-controls'>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            (item.quantity || 1) - 1
                          )
                        }
                        className='cart-quantity-button'
                      >
                        -
                      </button>
                      <span className='cart-quantity-value'>
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.id,
                            (item.quantity || 1) + 1
                          )
                        }
                        className='cart-quantity-button'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='cart-item-remove'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='cart-footer'>
          <div className='cart-total'>
            <span className='cart-total-label'>Total:</span>
            <span className='cart-total-value'>${totalAmount.toFixed(2)}</span>
          </div>

          <div className='cart-actions'>
            <button
              onClick={handleClearCart}
              className='cart-clear-button'
              disabled={items.length === 0}
            >
              Clear Cart
            </button>
            <button
              className='cart-checkout-button'
              disabled={items.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
