import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export { ProductContext };

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add product to cart
  const addToCart = (product) => {
    const cartItem = {
      ...product,
      cartItemId: Date.now() + Math.random(), // Generate unique ID for this cart entry
      quantity: 1
    };
    setCartItems(prev => [...prev, cartItem]);
    console.log('Product added to cart:', cartItem);
  };

  // Remove product from cart
  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  // Close cart
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Calculate total amount
  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const value = {
    products,
    cartItems,
    isCartOpen,
    fetchProducts,
    addToCart,
    removeFromCart,
    toggleCart,
    closeCart,
    getTotalAmount,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
