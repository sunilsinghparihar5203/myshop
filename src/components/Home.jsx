import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredProducts } from '../features/products/productsSlice';
import Card from './Card';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Discover amazing products at great prices</p>
          <button className="cta-button" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.slice(0, 6).map((product) => (
            <Card key={product.id} product={product} addCardhandler={(product) => dispatch({ type: 'cart/addToCart', payload: product })} />
          ))}
        </div>
        <button className="view-all-btn" onClick={() => navigate('/products')}>
          View All Products
        </button>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>Dedicated customer service</p>
        </div>
        <div className="feature">
          <h3>Secure Payment</h3>
          <p>Safe and secure transactions</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
