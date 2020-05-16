import * as actionTypes from "../actions/auth/authActionsTypes";
import { PURGE } from "store/actions/app/appActionTypes";
import { parseJwt } from "utils/utils";

const initialState = {
  token: null,
  expirationDate: null,
  userName: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        message: null,
        loading: true,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        expirationDate: null,
      };
    case actionTypes.AUTH_SUCCESS:
      let userName = parseJwt(action.token).unique_name || "";
      return {
        ...state,
        token: action.token,
        expirationDate: action.expirationDate,
        userName,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        expirationDate: null,
      };
    case PURGE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
