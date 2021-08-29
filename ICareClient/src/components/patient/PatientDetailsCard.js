import React from "react";
import PropTypes from "prop-types";
import {
    Grid,
    TextField,
    Button,
    Card,
    Typography,
    CardContent,
    makeStyles
} from "@material-ui/core";

import DetailsIcon from "@material-ui/icons/Details";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },

    patientDetailsText: {
        marginBottom: 20
    },
    icon: {
        verticalAlign: "middle",
        marginBottom: 3,
        marginLeft: 5
    },
    skeleton: {
        borderRadius: 10
    }
});

export default function PatientDetailsCard({patientDetails, onEdit, isLoading}) {
    const classes = useStyles();

    const renderPatientDetailsFields = () => (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} md={6} sm={6}>
                <TextField
                    disabled
                    fullWidth
                    value={patientDetails.name}
                    id="outlined-basic"
                    label={"Patient Name"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
                <TextField
                    disabled
                    fullWidth
                    value={new Date(patientDetails.dateOfBirth).toLocaleDateString()}
                    id="outlined-basic"
                    label={"Date Of Birth"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
                <TextField
                    disabled
                    fullWidth
                    value={patientDetails.officialId}
                    id="outlined-basic"
                    label={"Official ID"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
                <TextField
                    disabled
                    fullWidth
                    value={patientDetails.email}
                    id="outlined-basic"
                    label={"Email"}
                    variant="standard"
                />
            </Grid>
        </Grid>
    );

    const renderSkeleton = () => (
        <Grid item container direction="row" justifyContent="center" alignItems="center" spacing={2}>
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

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
                    <Grid item>
                        <Typography
                            className={classes.patientDetailsText}
                            variant="h5"
                            gutterBottom
                            component="h2"
                            color="textSecondary"
                        >
                            Patient Details
                            <DetailsIcon className={classes.icon} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isLoading}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={onEdit}
                        >
                            Edit
                        </Button>
                    </Grid>
                </Grid>
                {isLoading ? renderSkeleton() : renderPatientDetailsFields()}
            </CardContent>
        </Card>
    );
}

PatientDetailsCard.propTypes = {
    patientDetails: PropTypes.object,
    onEdit: PropTypes.func,
    isLoading: PropTypes.bool
};
