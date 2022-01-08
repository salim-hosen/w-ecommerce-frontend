


import { SET_CART_ITEMS, CLEAR_CART_ITEMS } from '../types';

export const addToCart = (product) => (dispatch) => {
    
    // get cart items
    const items = JSON.parse(localStorage.getItem("cart") ?? "[]");


    // if in the cart then increase qty
    let has = false;
    for(let i = 0; i < items.length; i++){

        if(items[i].id == product.id){
            has = true;
            items[i].qty = parseInt(items[i].qty) + 1;
            break;
        }

    }

    // if not in cart add to cart
    if(!has){
        
        const item = {
            id: product.id,
            name: product.name,
            qty: 1,
            price: product.price,
            image: product.image
        }

        items.push(item);
    }

    dispatch({type: SET_CART_ITEMS, payload: items});
    localStorage.setItem("cart", JSON.stringify(items));


} 



export const loadCartItems = () => (dispatch) => {
    
    // get cart items
    const items = JSON.parse(localStorage.getItem("cart") ?? "[]");
    dispatch({type: SET_CART_ITEMS, payload: items});

}

export const removeFromCart = (id) => (dispatch) => {
    
    // get cart items
    const items = JSON.parse(localStorage.getItem("cart") ?? "[]");

    const filtered = items.filter(item => item.id != id);

    dispatch({type: SET_CART_ITEMS, payload: filtered});
    localStorage.setItem("cart", JSON.stringify(filtered));

}


export const increaseCartQty = (id) => (dispatch) => {
    // get cart items
    const items = JSON.parse(localStorage.getItem("cart") ?? "[]");


    // if in the cart then increase qty
    for(let i = 0; i < items.length; i++){

        if(items[i].id == id){
            items[i].qty = parseInt(items[i].qty) + 1;
            break;
        }

    }

    dispatch({type: SET_CART_ITEMS, payload: items});
    localStorage.setItem("cart", JSON.stringify(items));

}

export const decreaseCartQty = (id) => (dispatch) => {
    
    // get cart items
    const items = JSON.parse(localStorage.getItem("cart") ?? "[]");


    // if in the cart then increase qty
    for(let i = 0; i < items.length; i++){

        if(items[i].id == id && items[i].qty > 1){
            items[i].qty = parseInt(items[i].qty) - 1;
            break;
        }

    }

    dispatch({type: SET_CART_ITEMS, payload: items});
    localStorage.setItem("cart", JSON.stringify(items));

}




export const clearCartItems = (id) => (dispatch) => {
    
    localStorage.removeItem("cart");
    dispatch({type: CLEAR_CART_ITEMS});

}
