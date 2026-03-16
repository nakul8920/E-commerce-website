import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find(product => product.id === item.id);
            
            if(existItem){
                return {
                    ...state, cartItems: state.cartItems.map(x => x.id === item.id ? { ...x, quantity: (x.quantity || 1) + (item.quantity || 1) } : x)
                }
            } else {
                return  { ...state, cartItems: [...state.cartItems, item]}
            }
        case actionTypes.UPDATE_CART_QUANTITY:
            return {
                ...state, 
                cartItems: state.cartItems.map(product => 
                    product.id === action.payload.id 
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                )
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
        default:
            return state;
    }
}