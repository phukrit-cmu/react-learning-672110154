import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Product({ item, className }) {
  // Define the local fallback image to use when all other sources fail
  const fallbackImage = require('../../assets/necklace.jpg');

  // Generate dynamic image URLs from loremflickr.com (primary) and picsum.photos (secondary)
  const productName = item && item.name ? item.name.replace(/\s+/g, '_').toLowerCase() : 'product';
  const loremFlickrUrl = `https://loremflickr.com/400/400/${encodeURIComponent(productName)}`;
  const picsumUrl = `https://picsum.photos/400/400`;

  // Get the image URL from the API response (highest priority)
  const apiImageUrl = item && (item.imageUrl || item.imageURL);

  // Set up state for the current image source
  const [imageSrc, setImageSrc] = useState(apiImageUrl || loremFlickrUrl);

  // Handle image loading errors by trying the next source in the chain
  const handleImageError = () => {
    if (imageSrc === apiImageUrl && apiImageUrl) {
      // If current source is API image and it failed, try loremflickr
      setImageSrc(loremFlickrUrl);
    } else if (imageSrc === loremFlickrUrl) {
      // If current source is loremflickr and it failed, try picsum
      setImageSrc(picsumUrl);
    } else if (imageSrc === picsumUrl) {
      // If all dynamic sources fail, use the local fallback
      setImageSrc(fallbackImage);
    }
  };

  useEffect(() => {
    // Reset image source when item changes, prioritizing sources
    setImageSrc(apiImageUrl || loremFlickrUrl);
  }, [item, apiImageUrl, loremFlickrUrl, picsumUrl]);

  return (
    <li className={className}>
      <a href={`/update-product/${item.id}`}>
        <img 
          className="Products__image" 
          src={imageSrc} 
          alt={item.name || 'Product'} 
          onError={handleImageError} 
        />
        <div className="Products__name">{item.name || 'Unknown Product'}</div>
        <small className="Products__type">{item.type || 'Unknown Type'}</small>
      </a>
    </li>
  );
}

Product.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imageUrl: PropTypes.string,  // API uses imageUrl (lowercase 'l')
    imageURL: PropTypes.string,  // Also support the original field name for compatibility
    type: PropTypes.string
  }).isRequired,
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
