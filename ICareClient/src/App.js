import React, {Suspense, useEffect, Fragment, useState, useCallback} from "react";
import {connect} from "react-redux";
import {Route, Redirect, Switch, withRouter} from "react-router-dom";

import router, {loginPage} from "./router/routs";

import Layout from "./containers/layout/Layout.js";

import {checkIfAuth} from "store/actions/auth/authActions.js";

import {Snackbar} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import {deleteMessage, purgeApp} from "store/actions/app/appActions";

function App({dispatch, isAuthenticated, message, history, userName}) {
    const [openSnackbar, setSnackbar] = useState(false);

    const routs = router.map(rout => (
        <Route key={rout.id} path={rout.path} exact component={rout.component} />
    ));

    const redirectToLogin = useCallback(_ => history.replace(loginPage.path), [history]);

    useEffect(() => {
        dispatch(checkIfAuth(() => redirectToLogin()));
    }, [dispatch, history, redirectToLogin]);

    useEffect(() => {
        if (message?.text) {
            toggleSnackbar(true)();
        }
    }, [message]);

    const toggleSnackbar = state => event => {
        setSnackbar(state);
        if (!state) {
            setTimeout(() => {
                dispatch(deleteMessage());
            }, 500);
        }
    };

    const renderSnackbar = () => {
        const vertical = "top",
            horizontal = "right";

        return (
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                open={openSnackbar}
                autoHideDuration={2500}
                onExited={toggleSnackbar(false)}
                onClose={toggleSnackbar(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={toggleSnackbar(false)}
                    severity={message?.type || ""}
                >
                    {message?.text || ""}
                </MuiAlert>
            </Snackbar>
        );
    };

    const onLogout = () => {
        localStorage.clear();
        dispatch(purgeApp());
        redirectToLogin();
    };

    if (isAuthenticated) {
        const mainPage = router.find(r => r.isMain === true);
        return (
            <Fragment>
                {renderSnackbar()}
                <Layout onLogout={onLogout} currentUser={userName}>
                    <Suspense fallback={<div>Loading ...</div>}>
                        <Switch>
                            {routs}
                            <Redirect to={mainPage.path} />
                        </Switch>
                    </Suspense>
                </Layout>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                {renderSnackbar()}
                <Suspense fallback={<div>Loading ...</div>}>
                    <Switch>
                        <Route path={loginPage.path} exact component={loginPage.component} />
                    </Switch>
                </Suspense>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        message: state.appReducer.message,
        userName: state.authReducer.userName
    };
};

export default withRouter(connect(mapStateToProps)(App));
