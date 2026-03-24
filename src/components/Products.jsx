import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredProducts } from '../features/products/productsSlice';
import Card from './Card';
import './Products.css';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);

  return (
    <div className="products-page">
      <h1>All Products</h1>
      {products.length === 0 ? (
        <div className="no-products">
          <h2>No products found</h2>
          <p>Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Card key={product.id} product={product} addCardhandler={(product) => dispatch({ type: 'cart/addToCart', payload: product })} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
