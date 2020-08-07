import React from "react";
import PropTypes from "prop-types";
import {Grid, makeStyles, Button, Grow, CircularProgress} from "@material-ui/core";

const useStyles = makeStyles({
    actionsContainer: {
        margin: 0
    }
});

export default function CommonModalActions(props) {
    const {isLoading, disabled, onClose, onSave} = props;
    const classes = useStyles(props);

    return (
        <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
            className={classes.actionsContainer}
        >
            <Grid item>
                <Button
                    onClick={onSave && onSave}
                    disabled={disabled || isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                        <Grow in={isLoading} unmountOnExit mountOnEnter>
                            <CircularProgress color="secondary" size={20} />
                        </Grow>
                    }
                >
                    Save
                </Button>
            </Grid>
            <Grid item>
                <Button
                    disabled={isLoading}
                    onClick={onClose && onClose}
                    variant="outlined"
                    color="primary"
                >
                    Close
                </Button>
            </Grid>
        </Grid>
    );
}

CommonModalActions.propTypes = {
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};
