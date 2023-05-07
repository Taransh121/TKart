import { productConstants } from "../actions/constants"

const initialState={
    products:[],
    productsByPrice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[],
    },
    pageRequest:false,
    page:{},
    error:null,
    loading:false,
    productDetails:{}
}

const prodRed=(state=initialState,action)=>{
    switch(action.type){
        case productConstants.get_products_by_name:
            state={
                ...state,
                products:action.payload.products,
                productsByPrice:{
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.get_product_page_request:
            state={
                ...state,
                pageRequest:true
            }
            break;
        case productConstants.get_product_page_success:
            state={
                ...state,
                page:action.payload.page,
                pageRequest:false
            }
            break;
        case productConstants.get_product_page_failure:
            state={
                ...state,
                errpr:action.payload.error,
                pageRequest:false
            }
            break;
        case productConstants.get_product_details_by_id_request:
            state={
                ...state,
                loading:true
            }
            break;
        case productConstants.get_product_details_by_id_success:
            state={
                ...state,
                loading:false,
                productDetails:action.payload.productDetails
            }
            break;
        case productConstants.get_product_details_by_id_failure:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
        default:
            return state;
    }
    return state;
}

export default prodRed;