import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../features/products/productsSlice';
import Card from './Card';
import './Products.css';

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <Card key={product.id} product={product} addCardhandler={(product) => dispatch({ type: 'cart/addToCart', payload: product })} />
        ))}
      </div>
    </div>
  );
}

export default Products;
