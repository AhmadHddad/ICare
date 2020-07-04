import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {callGetDoctors, callDeleteDoctor} from "store/actions/doctors/doctorsActions";
import {toggle, isLength} from "utils/utils";

import {RenderActionBtns} from "containers/listUtils/listUtils";
import TableWithBtnLayout from "components/tableWithBtnLayout/TableWithBtnLayout";
import DoctorComposer from "../doctorComposer/DoctorComposer";
import WarningModal from "components/warningModal/WarningModal";
import ForceUnMount from "components/forceUnMount/ForceUnMount";
import {useITablePagination} from "hooks/stateHooks";

const propTypes = {};

const defaultProps = {};

// Constants
const toggleNames = {
    doctorComposer: "doctorComposer",
    dataLoader: "dataLoader",
    warningModal: "warningModal",
    deleteLoader: "deleteLoader"
};
let selectedDoctorId;
function DoctorsList({dispatch, doctorsList}) {
    const [flags, setFlags] = useState({
        [toggleNames.dataLoader]: false,
        [toggleNames.doctorComposer]: false
    });

    const [pagination, onPageChange, onRowChange, setPagination] = useITablePagination();

    const [warningMsg, setWarningMsg] = useState("");

    function getDoctorsList(searchQuery = "") {
        dispatch(
            callGetDoctors(
                searchQuery,
                toggle(toggleNames.dataLoader, flags, setFlags),
                res => {
                    const resPagination = res?.headers?.pagination;
                    setPagination({...pagination, ...JSON.parse(resPagination)});
                    toggle(toggleNames.dataLoader, flags, setFlags)();
                },
                toggle(toggleNames.dataLoader, flags, setFlags),
                toggle(toggleNames.dataLoader, flags, setFlags)
            )
        );
    }

    useEffect(function () {
        !isLength(doctorsList) && getDoctorsList();
    }, []);

    const renderTableRows = () =>
        (doctorsList &&
            doctorsList.length &&
            doctorsList.map(doctor => ({
                id: doctor?.id,
                cells: [
                    {
                        component: <strong>{doctor.name}</strong>
                    },
                    {
                        component: new Date(doctor.dateOfBirth).toLocaleDateString()
                    },
                    {
                        component: doctor.specialty
                    },
                    {
                        component: doctor.department
                    },
                    {
                        component: doctor.numberOfAssignedPatients
                    },
                    {
                        component: RenderActionBtns(
                            doctor.id,
                            doctor.name,
                            onViewDoctor,
                            onEditDoctor,
                            onDeleteDoctor
                        )
                    }
                ]
            }))) ||
        [];

    function onViewDoctor(id, name) {
        return _ => {
            alert("Not implemented yet!");
        };
    }

    function onEditDoctor(id, name) {
        return () => {
            selectedDoctorId = id;
            toggle(toggleNames.doctorComposer, flags, setFlags)();
        };
    }

    function onDeleteDoctor(id, name) {
        return () => {
            selectedDoctorId = id;
            toggle(toggleNames.warningModal, flags, setFlags)();
            setWarningMsg("Are sure you want to delete " + name);
        };
    }

    function deleteDoctor() {
        dispatch(
            callDeleteDoctor(
                selectedDoctorId,
                toggle(toggleNames.deleteLoader, flags, setFlags),
                toggle(toggleNames.deleteLoader, flags, setFlags),
                toggle(toggleNames.deleteLoader, flags, setFlags)
            )
        );
    }

    function onChangePage(e, newPage) {
        onPageChange(newPage, getDoctorsList);
    }

    function onChangeRowsPerPage(e) {
        const value = e?.target?.value || 5;

        onRowChange(value, getDoctorsList);
    }

    return (
        <React.Fragment>
            <WarningModal
                isLoading={flags[toggleNames.deleteLoader]}
                onOk={deleteDoctor}
                onClose={toggle(toggleNames.warningModal, flags, setFlags)}
                message={warningMsg}
                open={flags[toggleNames.warningModal]}
            />
            <ForceUnMount mount={flags[toggleNames.doctorComposer]}>
                <DoctorComposer
                    doctorId={selectedDoctorId}
                    dispatch={dispatch}
                    open
                    onClose={toggle(toggleNames.doctorComposer, flags, setFlags)}
                    onSaveSuccess={toggle(toggleNames.doctorComposer, flags, setFlags)}
                />
            </ForceUnMount>
            <TableWithBtnLayout
                AddBtnLabel="Add New Doctor"
                isLoadingData={flags[toggleNames.dataLoader]}
                onAddBtnClick={toggle(toggleNames.doctorComposer, flags, setFlags)}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                pagination={pagination}
                tableHeaders={[
                    "Name",
                    "Date Of Birth",
                    "Specialty",
                    "Department",
                    "# Assigned Patients",
                    " "
                ]}
                tableDataRows={renderTableRows()}
            />
        </React.Fragment>
    );
}

const mapStateToProps = state => ({
    doctorsList: state.doctorsReducer.doctorsList
});

DoctorsList.propTypes = propTypes;
DoctorsList.defaultProps = defaultProps;

export default connect(mapStateToProps)(DoctorsList);
