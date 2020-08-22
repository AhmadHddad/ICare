import React, {useState} from "react";
import PropTypes from "prop-types";
import {makeStyles, CircularProgress, Grid, Collapse, Typography} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import ITableStyle from "./ITableStyle";

export default function ITable(props) {
    const classes = makeStyles(ITableStyle)(props);
    const {
        headers,
        rows,
        isLoading,
        disabled,
        tableContainerProps,
        paperProps,
        emptyView,
        hover,
        addCollapse,
        page,
        rowsPerPage,
        rowsPerPageOptions,
        onChangePage,
        onChangeRowsPerPage,
        addPagination,
        totalItems,
        paperEffect,
        select
    } = props;

    const [collapseRow, setCollapseRow] = useState(null);
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    function selectedRowClassName(index) {
        let className = "";

        if (selectedRowIndex === index) {
            className = classes.selectedRow;
        }

        return className;
    }

    function onRowClick(row, index, callback) {
        return function (event) {
            setSelectedRowIndex(index);
            callback(event, row);
        };
    }

    const tableHeaders = headers.map((header, index) => (
        <TableCell key={index}>
            <Typography variant="subtitle2" color="textSecondary">
                {header}
            </Typography>
        </TableCell>
    ));

    const onCollapseRowClick = i => event => {
        if (collapseRow === i) {
            setCollapseRow(null);
        } else {
            setCollapseRow(i);
        }
    };

    let tableRows = [];
    if (addCollapse) {
        tableRows =
            rows &&
            rows.length &&
            rows.map((row, index) => [
                <TableRow
                    {...row.props}
                    hover
                    key={index}
                    className={classes.cursorPointer}
                    onClick={onCollapseRowClick(index)}
                >
                    {row.cells.map((cell, i) => (
                        <TableCell key={i} {...cell.props}>
                            {cell.component}
                        </TableCell>
                    ))}
                </TableRow>,
                <TableRow hover key={index + 1} {...(row.collapseRow && row.collapseRow.props)}>
                    <TableCell className={classes.collapseTableCell} colSpan={headers.length}>
                        <Collapse in={collapseRow === index} timeout="auto" unmountOnExit>
                            {(row.collapseRow && row.collapseRow.component) || " "}
                        </Collapse>
                    </TableCell>
                </TableRow>
            ]);
    } else {
        tableRows =
            (rows &&
                rows.length &&
                rows.map((row, rowI) => (
                    <TableRow
                        {...row.props}
                        hover={hover}
                        key={row.id || rowI}
                        onClick={
                            select
                                ? onRowClick(row, rowI, row?.props?.onClick)
                                : row?.props?.onClick
                        }
                        className={`${row?.props?.className || ""} ${selectedRowClassName(rowI)}`}
                    >
                        {row.cells.map((cell, index) => (
                            <TableCell key={index} {...cell.props}>
                                {cell.component}
                            </TableCell>
                        ))}
                    </TableRow>
                ))) ||
            [];
    }

    if (isLoading || (tableRows && !tableRows.length) || !tableRows) {
        return (
            <Paper
                className={`${(!paperEffect && classes.removePaperEffect) || ""} ${
                    paperProps?.className || ""
                } ${classes.loader}`}
                {...paperProps}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    className={classes.loader}
                    {...paperProps}
                >
                    <Grid item>
                        {isLoading ? (
                            <CircularProgress />
                        ) : emptyView ? (
                            emptyView
                        ) : (
                            <strong>No Data!</strong>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        );
    }

    const classNames = `${disabled ? classes.disabled : ""} ${
        (!paperEffect && classes.removePaperEffect) || ""
    }`;

    return (
        <div className={classes.fullWidth}>
            <Paper
                className={`${(!paperEffect && classes.removePaperEffect) || ""} ${
                    paperProps?.className || ""
                }`}
                {...paperProps}
            >
                <TableContainer {...tableContainerProps} component={"div"} className={classNames}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>{tableHeaders}</TableRow>
                        </TableHead>
                        <TableBody>{tableRows}</TableBody>
                    </Table>
                </TableContainer>
                {addPagination && (
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={rowsPerPageOptions}
                        count={totalItems || rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page - 1}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                    />
                )}
            </Paper>
        </div>
    );
}

ITable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    hover: PropTypes.bool,
    tableContainerProps: PropTypes.object,
    paperProps: PropTypes.object,
    emptyView: PropTypes.any,
    addPagination: PropTypes.bool,
    select: PropTypes.bool,
    paperEffect: PropTypes.bool,
    rowsPerPageOptions: PropTypes.array,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    totalItems: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func
};

ITable.defaultProps = {
    rowsPerPageOptions: [5, 15, 20],
    rowsPerPage: 5,
    page: 1,
    paperEffect: true,
    headers: ["Header#1", "Header#2"],
    rows: [
        {
            id: 1,
            cells: [
                {component: "Row#1Cell1", props: {}},
                {component: "Row#1Cell2", props: {}}
            ],
            props: {},
            collapseRow: {component: "collapseRow#1", props: {}}
        },
        {
            id: 2,
            cells: [
                {component: "Row#2Cell1", props: {}},
                {component: "Row#2Cell2", props: {}}
            ],
            props: {},
            collapseRow: {component: "collapseRow#2", props: {}}
        }
    ]
};
