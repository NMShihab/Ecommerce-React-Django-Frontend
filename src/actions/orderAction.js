import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  CART_ITEM_RESET,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
} from "../constant/constant";

export const orderCreateAction = (order) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/add/", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_ITEM_RESET,
      payload: data,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const detailOrderActions = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const detailOrderActions = (id) => async (dispatch, getState) => {
//   const {
//     userLogin: { userInfo },
//   } = getState();

//   try {
//     dispatch({ type: ORDER_DETAIL_REQUEST });
//     const { data } = await axios.get(`/api/order/${id}`);
//     console.log(data);
//     dispatch({
//       type: ORDER_DETAIL_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ORDER_DETAIL_FAIL,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };
