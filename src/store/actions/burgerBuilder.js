import * as actionTypes from './actionTypes';
import axios from '../../AxiosOrders';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredient = () => {
  return dispatch => {
    axios.get('https://react-burger-cbb4d.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientFailed());
      });
  };
};
