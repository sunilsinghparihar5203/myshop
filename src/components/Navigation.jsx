import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ totalItems, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>ToolKit</h2>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/products" className="nav-link" onClick={toggleMenu}>Product</Link></li>
        <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link></li>
        <li><Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link></li>
      </ul>

      <div className="nav-cart">
        <div className="cart-icon" onClick={onCartClick}>
          🛒
          <span className="cart-count">{totalItems}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
