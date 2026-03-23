import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id));
  }, [id, products]);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} className="back-btn">Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">₹{product.price}</p>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-brand">Brand: {product.brand}</p>
          <p className="product-rating">Rating: {product.rating} ⭐</p>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-meta">
            <p>Stock: {product.stock} units available</p>
            <p>Discount: {product.discountPercentage}% off</p>
          </div>

          <button
            onClick={() => dispatch(addToCart(product))}
            className="add-to-cart-detail"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
