import React, {useState} from "react";
import {
    Grid,
    Typography,
    Button,
    TextField,
    withStyles,
    Switch,
    Grow,
    CircularProgress
} from "@material-ui/core";
import IModal from "../../common/modal/IModal";
import SystemLogo from "../../components/logo/SystemLogo";
import {useForm, Controller} from "react-hook-form";
import LoginStyle from "./LoginStyle";
import {connect} from "react-redux";
import {logInUser, registerUser} from "../../store/actions/auth/authActions";
import {REGEX} from "constants/constants";

function LoginAndRegister({classes, dispatch}) {
    const {handleSubmit, control, errors} = useForm();
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const onSubmit = data => {
        if (isRegister) {
            dispatch(registerUser(data, toggleLoading, toggleLoading, toggleLoading));
        } else {
            dispatch(logInUser(data, toggleLoading, toggleLoading, toggleLoading));
        }
    };

    const toggleLoading = () => {
        setLoading(prev => !prev);
    };

    const renderLoginContent = () => (
        <Grid container>
            <Grid item container justify="center">
                <Grid item xs={12}>
                    <SystemLogo rootStyle={classes.logo} />
                </Grid>
                <Grid item xs={12} container justify="center">
                    <Typography className={classes.logoText}>ICare</Typography>
                </Grid>
            </Grid>
            <Grid
                className={classes.inputsContainer}
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grow in={isRegister} unmountOnExit>
                    <Grid item md={12} xs={12}>
                        <Controller
                            as={
                                <TextField
                                    error={!!errors.userName}
                                    fullWidth
                                    id="outlined-basic"
                                    label={
                                        (errors.userName && "User name is required") || "User Name"
                                    }
                                    variant="outlined"
                                />
                            }
                            rules={{
                                required: true,
                                minLength: 3,
                                maxLength: 20,
                                validate: v => v.trim().length > 2
                            }}
                            defaultValue=""
                            name="userName"
                            control={control}
                        />
                    </Grid>
                </Grow>

                <Grid item md={12} xs={12}>
                    <Controller
                        as={
                            <TextField
                                error={!!errors.email}
                                fullWidth
                                id="outlined-basic"
                                label={(errors.email && "Email is required") || "Email"}
                                variant="outlined"
                            />
                        }
                        rules={{
                            required: true,
                            pattern: REGEX.email
                        }}
                        defaultValue=""
                        name="email"
                        control={control}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Controller
                        as={
                            <TextField
                                type="password"
                                error={!!errors.password}
                                fullWidth
                                id="outlined-basic"
                                label={
                                    (errors.password && "Password must be at least 8") || "Password"
                                }
                                variant="outlined"
                            />
                        }
                        rules={{
                            required: true,
                            minLength: 6,
                            maxLength: 16
                        }}
                        defaultValue=""
                        name="password"
                        control={control}
                    />
                </Grid>
            </Grid>
        </Grid>
    );

    const renderHeader = () => {
        return (
            <Grid container spacing={1}>
                <Grid item>
                    <Typography className={classes.loginRegister}>Sign In</Typography>
                    <Switch
                        disabled={isLoading}
                        onChange={setRegisterState}
                        classes={{switchBase: classes.switchBase}}
                        variant={"contained"}
                        value={isRegister}
                        color="primary"
                    />
                    <Typography className={classes.loginRegister}>Register</Typography>
                </Grid>
            </Grid>
        );
    };

    const setRegisterState = e => {
        setIsRegister(e.target.checked);
    };

    const renderActions = () => (
        <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            color="primary"
            startIcon={
                <Grow in={isLoading} unmountOnExit mountOnEnter>
                    <CircularProgress size={20} />
                </Grow>
            }
        >
            {isRegister ? "Register" : "Login"}
        </Button>
    );
    return (
        <React.Fragment>
            <IModal
                modalProps={{fullWidth: true}}
                open
                title={renderHeader()}
                modalActionsStyle={{root: classes.actions}}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    {renderLoginContent()}
                    <Grid container className={classes.actions}>
                        <Grid item>{renderActions()}</Grid>
                    </Grid>
                </form>
            </IModal>
        </React.Fragment>
    );
}

export default connect()(withStyles(LoginStyle)(LoginAndRegister));
