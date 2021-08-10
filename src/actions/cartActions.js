import Axios from 'axios';
import { useContext } from 'react';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from '../constants/constants';
// import { APIConfig } from '../store/API-Config';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  // const APIs = useContext(APIConfig);
  // const productAPI = APIs.productAPI;
  const { data } = await Axios.get(`http://localhost:8080/api/products` + '/' + productId);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length < 0) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Cart. `,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.productName,
        image: data.photo,
        price: data.price,
        countInStock: data.quantityInStock,
        product: data.id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};