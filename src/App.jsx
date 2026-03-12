import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import CartItemContainer from './components/CartItemContainer';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import { ProductContext } from './context/ProductContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import './App.css';
import Card from './components/Card';

function ProtectedRoute({ children }) {
  const authContext = useContext(AuthContext);
  return authContext.user ? children : <Navigate to="/login" />;
}

function PublicRoute({ children }) {
  const authContext = useContext(AuthContext);
  return !authContext.user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
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
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={
          <ProtectedRoute>
            <div className="products-container">
              {products.length > 0 && products.map((item) => (
                <Card key={item.id} product={item} addCardhandler={addToCart} />
              ))}
            </div>
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
      {isCartOpen && (
        <CartItemContainer cartItems={cartItems} onClose={closeCart} />
      )}
    </>
  );
}

export default App;
