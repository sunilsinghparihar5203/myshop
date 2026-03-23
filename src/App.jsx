import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import Navigation from './components/Navigation';
import CartItemContainer from './components/CartItemContainer';
import ProductDetail from './components/ProductDetail';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { fetchProducts } from './features/products/productsSlice';
import { selectCartItems, selectCartOpen } from './features/cart/cartSlice';
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
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

function AppContent() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartOpen = useSelector(selectCartOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <header>
        <Navigation totalItems={cartItems.length} onCartClick={() => dispatch({ type: 'cart/toggleCart' })} />
      </header>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
      </Routes>
      {cartOpen && (
        <CartItemContainer onClose={() => dispatch({ type: 'cart/closeCart' })} />
      )}
    </>
  );
}

export default App;
