import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Product({ item, className }) {
  // Use local image with fallback
  let productImage;
  try {
    // Attempt to load the image from local assets
    productImage = require(`../../assets/${item.imageURL}`);
  } catch (error) {
    // Fallback to a default image if the specific one doesn't exist
    console.warn(`Image not found: ${item.imageURL}, using fallback`);
    productImage = require(`../../assets/necklace.jpg`); // Use a default image as fallback
  }

  return (
    <li className={className}>
      <Link to={`/update-product/${item.id}`}>
        <img 
          className="Products__image" 
          src={productImage} 
          alt={item.name}
          onError={(e) => {
            // Last resort fallback if image fails to load
            e.target.src = require(`../../assets/necklace.jpg`); // fallback image
          }}
        />
        <div className="Products__name">{item.name}</div>
        <small className="Products__type">{item.type}</small>
      </Link>
    </li>
  );
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
};

export default styled(Product)`
  padding-right: 12px;
  padding-bottom: 36px;
  padding-left: 12px;
  width: 33%;
  position: relative;

  .Products__name {
    color: #333;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    display: block;
  }

  .Products__type {
    color: #767676;
  }

  .Products__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
`;
