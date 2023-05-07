import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";

const getCartItems = () => {
    return async dispatch => {
        try {
            dispatch({ type: cartConstants.add_to_cart_request });
            const res = await axios.post("/cart/getCartItems");
            if (res.status === 200) {
                // console.log(res.data);
                // const { cartItems } = res.data.cart;
                const { cartItems } = res.data;
                // console.log({ getCartItems: cartItems });
                if (cartItems) {
                    dispatch({
                        type: cartConstants.add_to_cart_success,
                        payload: { cartItems }
                    })
                }
            }
            else {
                dispatch({
                    type: cartConstants.add_to_cart_failure,
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const addToCart = (product, newQty = 1) => {
    return async dispatch => {
        const { cart: { cartItems }, auth } = store.getState();
        // console.log(cartItems);
        const qty = cartItems[product._id] ? parseInt(cartItems[product._id].qty + newQty) : 1;
        cartItems[product._id] = {
            ...product,
            qty
        };
        if (auth.authenticate) {
            dispatch({ type: cartConstants.add_to_cart_request,});
            const payload = {
                cartItems: [{ product: product._id, quantity: qty }]
            }
            const res = await axios.post("/cart/addtocart", payload);
            if(res.status===201){
                dispatch(getCartItems());
            }
            // if (res.status === 200 && 201) {
            // }
        }
        else {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        }
    }
}

export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState()
        const cartItems = localStorage.getItem("cart") ?
            JSON.parse(localStorage.getItem("cart")) : null;

        if (auth.authenticate) {
            localStorage.removeItem("cart");
            if (cartItems) {
                const payload = {
                    cartItems: Object.keys(cartItems).map((key, index) => {
                        return {
                            quantity: cartItems[key].qty,
                            product: cartItems[key]._id,
                        };
                    }),
                };
                console.log("asdfg");
                if (Object.keys(cartItems).length > 0) {
                    const res = await axios.post(`/cart/addtocart`, payload);
                    // console.log(res.status);
                    if (res.status === 201) {
                        dispatch(getCartItems());
                    }
                }
            } else {
                dispatch(getCartItems());
            }
        }
    }
}

export {getCartItems};
