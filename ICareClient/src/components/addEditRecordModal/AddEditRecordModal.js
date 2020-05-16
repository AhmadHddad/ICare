import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IModal from "../modal/IModal";
import {
  Grid,
  TextField,
  Button,
  Grow,
  CircularProgress,
  makeStyles,
  InputAdornment
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
  callAddNewRecord,
  callUpdateRecord
} from "store/actions/records/recordsActions";
import { toggle } from "utils/utils";

const toggleObj = {
  dataLoading: "dataLoading",
  savingLoader: "savingLoader"
};

const useStyles = makeStyles({
  actionsContainer: {
    margin: 0
  },
  paperModal: {
    maxWidth: 700
  }
});

export default function AddEditRecordModal({
  dispatch,
  recordToEdit,
  patientId,
  open,
  onClose,
  onSave
}) {
  const { handleSubmit, control, errors, setValue } = useForm();
  const [isLoading, setLoading] = useState({
    [toggleObj.dataLoading]: false,
    [toggleObj.savingLoader]: false
  });
  const classes = useStyles();

  let isEdit = !!recordToEdit;

  const setRecordValues = data => {
    setValue("diseaseName", data.diseaseName || "");
    setValue("description", data.description || "");
    setValue("bill", data.bill || "");
    setValue("timeOfEntry", data.timeOfEntry || "");
  };

  useEffect(() => {
    if (isEdit) {
      setTimeout(() => setRecordValues(recordToEdit));
    }
  }, [isEdit]);

  const saveRecord = record => {
    const AddSuccess = ({ data }) => {
      toggle(toggleObj.savingLoader, isLoading, setLoading)();
      onSave && onSave(data, isEdit);
    };
    if (isEdit) {
      dispatch(
        callUpdateRecord(
          { ...record, id: recordToEdit.id, patientId },
          toggle(toggleObj.savingLoader, isLoading, setLoading),
          AddSuccess,
          toggle(toggleObj.savingLoader, isLoading, setLoading)
        )
      );
    } else {
      dispatch(
        callAddNewRecord(
          { ...record, patientId },
          toggle(toggleObj.savingLoader, isLoading, setLoading),
          AddSuccess,
          toggle(toggleObj.savingLoader, isLoading, setLoading)
        )
      );
    }
  };

  const renderFields = () => (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item md={4} sm={4} xs={12}>
        <Controller
          as={
            <TextField
              error={!!errors.diseaseName}
              fullWidth
              id="outlined-basic"
              label={
                (errors.diseaseName && "Dieses name is required") ||
                "Dieses Name"
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
          name="diseaseName"
          control={control}
          defaultValue=""
        />
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Controller
          as={
            <KeyboardDatePicker
              autoOk
              fullWidth
              maxDate={new Date()}
              format="DD/MM/YYYY"
              variant="inline"
              inputVariant="outlined"
              label={"Time Of Entry"}
            />
          }
          defaultValue={new Date()}
          name="timeOfEntry"
          control={control}
        />
      </Grid>
      <Grid item md={4} sm={4} xs={12}>
        <Controller
          as={
            <TextField
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>
              }}
              error={!!errors.bill}
              fullWidth
              id="outlined-basic"
              label={
                (errors.bill && "Bill amount is required") || "Bill Amount"
              }
              variant="outlined"
            />
          }
          defaultValue=""
          rules={{
            required: true,
            validate: value => value == Number(value)
          }}
          name="bill"
          control={control}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Controller
          as={
            <TextField
              multiline
              fullWidth
              id="outlined-basic"
              label={"Description"}
              variant="outlined"
            />
          }
          defaultValue=""
          name="description"
          control={control}
        />
      </Grid>
    </Grid>
  );

  const renderActions = () => (
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
          disabled={Object.values(isLoading).every(Boolean)}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={
            <Grow in={isLoading.savingLoader} unmountOnExit mountOnEnter>
              <CircularProgress color="secondary" size={20} />
            </Grow>
          }
        >
          Save
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={isLoading.savingLoader}
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
        disabled={Object.values(isLoading).every(Boolean)}
        modalTitle={isEdit ? "Edit Record" : "Add Record"}
        open={open}
        modalProps={{
          fullWidth: true
        }}
        modalRootStyle={{ paper: classes.paperModal }}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(saveRecord)}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid
              spacing={2}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {renderFields()}
              {renderActions()}
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </IModal>
    </React.Fragment>
  );
}

AddEditRecordModal.propTypes = {
  dispatch: PropTypes.func,
  patientIdToEdit: PropTypes.number,
  patientToEdit: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func
};
