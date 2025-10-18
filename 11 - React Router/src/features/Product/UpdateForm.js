import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UpdateForm({ products = [], updateProduct, deleteProduct }) {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const found = products.find((p) => String(p.id) === String(id));
    if (found) {
      setName(found.name || '');
      setImageURL(found.imageURL || '');
      setType(found.type || '');
    }
  }, [id, products]);

  function onSubmit(e) {
    e.preventDefault();
    updateProduct(Number(id), { name, imageURL, type });
    navigate('/');
  }

  function onDelete() {
    deleteProduct(Number(id));
    navigate('/');
  }

  return (
    <>
      <h1>Update Product</h1>
      <form id="create-form" onSubmit={onSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
          />
        </div>

        <button type="button" className="UpdateForm__delete-button" onClick={onDelete}>
          Delete product
        </button>
        <button type="submit">Update product</button>
      </form>
    </>
  );
}

UpdateForm.propTypes = {
  products: PropTypes.array,
  updateProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired
};