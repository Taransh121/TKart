import { userConstants } from "../actions/constants";

const initState = {
    address: [],
    error: null,
    loading: false,
    orders: [],
    orderFetching: false,
    // orderDetails: {},
    // placedOrderId: null,
};

const userRed= (state = initState, action) => {
    switch (action.type) {
        case userConstants.get_user_address_request:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.get_user_address_success:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.get_user_address_failure:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case userConstants.add_user_address_request:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.add_user_address_success:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.add_user_address_failure:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
            case userConstants.get_user_order_request:
                state = {
                  ...state,
                  orderFetching: true,
                };
                break;
              case userConstants.get_user_order_success:
                state = {
                  ...state,
                  orders: action.payload.orders,
                  orderFetching: false,
                };
                break;
              case userConstants.get_user_order_failure:
                state = {
                  ...state,
                  error: action.payload.error,
                  orderFetching: false,
                };
                break;
        default:
            return state;
    }
    return state;
}

export default userRed;