import * as actionTypes from "./actions";

const initialState = {
  addToCartData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      let cartData = state.addToCartData;
      cartData.push(action.payload);
      return {
        addToCartData: getUnique(cartData)
      };
    case actionTypes.REMOVE_TO_CART:
      return {
        addToCartData: state.addToCartData.filter(
          (_, i) => i !== action.payload
        )
      };
    case actionTypes.UPDATE_QTY:
      let updateCartData = state.addToCartData;
      updateCartData[action.payload.index].qty = action.payload.qty;

      updateCartData[action.payload.index].price =
        updateCartData[action.payload.index].originalPrice * action.payload.qty;
      return {
        addToCartData: updateCartData
      };
  }
  return state;
};

const getUnique = array => {
  let uniqueArray = [];
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1 && array[i]) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
};

export default reducer;
