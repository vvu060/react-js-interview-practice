import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { shoppingStore } from './shoppingStore';
import { fetchProducts } from './features/productSlice';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

// Dispatch the fetch products action when the app loads
shoppingStore.dispatch(fetchProducts());

const ShoppingPage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Provider store={shoppingStore}>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
        <Header onCartToggle={toggleCart} />
        <main className='main-content'>
          <h2 className='section-title'>Featured Products</h2>
          <ProductList />
        </main>
        <Cart isOpen={isCartOpen} onClose={closeCart} />
      </div>
    </Provider>
  );
};

export default ShoppingPage;
