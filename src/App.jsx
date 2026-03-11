import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import CartItemContainer from './components/CartItemContainer';
import './App.css';
import Card from './components/Card';

function App() {
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data.products);
        setData(data.products);
      });
  }, []);

  const addCardhandler = (product) => {
    setCartData([...cartData, product]);
    console.log("Product added in card")
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  console.log(cartData);
  return (
    <>
      <header>
        <Navigation totalItems={cartData.length} onCartClick={toggleCart} />
      </header>
      <div className="products-container">
        {data.length > 0 && data.map((item) => (
          <Card key={item.id} product={item} addCardhandler={addCardhandler} />
        ))}
      </div>
      {isCartOpen && (
        <CartItemContainer cartItems={cartData} onClose={closeCart} />
      )}
    </>
  )
}

export default App
