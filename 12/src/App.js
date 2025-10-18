import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Navbar from './features/Navbar';
import Container from './features/Container';
import Home from './features/Home';
import GlobalStyle from './features/GlobalStyle';
import AddForm from './features/Product/AddForm';
import UpdateForm from './features/Product/UpdateForm';
import { fetchProducts } from './features/Product/actions';
import localData from './app/data';

function App() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // centralized fetch so retry and initial load share logic
    const fetchProductsFromApi = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get('https://apimocha.com/react-redux-class/products', { timeout: 8000 });
        dispatch(fetchProducts(response.data));
      } catch (err) {
        // Build a clearer error message based on axios error shape
        let message = 'An unknown error occurred';
        if (axios.isAxiosError && axios.isAxiosError(err)) {
          if (err.response) {
            // Server returned a response (4xx, 5xx)
            message = `Request failed: ${err.response.status} ${err.response.statusText || ''}`.trim();
          } else if (err.request) {
            // Request made but no response received (network error / CORS / timeout)
            message = 'Network Error: no response received from server';
          } else {
            // Something happened setting up the request
            message = `Request setup error: ${err.message}`;
          }
        } else if (err && err.message) {
          message = err.message;
        }

        console.error('Failed to fetch products:', err);
        // Fallback to local data when network request fails
        dispatch(fetchProducts(localData));
        // Show a descriptive warning message to the user
        setError(`${message} — using local data`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromApi();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Container>
        {error ? (
          <div style={{ padding: '1rem', background: '#ffe6e6', color: '#900', borderRadius: 4 }}>
            <strong>ERROR</strong>
            <div>{error}</div>
            <button onClick={() => {
              // retry by invoking the same centralized fetch function
              setError(null);
              setLoading(true);
              axios.get('https://apimocha.com/react-redux-class/products', { timeout: 8000 })
                .then((response) => dispatch(fetchProducts(response.data)))
                .catch((err) => {
                  let message = 'An unknown error occurred';
                  if (axios.isAxiosError && axios.isAxiosError(err)) {
                    if (err.response) message = `Request failed: ${err.response.status} ${err.response.statusText || ''}`.trim();
                    else if (err.request) message = 'Network Error: no response received from server';
                    else message = `Request setup error: ${err.message}`;
                  } else if (err && err.message) {
                    message = err.message;
                  }
                  console.error('Retry fetch failed:', err);
                  dispatch(fetchProducts(localData));
                  setError(`${message} — using local data`);
                })
                .finally(() => setLoading(false));
            }} style={{ marginTop: 8 }}>Retry</button>
          </div>
        ) : (
          !loading ? (
          <Routes>
            <Route path="/create-product" element={<AddForm />} />
            <Route path="/update-product/:id" element={<UpdateForm />} />
            <Route path="/" element={<Home products={products} />} />
          </Routes>
          ) : (
            <div>Loading products....</div>
          )
        )}
      </Container>
    </>
  );
}

export default App;
