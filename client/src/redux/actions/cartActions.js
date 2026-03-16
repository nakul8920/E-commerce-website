import * as actionTypes from '../constants/cartConstants';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const addToCart = (id, quantity = 1) => async (dispatch) => {
    try { 
        const { data } = await axios.get(`${API_BASE_URL}/product/${id}`);
        
        if (data && data.id) {
            dispatch({ type: actionTypes.ADD_TO_CART, payload: { ...data, quantity: quantity || 1 } });
        } else {
            console.error('Product data is invalid:', data);
        }

    } catch (error) {
        console.error('Error while calling cart API:', error.message);
        console.error('Failed to add product ID:', id);
    }
};

export const updateCartQuantity = (id, quantity) => (dispatch) => {
    if (quantity <= 0) return;
    dispatch({
        type: actionTypes.UPDATE_CART_QUANTITY,
        payload: { id, quantity }
    });
};

export const removeFromCart = (id) => (dispatch) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

};