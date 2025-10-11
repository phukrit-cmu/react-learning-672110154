import React from 'react';
import PropTypes from 'prop-types';

function Product({ item }) {
  // Some items coming from remote may have missing/undefined imageURL.
  // Guard the dynamic require so it doesn't attempt to load './undefined'.
  let productImage;
  try {
    if (item && item.imageURL) {
      productImage = require(`../../assets/${item.imageURL}`);
    }
  } catch (e) {
    // ignore and fall back to default below
  }

  // fallback image (use an existing asset in the project)
  if (!productImage) {
    productImage = require('../../assets/shirt.jpg');
  }
  return (
    <li className="Products">
      <a href={`/update-product/${item.id}`}>
        <img className="Products__image" src={productImage} alt={item.name} />
        <div className="Products__name">{item.name}</div>
        <small className="Products__type">{item.type}</small>
      </a>
    </li>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired
};

export default Product;
