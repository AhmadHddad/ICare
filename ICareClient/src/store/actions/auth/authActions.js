import axios from "axios";
import * as actionTypes from "./authActionsTypes";
import {
    purgeApp,
    showErrorMessage,
    showSuccessMessage,
    dispatchWhenFailure
} from "../app/appActions";
import {APIS} from "../../../constants/constants";

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
                    localStorage.setItÍem("expirationDate", expirationDate);
                    dispatch(authSuccess(response.token, expirationDate));
                    onSuccess && onSuccess(res);
                    window.location.reload();
                })
                .catch(err => {
                    onFailure && onFailure(err.response && err.response.data);
                    dispatchWhenFailure(dispatch, actionTypes.LOGIN, err);
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
                    dispatch(showSuccessMessage("Registration completed!, Now you can login"));
                })
                .catch(err => {
                    onFailure && onFailure(err);
                    dispatchWhenFailure(dispatch, actionTypes.REGISTER, err);
        
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
