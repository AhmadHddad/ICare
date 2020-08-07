import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import IModal from "common/modal/IModal";
import {Grid, TextField, Button, Grow, CircularProgress, makeStyles} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {
    callGetPatientById,
    callAddNewPatient,
    callEditPatient
} from "store/actions/patients/patientsActions";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";
import {REGEX} from "constants/constants";
import {toggle} from "utils/utils";
import {Skeleton} from "@material-ui/lab";

const toggleObj = {
    dataLoader: "dataLoader",
    savingLoader: "savingLoader"
};

const useStyles = makeStyles({
    actionsContainer: {
        margin: 0
    },
    skeleton: {
        borderRadius: 10
    }
});

export default function AddEditPatientModal({
    dispatch,
    patientIdToEdit,
    patientToEdit,
    open,
    onClose,
    onSave
}) {
    // ----------------------- //
    const {handleSubmit, control, errors, setValue} = useForm();
    const [isLoading, setLoading] = useState({
        dataLoader: false,
        savingLoader: false
    });
    const classes = useStyles();

    let isEdit = !!patientToEdit || !!patientIdToEdit;

    const setPatientValues = data => {
        setValue("dateOfBirth", data.dateOfBirth || "");
        setValue("name", data.name || "ssss");
        setValue("email", data.email || "");
        setValue("officialId", data.officialId || "");
    };

    useEffect(() => {
        if (!!patientIdToEdit) {
            const onSuccess = ({data}) => {
                toggle(toggleObj.dataLoader, isLoading, setLoading)();
                setTimeout(() => setPatientValues(data));
            };
            dispatch(
                callGetPatientById(
                    patientIdToEdit,
                    toggle(toggleObj.dataLoader, isLoading, setLoading),
                    onSuccess,
                    toggle(toggleObj.dataLoader, isLoading, setLoading)
                )
            );
        }
    }, [patientIdToEdit, open]);

    useEffect(() => {
        if (patientToEdit && Object.keys(patientToEdit).length) {
            setTimeout(() => setPatientValues(patientToEdit));
        }
    }, [patientToEdit, open]);

    const savePatient = patient => {
        const AddSuccess = ({data}) => {
            toggle(toggleObj.savingLoader, isLoading, setLoading)();
            onSave && onSave(data);
        };
        if (isEdit) {
            dispatch(
                callEditPatient(
                    {...patient, id: patientIdToEdit || patientToEdit.id},
                    toggle(toggleObj.savingLoader, isLoading, setLoading),
                    AddSuccess,
                    toggle(toggleObj.savingLoader, isLoading, setLoading)
                )
            );
        } else {
            dispatch(
                callAddNewPatient(
                    patient,
                    toggle(toggleObj.savingLoader, isLoading, setLoading),
                    AddSuccess,
                    toggle(toggleObj.savingLoader, isLoading, setLoading)
                )
            );
        }
    };

    const renderFields = () => (
        <Grid item container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item md={6} sm={6} xs={12}>
                <Controller
                    as={
                        <TextField
                            error={!!errors.name}
                            fullWidth
                            id="outlined-basic"
                            label={(errors.name && "Patient name is required") || "Patient Name"}
                            variant="outlined"
                        />
                    }
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                        validate: v => v.trim().length > 2
                    }}
                    name="name"
                    control={control}
                    defaultValue=""
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Controller
                    as={
                        <KeyboardDatePicker
                            autoOk
                            fullWidth
                            error={!!errors.dateOfBirth}
                            maxDate={new Date()}
                            format="DD/MM/YYYY"
                            variant="inline"
                            inputVariant="outlined"
                            label={
                                (errors.dateOfBirth && "Date Of Birth is required") ||
                                "Patient Date Of Birth"
                            }
                        />
                    }
                    rules={{
                        required: true
                    }}
                    defaultValue={new Date()}
                    name="dateOfBirth"
                    control={control}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Controller
                    as={
                        <TextField
                            disabled={isEdit}
                            error={!!errors.officialId}
                            fullWidth
                            id="outlined-basic"
                            label={
                                (errors.officialId && "Official ID must be 9 digits") ||
                                "Official ID"
                            }
                            variant="outlined"
                        />
                    }
                    defaultValue=""
                    rules={{
                        required: true,
                        minLength: 9,
                        maxLength: 9,
                        pattern: REGEX.number
                    }}
                    name="officialId"
                    control={control}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Controller
                    as={
                        <TextField
                            error={!!errors.email}
                            fullWidth
                            id="outlined-basic"
                            label={(errors.email && "Must be Email") || "Patient Email"}
                            variant="outlined"
                        />
                    }
                    defaultValue=""
                    rules={{
                        pattern: REGEX.email
                    }}
                    name="email"
                    control={control}
                />
            </Grid>
        </Grid>
    );

    const renderSkeleton = () => (
        <Grid item container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item md={6} sm={6} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={72}
                    animation="wave"
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={72}
                    animation="wave"
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={72}
                    animation="wave"
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={72}
                    animation="wave"
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
                    disabled={isLoading.savingLoader}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={
                        <Grow in={isLoading.savingLoader} unmountOnExit mountOnEnter>
                            <CircularProgress size={20} color="secondary" />
                        </Grow>
                    }
                >
                    Save
                </Button>
            </Grid>
            <Grid item>
                <Button
                    disabled={Object.values(isLoading).every(Boolean)}
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
                title={isEdit ? "Edit Patient" : "Add Patient"}
                open={open}
                modalProps={{
                    fullWidth: true
                }}
                onClose={onClose}
            >
                <form onSubmit={handleSubmit(savePatient)}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid
                            spacing={2}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            {isLoading.dataLoader ? renderSkeleton() : renderFields()}
                            {renderActions()}
                        </Grid>
                    </MuiPickersUtilsProvider>
                </form>
            </IModal>
        </React.Fragment>
    );
}

AddEditPatientModal.propTypes = {
    dispatch: PropTypes.func,
    patientIdToEdit: PropTypes.number,
    patientToEdit: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func
};
