import { PURGE, SHOW_MESSAGE } from "./appActionTypes";
import { MESSAGE_TYPES } from "constants/constants";
import axios from "axios";

export function purgeApp(params) {
  return dispatch => {
    dispatch({
      type: PURGE
    });
  };
}

export function showMessage(message) {
  return dispatch => {
    dispatch({
      type: SHOW_MESSAGE,
      message
    });
  };
}

export function showErrorMessage(message) {
  return dispatch => {
    dispatch({
      type: SHOW_MESSAGE,
      message: {
        type: MESSAGE_TYPES.error,
        text: message
      }
    });
  };
}

export function showSuccessMessage(message) {
  return dispatch => {
    dispatch({
      type: SHOW_MESSAGE,
      message: {
        type: MESSAGE_TYPES.success,
        text: message
      }
    });
  };
}

export function deleteMessage() {
  return dispatch => {
    dispatch({
      type: SHOW_MESSAGE,
      message: null
    });
  };
}

export const apiCaller = (
  { method, url, data, actionType, successMsg, onStart, onSuccess, onFailure },
  rest
) => {
  return dispatch => {
    onStart && onStart();

    axios[method](url, data)
      .then(res => {
        dispatch(dispatchWhenSuccess(actionType, res.data, { ...rest }));
        onSuccess && onSuccess(res);

        !!successMsg && dispatch(showSuccessMessage(successMsg));
      })
      .catch(err => {
        dispatch(dispatchWhenFailure(dispatch, actionType, err));
        onFailure && onFailure(err, { ...rest });
      });
  };
};

const dispatchWhenSuccess = (actionType, data, rest) => {
  return {
    type: actionType + "_SUCCESS",
    data: data,
    ...rest
  };
};

const dispatchWhenFailure = (dispatch, actionType, err, rest) => {
  dispatch(
    showErrorMessage(
      (err && err.response && err.response.data && err.response.data.title) ||
        err.response.data ||
        "Something went wrong"
    )
  );

  return {
    type: actionType + "_FAILURE",
    ...rest
  };
};
