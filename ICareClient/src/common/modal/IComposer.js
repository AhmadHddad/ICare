import React from "react";
import PropTypes from "prop-types";
import IModal from "./IModal";
import {Grid, Button, Grow, CircularProgress, makeStyles} from "@material-ui/core";

import GeneralStyles from "../../shared/GeneralStyles";

const useStyles = makeStyles({
    ...GeneralStyles
});

export default function IComposer({
    open,
    onClose,
    disabled,
    isLoading,
    isSaving,
    title,
    children,
    onSubmit,
    modalProps
}) {
    // ----------------------- //
    const classes = useStyles();

    const renderActions = () => (
        <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.removeMargin}
        >
            <Grid item>
                <Button
                    disabled={isSaving}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                        <Grow in={isSaving} unmountOnExit mountOnEnter>
                            <CircularProgress size={20} color="secondary" />
                        </Grow>
                    }
                >
                    Save
                </Button>
            </Grid>
            <Grid item>
                <Button
                    disabled={isSaving || isLoading || disabled}
                    onClick={onClose}
                    variant="outlined"
                    color="primary"
                >
                    Close
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <React.Fragment>
            <IModal
                disabled={disabled || isLoading}
                title={title}
                open={open}
                modalProps={{
                    fullWidth: true
                }}
                onClose={onClose}
                {...modalProps}
            >
                <form onSubmit={onSubmit}>
                    <Grid
                        spacing={2}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {children}
                        {renderActions()}
                    </Grid>
                </form>
            </IModal>
        </React.Fragment>
    );
}

IComposer.propTypes = {
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    disabled: PropTypes.bool,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.any,
    onSubmit: PropTypes.func
};
