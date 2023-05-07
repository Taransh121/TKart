import axios from "../helpers/axios";
import { productConstants } from "./constants";


export const getProductsByName = (name) => {
    return async dispatch => {
        const res = await axios.get(`/product/${name}`);
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type: productConstants.get_products_by_name,
                payload: res.data
            })
        }
        else {
            // dispatch({
            //     type:
            // })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            dispatch({ type: productConstants.get_product_page_request })
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.get_product_page_success,
                    payload: { page }
                })
            }
            else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.get_product_page_failure,
                    payload: { error }
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.get_product_details_by_id_request });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/products/${productId}`);
            console.log(res);
            if (res.status === 200) {
                dispatch({
                    type: productConstants.get_product_details_by_id_success,
                    payload: { productDetails: res.data.product }
                });
            }
            else {
                dispatch({
                    type: productConstants.get_product_details_by_id_failure,
                    payload: { error: res.data.error }
                });
            }
        } catch (error) {
            console.log(error);

        }
    }
}
