import {PURGE, SHOW_MESSAGE} from "./appActionTypes";
import {MESSAGE_TYPES} from "constants/constants";
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
    {method, url, data, actionType, successMsg, onStart, onSuccess, onFailure},
    rest
) => {
    return async dispatch => {
        onStart && onStart();

        return new Promise(resolve => {
            return axios[method](url, data)
                .then(res => {
                    resolve(res);
                    dispatch(dispatchWhenSuccess(actionType, res.data, {...rest}));
                    onSuccess && onSuccess(res);

                    !!successMsg && dispatch(showSuccessMessage(successMsg));
                })
                .catch(err => {
                    dispatch(dispatchWhenFailure(dispatch, actionType, err));
                    onFailure && onFailure(err, {...rest});
                });
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
    const errorObj = err?.response?.data;

    const isValidationError = "One or more validation errors occurred.".includes(errorObj?.title);

    let errMsg = "";

    if (isValidationError) {
        errMsg = Object.keys(errorObj?.errors)
            .map(key => errorObj?.errors[key])
            .flat()
            .join(" ");
    } else {
        errMsg =
            errorObj &&
            typeof errorObj === "object" &&
            Object.keys(errorObj?.errors ?? errorObj).length
                ? errorObj.title ||
                  Object.entries(errorObj)[0][1] ||
                  Object.entries(errorObj.errors)[0][1]
                : null;
    }

    const message = errMsg ?? errorObj?.title ?? errorObj ?? err?.message ?? "Something went wrong";

    dispatch(showErrorMessage(message?.message || message));

    return {
        type: actionType + "_FAILURE",
        ...rest
    };
};
