import React from "react";
import PropTypes from "prop-types";
import ICTable from "common/table/ICTable";
import {Card, CardContent, Typography, Grid, TextField, makeStyles} from "@material-ui/core";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import {Skeleton} from "@material-ui/lab";
import GeneralStyles from "shared/GeneralStyles";

const useStyles = makeStyles(theme => ({
    ...GeneralStyles,
    tableContainer: {
        marginTop: 10
    },
    removePaperEffect: {
        boxShadow: "none",
        border: "1px solid whitesmoke"
    },
    paperProps: {
        minHeight: 30
    },
    skeleton: {
        borderRadius: 10
    }
}));

export default function PatientStatistics({patientRecords, statistics, isLoading}) {
    const {
        avrageOfBills,
        avrageOfBillsWithoutOutlier,
        age,
        fivethRecord,
        patientsWithSimilarDiseases,
        higitesVistsMonth
    } = statistics;

    ///------///
    const classes = useStyles();
    const fifthRec = (fivethRecord && [fivethRecord]) || [];
    const renderRowsFifthRecord = () =>
        (fifthRec &&
            fifthRec.length &&
            fifthRec.map(li => ({
                id: li.id,
                cells: [
                    {
                        component: li.diseaseName
                    },
                    {
                        component: new Date(li.timeOfEntry).toLocaleDateString()
                    },
                    {
                        component: li.bill + "$"
                    },
                    {
                        component: renderDesc(li.description, false)
                    }
                ],
                collapseRow: {component: renderDesc(li.description, true)}
            }))) ||
        [];

    const renderTableRows = () =>
        (patientsWithSimilarDiseases &&
            patientsWithSimilarDiseases.length &&
            patientsWithSimilarDiseases.map(li => ({
                id: li.id,
                cells: [
                    {
                        component: li.name
                    },
                    {
                        component: new Date(li.dateOfBirth).toLocaleDateString()
                    },
                    {
                        component: li.email
                    },
                    {
                        component: li.officialId
                    }
                ]
            }))) ||
        [];

    const renderDesc = (desc, showAll) => (
        <Typography
            color="textPrimary"
            className={`${!showAll && classes.desc} ${showAll && classes.expandedDesc}`}
        >
            {(desc.length && desc) || "No Description"}
        </Typography>
    );

    const renderPatientDetailsFields = () => (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={12} md={3} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    value={age}
                    id="outlined-basic"
                    label={"Age"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    value={avrageOfBills && avrageOfBills.toLocaleString()}
                    id="outlined-basic"
                    label={"Average of bills"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    value={avrageOfBillsWithoutOutlier}
                    id="outlined-basic"
                    label={"Average without outliers"}
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} md={3} sm={3}>
                <TextField
                    disabled
                    fullWidth
                    value={higitesVistsMonth}
                    id="outlined-basic"
                    label={"Highest visits month"}
                    variant="standard"
                />
            </Grid>
        </Grid>
    );

    const renderSkeleton = () => (
        <Grid
            item
            sm={12}
            xs={12}
            md={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item md={3} sm={3} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={50}
                    animation="wave"
                />
            </Grid>
            <Grid item md={3} sm={3} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={50}
                    animation="wave"
                />
            </Grid>
            <Grid item md={3} sm={3} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={50}
                    animation="wave"
                />
            </Grid>
            <Grid item md={3} sm={3} xs={12}>
                <Skeleton
                    className={classes.skeleton}
                    variant="rect"
                    width={"100%"}
                    height={50}
                    animation="wave"
                />
            </Grid>
        </Grid>
    );

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid
                        item
                        md={12}
                        xs={12}
                        sm={12}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Typography
                            className={classes.patientDetailsText}
                            variant="h5"
                            gutterBottom
                            component="h2"
                            color="textSecondary"
                        >
                            Patient Statistics
                            <TrendingUpIcon className={classes.icon} />
                        </Typography>
                    </Grid>

                    {isLoading ? renderSkeleton() : renderPatientDetailsFields()}
                    <Grid
                        item
                        md={12}
                        xs={12}
                        sm={12}
                        className={`${classes.removeSidePadding} ${classes.tableContainer}`}
                    >
                        <Typography className={classes.heading}>Patient 5th Record</Typography>
                        <ICTable
                            isLoading={isLoading}
                            hover
                            addCollapse={true}
                            emptyView={<strong>No Record</strong>}
                            headers={["Disease Name", "Time of Entry", "Bill", "Description"]}
                            rows={(renderRowsFifthRecord && renderRowsFifthRecord()) || []}
                            tableContainerProps={{classes: {root: classes.removePaperEffect}}}
                            paperProps={{
                                classes: {
                                    root: `${classes.removePaperEffect} ${classes.paperProps}`
                                }
                            }}
                        />
                    </Grid>
                    <Grid
                        className={`${classes.removeSidePadding} ${classes.tableContainer}`}
                        item
                        md={12}
                        xs={12}
                        sm={12}
                    >
                        <Typography className={classes.heading}>
                            Patients with similar diseases
                        </Typography>
                        <ICTable
                            isLoading={isLoading}
                            emptyView={<strong>No Patients</strong>}
                            headers={["Patient Name", "Date Of Birth", "Email", "Official ID"]}
                            rows={renderTableRows()}
                            tableContainerProps={{classes: {root: classes.removePaperEffect}}}
                            paperProps={{classes: {root: classes.removePaperEffect}}}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

PatientStatistics.propTypes = {
    statistics: PropTypes.object,
    classes: PropTypes.object,
    isLoading: PropTypes.bool
};
