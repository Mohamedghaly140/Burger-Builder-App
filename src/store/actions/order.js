import * as actionTypes from './actionTypes';
import axios from '../../AxiosOrders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/order.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

// Geting Orders from API
export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/order.json?auth=' + token).then(response => {
      const fetchedOrders = [];
      for (let key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key
        })
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    }).catch(error => {
      dispatch(fetchOrdersFail(error));
    });
  };
};