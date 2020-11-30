import * as ACTION_TYPES from '../actions/ActionTypes';

import { generateProductItem, getTotalProducts } from '../helper';

const initialState = {
    items: [],
    selectedProducts: [],
    totalProduct: 0,
  };

  export default function productReducer(
    state = initialState,
    action
  ) {
    switch (action.type) {
      case ACTION_TYPES.FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          items: generateProductItem(action.payload.products)
        };
      case ACTION_TYPES.CHECKOUT_PRODUCTS_SUCCESS:
        return { ...state, selectedProducts: action.selectedProducts}

      case ACTION_TYPES.CHANGE_ITEM_SUCCESS:
        return { ...state, totalProduct: getTotalProducts(state.items)}

      case ACTION_TYPES.CLEAR_PRODUCTS_SUCCESS:
        return {items: [], selectedProducts: [], totalProduct: 0};
    
      default:
        return state;
    }
  }