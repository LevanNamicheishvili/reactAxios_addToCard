import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products?limit=5');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="card-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.title} className="card-image" />
          <h2 className="card-title">{product.title}</h2>
          <div className="card_inf_box">
          <p className="card-price">${product.price}</p>
          <p className="card-description">{product.description}</p>
          </div>
          <p className="card-category">{product.category}</p>
          <div className="card-rating">
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
          <button className="add-to-cart-button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
  
}

export default App;

