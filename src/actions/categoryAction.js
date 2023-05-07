import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.get_all_cat_request });
    const res = await axios.post("/category/getcategories");
    console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstants.get_all_cat_success,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstants.get_all_cat_failure,
        payload: { error: res.data.error },
      });
    }
  };
};
