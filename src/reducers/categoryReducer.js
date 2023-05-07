import { categoryConstants } from "../actions/constants"

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];
    for (let cat of categories) {
        if (cat._id === parentId) {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        }
        else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            })
        }
    }
    return myCategories
}


const categoryRed= (state = initialState, action) => {
    
    switch (action.type) {
        case categoryConstants.get_all_cat_success:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.add_cat_request:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.add_cat_success:
            const category = action.payload.category;
            state = {
                ...state,
                categories: buildNewCategories(category.parentId, state.categories, category),
                loading: false
            }
            break;
        case categoryConstants.add_cat_failure:
            state = {
                ...initialState,
            }
            break;
        default:
            return state;
    }
    return state;
}
export default categoryRed;