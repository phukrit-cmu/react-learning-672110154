import PropTypes from "prop-types";

function Product({ item }) {
  let productImage;
  try {
    // try to load the image from assets; this can fail if the filename is invalid
    productImage = require(`../../assets/${item.imageURL}`);
  } catch (e) {
    // fall back to a simple placeholder svg so the app doesn't crash at runtime
    // eslint-disable-next-line global-require
    productImage = require("../../assets/placeholder.svg");
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
  item: PropTypes.object.isRequired,
};

export default Product;
