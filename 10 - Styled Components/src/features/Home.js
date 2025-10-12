import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Product from './Product';
import AddForm from './Product/AddForm';

let currentProductId = 9;

function Home({ className }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        'https://68e9f9e9f1eeb3f856e598b4.mockapi.io/react-redux-class/products'
      );
      setProducts(products.data);
    }

    getProducts();
  }, []);

  function addProduct(product) {
    // Ensure the correct field name is used for image URL (API uses 'imageUrl')
    const newProduct = { 
      id: ++currentProductId, 
      ...product,
      imageUrl: product.imageUrl || product.imageURL  // Normalize the field name
    };
    setProducts([...products, newProduct]);
  }

  return (
    <div className={className}>
      <h1>New Products</h1>
      {products.length > 0 ? (
        <ul className="Home__products">
          {products.map((product) => (
            <Product key={product.id} item={product} />
          ))}
        </ul>
      ) : (
        <div>Loading products....</div>
      )}
      <AddForm addProduct={addProduct} />
    </div>
  );
}

Home.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Home)`
  .Home__products {
    display: flex;
    flex-wrap: wrap;

    list-style-type: none;
    padding: 0;
    margin: 0 -12px;
  }

  h1 {
    margin-top: 2rem;
  }
`;
