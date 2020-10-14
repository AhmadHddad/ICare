import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callGetDoctors, callDeleteDoctor} from "store/actions/doctors/doctorsActions";
import {useHistory, useRouteMatch} from "react-router-dom";

import TableWithBtnLayout from "common/tableWithBtnLayout/TableWithBtnLayout";
import DoctorComposer from "containers/doctors/doctorComposer/DoctorComposer";

// Common
import WarningModal from "common/warningModal/WarningModal";
import ForceUnMount from "common/forceUnMount/ForceUnMount";

// Hooks
import {useITablePagination} from "hooks/hooks";

// Utils
import {RenderActionBtns} from "containers/listUtils/listUtils";
import {toggle, isLength} from "utils/utils";

// Constants
const toggleNames = {
    doctorComposer: "doctorComposer",
    dataLoader: "dataLoader",
    warningModal: "warningModal",
    deleteLoader: "deleteLoader"
};
let selectedDoctorId;
function DoctorsList(props) {
    //#region State management
    const [flags, setFlags] = useState({
        [toggleNames.dataLoader]: false,
        [toggleNames.doctorComposer]: false
    });

    const [warningMsg, setWarningMsg] = useState("");
    //#endregion State management

    //#region Hooks
    const [pagination, onPageChange, onRowChange, setPagination] = useITablePagination();
    const dispatch = useDispatch();
    const doctorsList = useSelector(state => state.doctorsReducer.doctorsList);
    const history = useHistory();
    const match = useRouteMatch();
    //#endregion Hooks

    //#region LifeCycle
    useEffect(didMount, []);
    //#endregion LifeCycle

    //#region Other Functions

    function didMount() {
        !isLength(doctorsList) && getDoctorsList();
    }

    function onViewDoctor(id) {
        return _ => {
            history.push(`${match.path}/${id}`);
        };
    }

    function onEditDoctor(id) {
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
    //#endregion Other Functions

    //#region Paging Functions
    function onChangePage(e, newPage) {
        onPageChange(newPage, getDoctorsList);
    }

    function onChangeRowsPerPage(e) {
        const value = e?.target?.value || 5;

        onRowChange(value, getDoctorsList);
    }
    //#endregion Paging Functions

    //#region Dispatch Functions
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
    //#endregion  Dispatch Functions

    //#region Rendering Functions
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

    //#endregion Rendering Functions

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

export default DoctorsList;
