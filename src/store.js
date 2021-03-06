import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import { cartItemReducer } from "./reducers/cartReducer";
import {
  userLoginReducer,
  userSignupReducer,
  userDetailReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  profileDetailReducer,
  profileUpdateReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  ordertDetailReducer,
  ordertListReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartItemReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailReducer,
  userUpdateProfile: userUpdateReducer,
  userList: userListReducer,
  profileDetails: profileDetailReducer,
  profileUpdate: profileUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetail: ordertDetailReducer,
  ordertList: ordertListReducer,
  deleteUser: userDeleteReducer,
});

const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippinAdressInfoFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const shippinMethodInfoFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippinAdressInfoFromStorage,
    paymentMethod: shippinMethodInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
