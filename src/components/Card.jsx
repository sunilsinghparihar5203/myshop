import React from 'react';
import './Card.css';

function Card({ product, addCardhandler }) {

  return (
    <div className="card">
      <div className="card-image">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="card-content">
        <h2 className="card-title">{product.title}</h2>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <button className="add-to-cart" onClick={() => addCardhandler(product)}>Add to Cart</button>
      </div>
    </div>
  )
}

export default Card