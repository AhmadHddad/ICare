import React from "react";
import PropTypes from "prop-types";
import ITable from "common/table/ITable";
import {RenderActionBtns} from "containers/listUtils/listUtils";

import {arePropsEqual} from "utils/utils";

function PatientsListTable({
    patientsList,
    onViewDetailsClick,
    onEditPatientClick,
    onDeletePatientClicked,
    isLoading,
    pagination,
    onChangePage,
    onChangeRowsPerPage,
    hover,
    rowClassName,
    onRowClick,
    renderActions,
    ...rest
}) {
    const renderTableRows = () =>
        (patientsList?.length &&
            patientsList.map(li => ({
                id: li.id,
                cells: buildCellsArr(li),
                props: {onClick: onRowClick && onRowClick(li), className: rowClassName}
            }))) ||
        [];

    function buildCellsArr(li = {}) {
        const cells = [
            {
                component: <strong>{li.name}</strong>
            },
            {
                component: new Date(li.dateOfBirth).toLocaleDateString()
            },
            {
                component:
                    (li.lastEntry && new Date(li.lastEntry).toLocaleDateString()) || "No Records"
            }
        ];

        if (renderActions) {
            cells.push({
                component: RenderActionBtns(
                    li.id,
                    li.name,
                    onViewDetailsClick,
                    onEditPatientClick,
                    onDeletePatientClicked
                )
            });
        }

        return cells;
    }

    const tableHeaders = ["Patient Name", "Date Of Birth", "Last Entry"];

    if (renderActions) {
        tableHeaders.push(" ");
    }

    return (
        <ITable
            {...rest}
            hover={hover}
            paperEffect={false}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            page={pagination?.currentPage}
            rowsPerPage={pagination?.itemsPerPage}
            totalItems={pagination?.totalItems}
            addPagination
            isLoading={isLoading}
            rows={renderTableRows()}
            headers={tableHeaders}
        />
    );
}

PatientsListTable.propTypes = {
    patientsList: PropTypes.array,
    onViewDetailsClick: PropTypes.func,
    onEditPatientClick: PropTypes.func,
    onDeletePatientClicked: PropTypes.func,
    isLoading: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
    onRowClick: PropTypes.func,
    renderActions: PropTypes.bool,
    rowClassName: PropTypes.string
};

PatientsListTable.defaultProps = {
    renderActions: true
};

export default React.memo(
    PatientsListTable,
    arePropsEqual(["isLoading", "patientsList", "pagination", "rowClassName"])
);
