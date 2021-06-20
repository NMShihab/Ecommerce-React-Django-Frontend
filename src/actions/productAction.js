import axios from "axios";
import {
  API_REQUEST_LOADING,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILED,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_LOADING,
} from "../constant/constant";

export const listProductActions = () => async (dispatch) => {
  try {
    dispatch({ type: API_REQUEST_LOADING });
    const { data } = await axios.get("/api/products/");
    // console.log(data);
    dispatch({
      type: API_REQUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: API_REQUEST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailProductActions = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_LOADING });
    const { data } = await axios.get(`/api/products/${id}`);
    // console.log(data);
    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
