import React from "react";
import PropTypes from "prop-types";
import ITable from "components/table/ITable";
import {RenderActionBtns} from "containers/listUtils/listUtils";

const propTypes = {
    patientsList: PropTypes.array,
    onViewDetailsClick: PropTypes.func,
    onEditPatientClick: PropTypes.func,
    onDeletePatientClicked: PropTypes.func,
    isLoadingData: PropTypes.bool,
    pagination: PropTypes.object,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func
};

export default function PatientsListTable({
    patientsList,
    onViewDetailsClick,
    onEditPatientClick,
    onDeletePatientClicked,
    isLoadingData,
    pagination,
    onChangePage,
    onChangeRowsPerPage
}) {
    const renderTableRows = () =>
        (patientsList?.length &&
            patientsList.map(li => ({
                id: li.id,
                cells: [
                    {
                        component: <strong>{li.name}</strong>
                    },
                    {
                        component: new Date(li.dateOfBirth).toLocaleDateString()
                    },
                    {
                        component:
                            (li.lastEntry && new Date(li.lastEntry).toLocaleDateString()) ||
                            "No Records"
                    },
                    {
                        component: RenderActionBtns(
                            li.id,
                            li.name,
                            onViewDetailsClick,
                            onEditPatientClick,
                            onDeletePatientClicked
                        )
                    }
                ]
            }))) ||
        [];

    return (
        <ITable
            paperEffect={false}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            page={pagination?.currentPage}
            rowsPerPage={pagination?.itemsPerPage}
            totalItems={pagination?.totalItems}
            addPagination
            isLoading={isLoadingData}
            rows={renderTableRows()}
            header={["Patient Name", "Date Of Birth", "Last Entry", " "]}
        />
    );
}

PatientsListTable.propTypes = propTypes;
