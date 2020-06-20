import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {callGetDoctors, callDeleteDoctor} from "store/actions/doctors/doctorsActions";
import {toggle} from "utils/utils";

import {RenderActionBtns} from "containers/listUtils/listUtils";
import TableWithBtnLayout from "components/tableWithBtnLayout/TableWithBtnLayout";
import {DEFAULT_PAGINATION_VALUES} from "constants/constants";
import DoctorComposer from "../doctorComposer/DoctorComposer";
import WarningModal from "components/warningModal/WarningModal";

const propTypes = {};

const defaultProps = {};

// Constants
const toggleNames = {
    addModal: "addModal",
    dataLoader: "dataLoader",
    warningModal: "warningModal",
    deleteLoader: "deleteLoader"
};
let selectedDoctor;
function DoctorsList({dispatch, doctorsList}) {
    const [flags, setFlags] = useState({
        [toggleNames.dataLoader]: false,
        [toggleNames.addModal]: false
    });

    const [warningMsg, setWarningMsg] = useState("");

    function getDoctors() {
        dispatch(
            callGetDoctors(
                toggle(toggleNames.dataLoader, flags, setFlags),
                toggle(toggleNames.dataLoader, flags, setFlags),
                toggle(toggleNames.dataLoader, flags, setFlags)
            )
        );
    }

    useEffect(function () {
        !doctorsList?.length && getDoctors();
    }, []);

    const renderTableRows = () =>
        (doctorsList &&
            doctorsList.length &&
            doctorsList.map((doctor) => ({
                id: doctor.id,
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
                            () => {},
                            () => {},
                            onDeleteDoctor
                        )
                    }
                ]
            }))) ||
        [];

    function onDeleteDoctor(id, name) {
        return () => {
            selectedDoctor = id;
            toggle(toggleNames.warningModal, flags, setFlags)();
            setWarningMsg("Are sure you want to delete " + name);
        };
    }

    function deleteDoctor() {
        dispatch(
            callDeleteDoctor(
                selectedDoctor,
                toggle(toggleNames.deleteLoader, flags, setFlags),
                toggle(toggleNames.deleteLoader, flags, setFlags),
                toggle(toggleNames.deleteLoader, flags, setFlags)
            )
        );
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
            <DoctorComposer
                dispatch={dispatch}
                open={flags[toggleNames.addModal]}
                onClose={toggle(toggleNames.addModal, flags, setFlags)}
                onSaveSuccess={toggle(toggleNames.addModal, flags, setFlags)}
            />
            <TableWithBtnLayout
                AddBtnLabel="Add New Doctor"
                isLoadingData={flags[toggleNames.dataLoader]}
                onAddBtnClick={toggle(toggleNames.addModal, flags, setFlags)}
                onChangePage={() => {}}
                onChangeRowsPerPage={() => {}}
                pagination={DEFAULT_PAGINATION_VALUES}
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

const mapStateToProps = (state) => ({
    doctorsList: state.doctorsReducer.doctorsList
});

DoctorsList.propTypes = propTypes;
DoctorsList.defaultProps = defaultProps;

export default connect(mapStateToProps)(DoctorsList);
