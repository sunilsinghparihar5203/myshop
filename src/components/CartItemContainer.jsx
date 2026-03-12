import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import './CartItemContainer.css';

function CartItemContainer({ onClose }) {
  const { cartItems, getTotalAmount, removeFromCart } = useContext(ProductContext);
  const totalAmount = getTotalAmount();

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Shopping Cart ({cartItems.length})</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">₹{totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItemContainer;
