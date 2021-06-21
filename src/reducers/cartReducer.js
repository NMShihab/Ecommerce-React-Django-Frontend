import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constant/constant";

export const cartItemReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItem.find((x) => x.product === item.product);
      console.log(existItem);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }

    default:
      return state;
  }
};
