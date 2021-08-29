import React, {Suspense, useEffect, Fragment, useState, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Redirect, Switch, useHistory} from "react-router-dom";

// Material UI
import MuiAlert from "@material-ui/lab/Alert";
import {Snackbar} from "@material-ui/core";

// Routs
import router, {loginPage} from "router/routs";

// Components
import Layout from "containers/layout/Layout";

// Actions
import {checkIfAuth} from "store/actions/auth/authActions";
import {deleteMessage, purgeApp} from "store/actions/app/appActions";

export default function App(props) {
    //#region State
    const [openSnackbar, setSnackbar] = useState(false);
    //#endregion State

    //#region Hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuthenticated, message, userName} = useSelector(state => ({
        isAuthenticated: state.authReducer.token !== null,
        message: state.appReducer.message,
        userName: state.authReducer.userName
    }));
    //#endregion Hooks

    const redirectToLogin = useCallback(_ => history.replace(loginPage.path), [history]);

    const toggleSnackbar = useCallback(toggleSnackbarFunc, []);

    //#region LifeCycle
    useEffect(() => {
        dispatch(checkIfAuth(() => redirectToLogin()));
    }, [dispatch, history, redirectToLogin]);

    useEffect(() => {
        if (message?.text) {
            toggleSnackbar(true)();
        }
    }, [message, toggleSnackbar]);

    //#endregion LifeCycle

    //#region Other Functions
    function toggleSnackbarFunc(state) {
        return function () {
            setSnackbar(state);
            if (!state) {
                setTimeout(() => {
                    dispatch(deleteMessage());
                }, 500);
            }
        };
    }

    function onLogout() {
        localStorage.clear();
        dispatch(purgeApp());
        redirectToLogin();
    }

    //#endregion Other Functions

    //#region Rendering Functions
    const renderSnackbar = () => {
        const vertical = "top",
            horizontal = "right";

        return (
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                key={`${vertical},${horizontal}`}
                open={openSnackbar}
                autoHideDuration={1500}
                TransitionProps={{
                    unmountOnExit:true,
                    onExit:toggleSnackbar(false)
                }}
                onClose={toggleSnackbar(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={toggleSnackbar(false)}
                    severity={message?.type || "info"}
                >
                    {message?.text || ""}
                </MuiAlert>
            </Snackbar>
        );
    };
    //#endregion Other Functions

    const routs = router.map(rout => (
        <Route key={rout.id} path={rout.path} exact component={rout.component} />
    ));

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
