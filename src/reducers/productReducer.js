import {
  API_REQUEST_LOADING,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILED,
} from "../constant/constant";

export const productListReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case API_REQUEST_LOADING:
      return { loading: true, product: [] };
    case API_REQUEST_SUCCESS:
      return { loading: false, product: action.payload };
    case API_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
