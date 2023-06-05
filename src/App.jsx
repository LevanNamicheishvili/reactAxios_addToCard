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

  const addToCard = async (product) => {
    const button = document.getElementById(`add-to-card-${product.id}`);
    button.disabled = true; // Disable the button
    button.classList.add('loading'); // Apply loading style

    // Simulate an asynchronous action (e.g., API call) with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After the action is complete, change button state
    button.classList.remove('loading'); // Remove loading style
    button.classList.add('success'); // Apply success style
    button.innerHTML = 'Successfully Added';

    // Reset button state after 3 seconds
    setTimeout(() => {
      button.disabled = false;
      button.classList.remove('success');
      button.innerHTML = 'Add to Card';
    }, 3000);
  };

  return (
    <>
   
    <div className="card-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <div className="card_img_box">
            <img src={product.image} alt={product.title} className="card-image" />
          </div>
          <div className="card_title_box">
            <h2 className="card-title">{product.title}</h2>
          </div>
          <div className="card_inf_box">
            <p className="card-price">${product.price}</p>
            <div className="card_description_box">
              <p className="card-description">{product.description}</p>
            </div>
          </div>
          <p className="card-category">{product.category}</p>
          <div className="card-rating">
            <span className="rating-value">{product.rating.rate}</span>
            <span className="rating-count">({product.rating.count})</span>
          </div>
          <button
            id={`add-to-card-${product.id}`}
            className="add-to-card-button"
            onClick={() => addToCard(product)}
          >
            Add to Card
          </button>
        </div>
      ))}
    </div>
    </>
  );
}

export default App;
