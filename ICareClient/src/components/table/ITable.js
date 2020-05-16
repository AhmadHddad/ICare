import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  CircularProgress,
  Grid,
  Collapse
} from "@material-ui/core";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import GeneralStyles from "shared/GeneralStyles";

const useStyles = makeStyles(theme => ({
  ...GeneralStyles(),
  table: {
    minWidth: 650
  },
  loader: {
    minHeight: 150,
    width: "100%"
  },
  collapseTableCell: {
    paddingBottom: 0,
    paddingTop: 0,
    border: "none"
  }
}));

export default function ITable(props) {
  const classes = useStyles();
  const {
    headers,
    rows,
    isLoading,
    disabled,
    tableContainerProps,
    paperProps,
    emptyView,
    hover,
    withCollapse
  } = props;

  const [collapseRow, setCollapseRow] = useState(null);

  const tableHeaders = headers.map((header, index) => (
    <TableCell key={index}>{header}</TableCell>
  ));

  const onCollapseRowClick = i => event => {
    if (collapseRow === i) {
      setCollapseRow(null);
    } else {
      setCollapseRow(i);
    }
  };

  let tableRows = [];
  if (withCollapse) {
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
        <TableRow
          hover
          key={index + 1}
          {...(row.collapseRow && row.collapseRow.props)}
        >
          <TableCell
            className={classes.collapseTableCell}
            colSpan={headers.length}
          >
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
          <TableRow {...row.props} hover={hover} key={row.id || rowI}>
            {row.cells.map((cell, index) => (
              <TableCell key={Math.random()} {...cell.props}>
                {cell.component}
              </TableCell>
            ))}
          </TableRow>
        ))) ||
      [];
  }

  if (isLoading || (tableRows && !tableRows.length) || !tableRows) {
    return (
      <Paper className={classes.loader} {...paperProps}>
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

  return (
    <TableContainer
      {...tableContainerProps}
      component={Paper}
      className={disabled ? classes.disabled : null}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>{tableHeaders}</TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </TableContainer>
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
  emptyView: PropTypes.any
};

ITable.defaultProps = {
  headers: ["Header#1", "Header#2"],
  rows: [
    {
      id: 1,
      cells: [
        { component: "Row#1Cell1", props: {} },
        { component: "Row#1Cell2", props: {} }
      ],
      props: {},
      collapseRow: { component: "collapseRow#1", props: {} }
    },
    {
      id: 2,
      cells: [
        { component: "Row#2Cell1", props: {} },
        { component: "Row#2Cell2", props: {} }
      ],
      props: {},
      collapseRow: { component: "collapseRow#2", props: {} }
    }
  ]
};
