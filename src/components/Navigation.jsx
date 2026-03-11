import React, { useState } from 'react';
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
        <li><a href="#home" className="nav-link" onClick={toggleMenu}>Home</a></li>
        <li><a href="#product" className="nav-link" onClick={toggleMenu}>Product</a></li>
        <li><a href="#about" className="nav-link" onClick={toggleMenu}>About</a></li>
        <li><a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a></li>
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
