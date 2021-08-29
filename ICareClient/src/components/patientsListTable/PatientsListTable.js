import React from "react";
import PropTypes from "prop-types";
import ICTable from "common/table/ICTable";
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
    const isRenderActions = Object.values(renderActions).some(v => v === true);

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

        if (isRenderActions) {
            cells.push({
                component: RenderActionBtns(
                    li.id,
                    li.name,
                    onViewDetailsClick,
                    onEditPatientClick,
                    onDeletePatientClicked,
                    renderActions.all,
                    renderActions.details,
                    renderActions.edit,
                    renderActions.delete
                )
            });
        }

        return cells;
    }

    const tableHeaders = ["Patient Name", "Date Of Birth", "Last Entry"];

    if (isRenderActions) {
        tableHeaders.push(" ");
    }

    return (
        <ICTable
            {...rest}
            hover={hover}
            paperEffect={false}
            onChangePage={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
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
    renderActions: PropTypes.object,
    rowClassName: PropTypes.string
};

PatientsListTable.defaultProps = {
    renderActions: {
        delete: true,
        details: true,
        edit: true,
        all: true
    }
};

export default React.memo(
    PatientsListTable,
    arePropsEqual(["isLoading", "patientsList", "pagination", "rowClassName"])
);
