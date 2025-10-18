import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAction('FETCH_PRODUCTS');
export const addProduct = createAction('ADD_PRODUCT');
export const updateProduct = createAction('UPDATE_PRODUCT');
export const deleteProduct = createAction('DELETE_PRODUCT');

// Async action creators using Redux Thunk
export const fetchProductsAsync = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://apimocha.com/react-redux-class/products');
      dispatch(fetchProducts(response.data));
    } catch (error) {
      console.warn('Network request failed, action will be handled by component fallback');
      // Error handling is done in the component level
      // Don't throw error to allow fallback handling
      return;
    }
  };
};

export const addProductAsync = (productData) => {
  return async (dispatch) => {
    try {
      await axios.post('https://apimocha.com/react-redux-class/products', productData);
      dispatch(addProduct(productData));
    } catch (error) {
      console.warn('Network request failed, adding product locally:', error.message);
      // Still add the product to local state when network fails
      dispatch(addProduct(productData));
    }
  };
};

export const updateProductAsync = (id, productData) => {
  return async (dispatch) => {
    try {
      await axios.put(`https://apimocha.com/react-redux-class/products/${id}`, productData);
      dispatch(updateProduct({ id, ...productData }));
    } catch (error) {
      console.warn('Network request failed, updating product locally:', error.message);
      // Still update the product in local state when network fails
      dispatch(updateProduct({ id, ...productData }));
    }
  };
};

export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://apimocha.com/react-redux-class/products/${id}`);
      dispatch(deleteProduct({ id }));
    } catch (error) {
      console.warn('Network request failed, deleting product locally:', error.message);
      // Still delete the product from local state when network fails
      dispatch(deleteProduct({ id }));
    }
  };
};
