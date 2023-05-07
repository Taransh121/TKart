import { cartConstants, userConstants } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/address/getaddress`);
            dispatch({ type: userConstants.get_user_address_request });
            if (res.status === 200) {
                const {
                    userAddress: { address },
                } = res.data;
                dispatch({
                    type: userConstants.get_user_address_success,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.get_user_address_failure,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addAddress = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/address/create`, { payload });
            dispatch({ type: userConstants.add_user_address_request });
            if (res.status === 201) {
                console.log(res);
                const {
                    address: { address },
                } = res.data;
                dispatch({
                    type: userConstants.add_user_address_success,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.add_user_address_failure,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/order/addOrder`, payload);
            dispatch({ type: userConstants.add_user_order_request });
            if (res.status === 200) {
                console.log(res);
                const { order } = res.data;
                dispatch({
                    type: cartConstants.reset_cart,
                });
                dispatch({
                    type: userConstants.add_user_order_success,
                    payload: { order },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.add_user_order_failure,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
}


export const getOrders = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/order/getOrders`);
            dispatch({ type: userConstants.get_user_order_request });
            if (res.status === 200) {
                console.log(res);
                const { orders } = res.data;
                dispatch({
                    type: userConstants.get_user_order_success,
                    payload: { orders },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: userConstants.get_user_order_failure,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};