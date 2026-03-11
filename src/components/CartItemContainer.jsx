import React from 'react';
import './CartItemContainer.css';

function CartItemContainer({ cartItems, onClose }) {
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

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
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">${item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">${totalAmount.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItemContainer;
