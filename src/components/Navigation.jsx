import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navigation.css';

const Navigation = ({ totalItems, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const result = await authContext.logout();
    if (result.success) {
      navigate('/login');
    }
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

      <div className="nav-actions">
        {authContext.user ? (
          <>
            {/* Show cart icon only when user is logged in */}
            <div className="nav-cart">
              <div className="cart-icon" onClick={onCartClick}>
                🛒
                <span className="cart-count">{totalItems}</span>
              </div>
            </div>

            {/* User info and logout */}
            <div className="nav-user">
              <span className="user-email">{authContext.user.email}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          /* Show login button when user is not logged in */
          <div className="nav-auth">
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
