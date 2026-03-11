import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CartItemContainer from './components/CartItemContainer';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import { ProductContext } from './context/ProductContext';
import './App.css';
import Card from './components/Card';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const {
    products,
    cartItems,
    isCartOpen,
    fetchProducts,
    addToCart,
    toggleCart,
    closeCart
  } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <header>
        <Navigation totalItems={cartItems.length} onCartClick={toggleCart} />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <div className="products-container">
            {products.length > 0 && products.map((item) => (
              <Card key={item.id} product={item} addCardhandler={addToCart} />
            ))}
          </div>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {isCartOpen && (
        <CartItemContainer cartItems={cartItems} onClose={closeCart} />
      )}
    </>
  );
}

export default App;
