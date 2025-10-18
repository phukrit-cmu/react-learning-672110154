import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { updateProduct, deleteProduct } from './actions';

export default function UpdateForm() {
  const { id } = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find((product) => product.id === Number(id));

  const [name, setName] = useState(product?.name || '');
  const [type, setType] = useState(product?.type || '');
  const [imageURL, setImageURL] = useState(product?.imageURL || '');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
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
      
      // Try to update the product via network request
      await axios.put(`https://apimocha.com/react-redux-class/products/${id}`, {
        name,
        imageURL,
        type
      });
      
      // If successful, dispatch the action to update local state
      dispatch(updateProduct({ id: Number(id), name, type, imageURL }));
      navigate('/');
    } catch (err) {
      // If network request fails, update local state anyway and continue
      console.warn('Network request failed, updating product locally:', err.message);
      dispatch(updateProduct({ id: Number(id), name, type, imageURL }));
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsSubmitting(true);
      // Try to delete the product via network request
      await axios.delete(`https://apimocha.com/react-redux-class/products/${id}`);
      
      // If successful, dispatch the action to delete from local state
      dispatch(deleteProduct({ id: Number(id) }));
      navigate('/');
    } catch (err) {
      // If network request fails, delete from local state anyway and continue
      console.warn('Network request failed, deleting product locally:', err.message);
      dispatch(deleteProduct({ id: Number(id) }));
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Update Product</h1>
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

        <button
          type="button"
          className="UpdateForm__delete-button"
          onClick={onDelete}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Deleting...' : 'Delete product'}
        </button>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update product'}
        </button>
      </form>
    </>
  );
}
