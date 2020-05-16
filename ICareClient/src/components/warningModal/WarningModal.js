import React from "react";
import PropTypes from "prop-types";
import IModal from "components/modal/IModal";

import {
  Button,
  Grid,
  CircularProgress,
  Grow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";

import GeneralStyles from "shared/GeneralStyles";

const useStyles = makeStyles(theme => ({
  ...GeneralStyles(),
}));

export default function WarningModal({
  open,
  onClose,
  message,
  isLoading,
  onOk,
  componentId,
}) {
  const classes = useStyles();

  const onOkClick = () => {
    onOk && onOk(componentId);
  };

  const renderModalActions = () => (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Button
          onClick={onOkClick}
          disabled={isLoading}
          type="submit"
          variant="contained"
          color="secondary"
          startIcon={
            <Grow in={isLoading} unmountOnExit mountOnEnter>
              <CircularProgress size={20} />
            </Grow>
          }
        >
          Ok
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={isLoading}
          onClick={onClose}
          type="submit"
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <IModal
      modalProps={{
        fullWidth: true,
      }}
      open={open}
      onClose={onClose}
      modalTitle={<strong>Warning !</strong>}
      modalActions={renderModalActions()}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={12} xs={12} className={classes.textAlignCenter}>
          <WarningIcon color="error" fontSize="large" />
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography variant="h5" className={classes.textAlignCenter}>
            <strong>{message}</strong>
          </Typography>
        </Grid>
      </Grid>
    </IModal>
  );
}

WarningModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  isLoading: PropTypes.bool,
  onOk: PropTypes.func,
  componentId: PropTypes.any,
};
