import { cartConstants } from "../actions/constants";

const initialState = {
    cartItems: {},
    updatingCart:false,
    error:null
};

const cartRed = (state = initialState, action) => {
    switch(action.type){
        case cartConstants.add_to_cart_request:
            // console.log(action.type);
            state={
                ...state,
                // cartItems:action.payload,
                updatingCart:true
            }
            break;
        case cartConstants.add_to_cart_success:
            state={
                ...state,
                cartItems:action.payload.cartItems,
                updatingCart:false
            }
            break;
        case cartConstants.add_to_cart_failure:
            state={
                ...state,
                error:action.payload.error,
                updatingCart:false
            }
            break;
        case cartConstants.reset_cart:
            state={
                ...initialState
            }
            break;
        default:
            return state;
    }
    return state;
}
export default cartRed;
