import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/core";
import GeneralStyles from "shared/GeneralStyles";

const useStyles = makeStyles(theme => ({
    ...GeneralStyles
}));

export default function IModal({
    onClose,
    open,
    actions,
    title,
    children,
    modalTitleStyle,
    modalContentStyle,
    modalActionsStyle,
    modalProps,
    disabled
}) {
    let modalActionContainerStyle = {display: "none"};
    const classes = useStyles();

    if (actions) {
        modalActionContainerStyle = null;
    }

    return (
        <Dialog
            className={`${disabled ? classes.disabled : null} ${modalProps?.className}`}
            {...modalProps}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle classes={{...modalTitleStyle}} id="form-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent classes={{...modalContentStyle}}>{children}</DialogContent>
            <DialogActions style={modalActionContainerStyle} classes={{...modalActionsStyle}}>
                {actions}
            </DialogActions>
        </Dialog>
    );
}

IModal.defaultProps = {
    open: false
};

IModal.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    actions: PropTypes.any,
    title: PropTypes.any,
    children: PropTypes.any,
    modalTitleStyle: PropTypes.object,
    modalContentStyle: PropTypes.object,
    modalActionsStyle: PropTypes.object,
    modalProps: PropTypes.object
};
