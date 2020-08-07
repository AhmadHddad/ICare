import React from "react";
import PropTypes from "prop-types";
import ITable from "common/table/ITable";
import {
    Card,
    CardContent,
    withStyles,
    Typography,
    Button,
    Grid,
    IconButton,
    Tooltip
} from "@material-ui/core";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PatientRecordsCardStyle from "./PatientRecordsCardStyle";

function PatientRecordsCard({
    patientRecords,
    onEditRecordClick,
    onAddNewRecordClick,
    classes,
    isLoading
}) {
    ///------///
    const renderTableRows = () =>
        (patientRecords &&
            patientRecords.length &&
            patientRecords.map(li => ({
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
                    },
                    {component: renderActions(li.id)}
                ],
                collapseRow: {component: renderDesc(li.description, true)}
            }))) ||
        [];

    const onEditRecord = id => event => {
        onEditRecordClick && onEditRecordClick(id);
        event.stopPropagation();
    };

    const renderActions = id => (
        <Grid container>
            <Grid item>
                <Tooltip title="Edit" className={classes.editIcon}>
                    <IconButton
                        color="default"
                        aria-label="Edit"
                        edge="start"
                        size="small"
                        onClick={onEditRecord(id)}
                        className={classes.margin}
                    >
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <ExpandMoreIcon fontSize="inherit" className={classes.verticalAlignMiddle} />
            </Grid>
        </Grid>
    );

    const renderDesc = (desc, showAll) => (
        <Typography
            color="textPrimary"
            className={`${!showAll && classes.desc} ${showAll && classes.expandedDesc}`}
        >
            {(desc.length && desc) || "No Description"}
        </Typography>
    );

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="row" justify="space-between" alignItems="stretch">
                    <Grid item>
                        <Typography
                            className={classes.patientDetailsText}
                            variant="h5"
                            gutterBottom
                            component="h2"
                            color="textSecondary"
                        >
                            Patient Records
                            <SubjectRoundedIcon className={classes.icon} />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            disabled={isLoading}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={onAddNewRecordClick}
                        >
                            Add New Record
                        </Button>
                    </Grid>
                </Grid>

                <ITable
                    isLoading={isLoading}
                    hover
                    addCollapse={true}
                    emptyView={<strong>No Records!</strong>}
                    headers={["Disease Name", "Time of Entry", "Bill $", "Description", " "]}
                    rows={renderTableRows()}
                    tableContainerProps={{classes: {root: classes.removePaperEffect}}}
                    paperProps={{classes: {root: classes.removePaperEffect}}}
                />
            </CardContent>
        </Card>
    );
}

PatientRecordsCard.propTypes = {
    patientRecords: PropTypes.array,
    onEditRecordClick: PropTypes.func,
    onAddNewRecordClick: PropTypes.func,
    classes: PropTypes.object,
    isLoading: PropTypes.bool
};

export default withStyles(PatientRecordsCardStyle)(PatientRecordsCard);
