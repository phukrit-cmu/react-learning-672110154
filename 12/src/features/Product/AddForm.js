import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { addProduct } from './actions';

function AddForm() {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products);

  async function onSubmit(event) {
    event.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!imageURL.trim()) {
      setError('Image URL is required');
      return;
    }
    
    if (!type.trim()) {
      setError('Type is required');
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);
      
      // Try to add the product via network request
      await axios.post('https://apimocha.com/react-redux-class/products', {
        name,
        imageURL,
        type
      });
      
      // If successful, dispatch the action to add to local state
      dispatch(addProduct({ name, type, imageURL }));
      navigate('/');
    } catch (err) {
      // If network request fails, add to local state anyway and continue
      console.warn('Network request failed, adding product locally:', err.message);
      dispatch(addProduct({ name, type, imageURL }));
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h1>Add Product</h1>
      {error && (
        <div style={{ padding: '0.5rem', background: '#ffe6e6', color: '#900', borderRadius: 4, marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <form id="create-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className=" input-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            name="imageURL"
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(event) => setImageURL(event.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className=" input-group">
          <label htmlFor="type">Type</label>
          <input
            name="type"
            type="text"
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add product'}
        </button>
      </form>
    </>
  );
}

export default AddForm;
