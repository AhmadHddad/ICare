import React from "react";
import PropTypes from "prop-types";
import {Grid} from "@material-ui/core";
import ITextField from "components/iTextField/ITextField";
import IDatePicker from "components/iDatePicker/IDatePicker";
import {REGEX} from "constants/constants";

const propTypes = {
    control: PropTypes.any,
    errors: PropTypes.object,
    disabled: PropTypes.object
};

export default function DoctorDetailsFields({control, errors, disabled}) {
    return (
        <Grid item container direction="row" justify="center" alignItems="center" spacing={2}>
            <Grid item md={6} sm={6} xs={12}>
                <ITextField
                    disabled={disabled?.name}
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                        validate: v => v.trim().length > 2
                    }}
                    name="name"
                    control={control}
                    error={!!errors?.name}
                    id="outlined-basic"
                    label={(errors?.name && "Doctor name is required") || "Doctor Name"}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <IDatePicker
                    disabled={disabled?.dateOfBirth}
                    name="dateOfBirth"
                    control={control}
                    rules={{
                        required: true
                    }}
                    error={!!errors?.dateOfBirth}
                    label={
                        (errors?.dateOfBirth && "Date Of Birth is required") ||
                        "Doctor Date Of Birth"
                    }
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <ITextField
                    disabled={disabled?.officialId}
                    rules={{
                        required: true,
                        minLength: 9,
                        maxLength: 9,
                        pattern: REGEX.number
                    }}
                    name="officialId"
                    control={control}
                    error={!!errors?.officialId}
                    label={(errors?.officialId && "Official ID must be 9 digits") || "Official ID"}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <ITextField
                    disabled={disabled?.email}
                    rules={{
                        pattern: REGEX.email
                    }}
                    name="email"
                    control={control}
                    error={!!errors?.email}
                    label={(errors?.email && "Must be Email") || "Doctor Email (optional)"}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <ITextField
                    disabled={disabled?.specialty}
                    rules={{
                        required: true
                    }}
                    name="specialty"
                    control={control}
                    error={!!errors?.specialty}
                    label={(errors?.specialty && "Specialty is Required") || "Doctor Specialty"}
                />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
                <ITextField
                    disabled={disabled?.university}
                    rules={{
                        required: true
                    }}
                    name="university"
                    control={control}
                    error={!!errors?.university}
                    label={(errors?.university && "University is Required") || "Doctor University"}
                />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <ITextField
                    disabled={disabled?.department}
                    rules={{
                        required: true
                    }}
                    name="department"
                    control={control}
                    error={!!errors?.department}
                    label={(errors?.department && "Department is Required") || "Doctor Department"}
                />
            </Grid>
        </Grid>
    );
}

DoctorDetailsFields.propTypes = propTypes;
