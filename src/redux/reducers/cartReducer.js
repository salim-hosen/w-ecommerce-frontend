import { CLEAR_CART_ITEMS, SET_CART_ITEMS } from '../types';

const initialState = {
    items: [],
    total: 0
}

export default function userReducer(state = initialState, action){

    switch (action.type) {
        case SET_CART_ITEMS:
            return {
                items: [...action.payload],
            };
        case CLEAR_CART_ITEMS:
            return initialState;
        default:
            return state;
    }

}