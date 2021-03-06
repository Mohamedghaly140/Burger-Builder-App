import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.Auth_START:
      return updateObject(state, {error: null, loading: true});
    case actionTypes.Auth_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      });
    case actionTypes.Auth_FAIL:
      return updateObject(state, {
        error: action.error,
        loading: false
      });
    case actionTypes.Auth_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      });
    case actionTypes.SET_Auth_REDIRECT_PATH:
      return updateObject(state, {
        authRedirectPath: action.path
      })
    default:
      return state;
  }
}

export default reducer;