import axios from "axios";
import * as actionTypes from "./authActionsTypes";
import {
  purgeApp,
  showErrorMessage,
  showSuccessMessage
} from "../app/appActions";
import { APIS } from "../../../constants/constants.js";

export const logInUser = (user, onStart, onSuccess, onFailure) => {
  if (user) {
    return dispatch => {
      onStart && onStart();

      let url = APIS.login;

      axios
        .post(url, user)
        .then(res => {
          let response = res.data;
          const expirationDate = new Date(response.expires);
          localStorage.setItem("token", response.token);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(authSuccess(response.token, expirationDate));
          onSuccess && onSuccess(res);
          window.location.reload();
        })
        .catch(err => {
          onFailure && onFailure(err.response && err.response.data);
          dispatch(
            showErrorMessage(
              (err.response && err.response.data) ||
                err.message ||
                "Something went wrong"
            )
          );
          dispatch(authFail());
        });
    };
  }
};

export const registerUser = (user, onStart, onSuccess, onFailure) => {
  if (user) {
    return dispatch => {
      onStart && onStart();

      let url = APIS.register;

      axios
        .post(url, user)
        .then(res => {
          onSuccess && onSuccess(res);
          dispatch(
            showSuccessMessage("Registration completed!, Now you can login")
          );
        })
        .catch(err => {
          onFailure && onFailure(err);

          dispatch(
            showErrorMessage(
              (err.response && err.response.data) ||
                err.message ||
                "Something went wrong"
            )
          );
        });
    };
  }
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL
  };
};

export const authSuccess = (token, expirationDate) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    expirationDate: expirationDate
  };
};

export const checkIfAuth = callBack => {
  const currentToken = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationDate");

  if (
    (currentToken && new Date(expirationDate) < new Date()) ||
    (currentToken && !expirationDate)
  ) {
    return dispatch => {
      dispatch(showErrorMessage("Please Login Again"));
      dispatch(authFail());
      callBack && callBack();
    };
  } else if (!currentToken) {
    return dispatch => {
      dispatch(purgeApp());
      callBack && callBack();
    };
  } else {
    return dispatch => {
      dispatch(authSuccess(currentToken, expirationDate));
    };
  }
};

export const logOutUser = () => {
  return dispatch => {
    dispatch(purgeApp());
  };
};
