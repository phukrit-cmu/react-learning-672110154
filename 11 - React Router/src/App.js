import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './features/Navbar';
import Container from './features/Container';
import Home from './features/Home';
import GlobalStyle from './features/GlobalStyle';
import AddForm from './features/Product/AddForm';
import UpdateForm from './features/Product/UpdateForm';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const products = await axios.get(
        'https://apimocha.com/react-redux-class/products'
      );
      setProducts(products.data);
    }

    getProducts();
  }, []);

  function addProduct(product) {
    // optimistic local update
    setProducts((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { ...product, id: nextId }];
    });

    // try to POST to API but ignore failures
    (async () => {
      try {
        await axios.post('https://apimocha.com/react-redux-class/products', product);
      } catch (e) {
        // ignore network errors for this demo
        // console.error('Failed to POST product', e);
      }
    })();
  }

  function updateProduct(id, updated) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        {products.length > 0 ? (
          <Routes>
              <Route path="/create-product" element={<AddForm addProduct={addProduct} />} />
              <Route
                path="/update-product/:id"
                element={<UpdateForm products={products} updateProduct={updateProduct} deleteProduct={deleteProduct} />}
              />
              <Route path="/" element={<Home products={products} />} />
          </Routes>
        ) : (
          <div>Loading products....</div>
        )}
      </Container>
    </>
  );
}

export default App;