import axios from "axios";
import {
  API_REQUEST_LOADING,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILED,
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
