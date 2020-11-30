import * as ACTION_TYPES from './ActionTypes';

async function getProducts() {
  return fetch("https://jsonplaceholder.typicode.com/todos")
    .then(res => res.json());
}

export function fetchProducts() {
  return async dispatch => {
    return getProducts()
      .then(json => {
        dispatch(fetchProductsSuccess(json));
        return json;
      })
      .catch(error =>
        console.log(error)
      );
  };
}

export const fetchProductsSuccess = products => ({
  type: ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export function checkout(products) {
  return {
      type: ACTION_TYPES.CHECKOUT_PRODUCTS_SUCCESS,
      selectedProducts: products.filter(x => x.quantity > 0)
  }
}

export function clearProducts() {
  return {
      type: ACTION_TYPES.CLEAR_PRODUCTS_SUCCESS
  }
}

export function onChangeItem(value) {
  return {
      type: ACTION_TYPES.CHANGE_ITEM_SUCCESS,
      totalInput: value
  }
}