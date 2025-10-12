import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function AddForm({ addProduct, className }) {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [type, setType] = useState('');

  function onSubmit(event) {
    event.preventDefault();
    addProduct({ name, type, imageURL });
  }

  return (
    <div className={className}>
      <h1>Add Product</h1>
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

        <div className="input-group">
          <label htmlFor="imageURL">Image URL</label>
          <input
            name="imageURL"
            type="text"
            id="imageURL"
            value={imageURL}
            onChange={(event) => setImageURL(event.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="type">Type</label>
          <input
            name="type"
            type="text"
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </div>

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}

AddForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

export default styled(AddForm)`
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;

  h1 {
    margin-top: 0;
  }

  .input-group {
    margin-bottom: 1.5rem;
  }

  form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;
