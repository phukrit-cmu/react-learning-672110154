import { configureStore } from '@reduxjs/toolkit';
import productReducers from '../features/Product/reducers';

// redux-toolkit's getDefaultMiddleware already includes redux-thunk by default,
// so don't add it again or you'll get duplicate middleware errors.
export default configureStore({
  reducer: {
    products: productReducers
  }
});
