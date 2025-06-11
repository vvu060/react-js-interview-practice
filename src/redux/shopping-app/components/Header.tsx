import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setSearchTerm, clearSearch } from '../features/productSlice';

interface HeaderProps {
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartToggle }) => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.cart);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
  };

  const handleClearSearch = () => {
    setSearchInput('');
    dispatch(clearSearch());
  };

  return (
    <header className='header'>
      <div className='container'>
        <div className='header-content'>
          <h1 className='app-title'>ShopEase</h1>

          <div className='search-container'>
            <form onSubmit={handleSearch} className='search-form'>
              <svg
                className='search-icon'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder='Search products...'
                className='search-input'
              />
              <button type='submit' className='search-button'>
                Search
              </button>
              {searchInput && (
                <button
                  type='button'
                  onClick={handleClearSearch}
                  className='clear-button'
                >
                  Clear
                </button>
              )}
            </form>

            <div
              className='cart-icon-container'
              onClick={onCartToggle}
              style={{ cursor: 'pointer' }}
            >
              <svg
                className='cart-icon'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
              {totalItems > 0 && (
                <span className='cart-badge'>{totalItems}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
