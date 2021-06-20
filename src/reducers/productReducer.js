import {
  API_REQUEST_LOADING,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILED,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_LOADING,
} from "../constant/constant";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case API_REQUEST_LOADING:
      return { loading: true, products: [] };
    case API_REQUEST_SUCCESS:
      return { loading: false, products: action.payload };
    case API_REQUEST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_LOADING:
      return { loading: true, ...state };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
