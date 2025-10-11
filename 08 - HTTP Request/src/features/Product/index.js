import React from 'react';
import PropTypes from 'prop-types';

function Product({ item }) {
  // Use image URLs provided by the API. Prefer full URLs (http/https).
  // If the API returns only a filename, you can map it to a CDN or
  // static hosting later. For now, if imageURL is not a full URL,
  // attempt to use it as a relative path under /assets, else fall back.
  let imageSrc = 'https://68e9f9e9f1eeb3f856e598b4.mockapi.io/react-redux-class/products';
  const placeholder = 'https://via.placeholder.com/300x300?text=No+Image';

  if (item && item.imageURL) {
    if (/^https?:\/\//i.test(item.imageURL)) {
      imageSrc = item.imageURL;
    } else {
      // treat as relative path in the app's public assets folder
      imageSrc = `/assets/${item.imageURL}`;
    }
  } else {
    imageSrc = placeholder;
  }
  return (
    <li className="Products">
      <a href={`/update-product/${item.id}`}>
        <img className="Products__image" src={imageSrc} alt={item.name} />
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
