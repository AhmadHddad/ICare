import React, {useState} from "react";
import PropTypes from "prop-types";
import IComposer from "components/modal/IComposer";
import {useForm, Controller} from "react-hook-form";
import {Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {REGEX} from "constants/constants";
import MomentUtils from "@date-io/moment";
import {callAddDoctor} from "store/actions/doctors/doctorsActions";
import {toggle} from "utils/utils";

// Constants
const toggleNames = {
    savingLoader: "savingLoader"
};

export default function DoctorComposer({dispatch, isEdit, onClose, onSaveSuccess, open}) {
    const {handleSubmit, control, errors, setValue} = useForm();

    const [flags, setFlags] = useState({
        [toggleNames.savingLoader]: false
    });

    function renderFields() {
        return (
            <Grid item container direction="row" justify="center" alignItems="center" spacing={2}>
                <Grid item md={6} sm={6} xs={12}>
                    <Controller
                        as={
                            <TextField
                                error={!!errors.name}
                                fullWidth
                                id="outlined-basic"
                                label={(errors.name && "Doctor name is required") || "Doctor Name"}
                                variant="outlined"
                            />
                        }
                        rules={{
                            required: true,
                            minLength: 3,
                            maxLength: 20,
                            validate: (v) => v.trim().length > 2
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
                                    "Doctor Date Of Birth"
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
                                label={(errors.email && "Must be Email") || "Doctor Email"}
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
                <Grid item md={6} sm={6} xs={12}>
                    <Controller
                        as={
                            <TextField
                                error={!!errors.specialty}
                                fullWidth
                                id="outlined-basic"
                                label={
                                    (errors.specialty && "Specialty is Required") ||
                                    "Doctor Specialty"
                                }
                                variant="outlined"
                            />
                        }
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        name="specialty"
                        control={control}
                    />
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                    <Controller
                        as={
                            <TextField
                                error={!!errors.university}
                                fullWidth
                                id="outlined-basic"
                                label={
                                    (errors.university && "University is Required") ||
                                    "Doctor University"
                                }
                                variant="outlined"
                            />
                        }
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        name="university"
                        control={control}
                    />
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <Controller
                        as={
                            <TextField
                                error={!!errors.department}
                                fullWidth
                                id="outlined-basic"
                                label={
                                    (errors.department && "Department is Required") ||
                                    "Doctor Department"
                                }
                                variant="outlined"
                            />
                        }
                        defaultValue=""
                        rules={{
                            required: true
                        }}
                        name="department"
                        control={control}
                    />
                </Grid>
            </Grid>
        );
    }

    function onSave(data) {
        dispatch(
            callAddDoctor(
                data,
                toggle(toggleNames.savingLoader, flags, setFlags),
                onSaveSuccess && onSaveSuccess,
                toggle(toggleNames.savingLoader, flags, setFlags)
            )
        );
    }

    return (
        <IComposer
            open={open}
            isSaving={flags[toggleNames.savingLoader]}
            onSubmit={handleSubmit(onSave)}
            onClose={onClose}
        >
            <MuiPickersUtilsProvider utils={MomentUtils}>{renderFields()}</MuiPickersUtilsProvider>
        </IComposer>
    );
}

DoctorComposer.propTypes = {
    dispatch: PropTypes.func,
    isEdit: PropTypes.bool,
    onClose: PropTypes.func,
    onSaveSuccess: PropTypes.func,
    open: PropTypes.bool
};
