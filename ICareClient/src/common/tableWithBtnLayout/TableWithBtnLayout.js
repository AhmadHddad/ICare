import React from "react";
import PropTypes from "prop-types";

// Material UI
import {Grid, Button, makeStyles} from "@material-ui/core";

// Icons
import PersonAddIcon from "@material-ui/icons/PersonAdd";

// Styles
import GeneralStyles from "shared/GeneralStyles";
import ITable from "common/table/ITable";

const useStyles = makeStyles(theme => ({
    ...GeneralStyles,
    tableContainer: {
        marginTop: 20
    }
}));

export default function TableWithBtnLayout({
    addIcon,
    onAddBtnClick,
    AddBtnLabel,
    tableDataRows,
    isLoadingData,
    tableHeaders,
    pagination,
    onChangePage,
    onChangeRowsPerPage
}) {
    const classes = useStyles();

    return (
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item container md={12} xs={12} justify="flex-end">
                <Grid item>
                    <Button onClick={onAddBtnClick} variant="contained" color="primary">
                        {addIcon || (
                            <PersonAddIcon fontSize="small" className={classes.buttonIconStyle} />
                        )}
                        {AddBtnLabel}
                    </Button>
                </Grid>
            </Grid>
            <Grid item md={12} xs={12} className={classes.tableContainer}>
                <ITable
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    page={pagination?.currentPage}
                    rowsPerPage={pagination?.itemsPerPage}
                    totalItems={pagination?.totalItems}
                    addPagination
                    isLoading={isLoadingData}
                    rows={tableDataRows}
                    headers={tableHeaders}
                />
            </Grid>
        </Grid>
    );
}

TableWithBtnLayout.propTypes = {
    addIcon: PropTypes.node,
    onAddBtnClick: PropTypes.func,
    AddBtnLabel: PropTypes.string,
    tableDataRows: PropTypes.array,
    isLoadingData: PropTypes.bool,
    tableHeaders: PropTypes.array,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func
};
