import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {makeStyles} from "@material-ui/core";

// Hooks
import {useFlag, useITablePagination} from "hooks/hooks";

// Components
import PatientsListTable from "components/patientsListTable/PatientsListTable";

//Common
import IModal from "common/modal/IModal";
import CommonModalActions from "common/modal/CommonModalActions";

// Styles
import GeneralStyles from "shared/GeneralStyles";

// Actions
import {callAssignPatient, callGetUnAssignedPatients} from "store/actions/doctors/doctorsActions";

//Constants
const TOGGLE_NAMES = {
    UN_ASSIGNED_PATIENTS_LIST_LOADER: "UN_ASSIGNED_PATIENTS_LIST_LOADER",
    ASSIGN_PATIENT_LOADER: "ASSIGN_PATIENT_LOADER"
};

const styles = {
    ...GeneralStyles,
    selected: {
        backgroundColor: "black"
    }
};

export default function AssignPatientModal(props) {
    const {open, onClose, doctorId, onSuccess} = props;

    //#region  State
    const [getFlag, setFlag] = useFlag(Object.values(TOGGLE_NAMES));
    const [patientsList, setPatientList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    //#endregion State

    //#region Other hooks
    const dispatch = useDispatch();
    const [pagination, onPageChange, onRowChange, setPagination] = useITablePagination();
    const classes = makeStyles(styles)(props);
    //#endregion other hooks

    //#region LifeCycle
    useEffect(getUnAssignedPatientsList, []);
    //#endregion LifeCycle

    //#region Other Functions
    function onPatientSelected(patient) {
        return function () {
            setSelectedPatient(patient);
        };
    }
    //#endregion Other Functions

    //#region Paging Functions
    function onChangePage(e, newPage) {
        onPageChange(newPage, getUnAssignedPatientsList);
    }

    function onChangeRowsPerPage(e) {
        const value = e?.target?.value || 5;

        onRowChange(value, getUnAssignedPatientsList);
    }
    //#endregion Paging Functions

    //#region Dispatch Functions
    function getUnAssignedPatientsList(searchQuery = "") {
        const onStartOrFailure = val => _ =>
            setFlag(TOGGLE_NAMES.UN_ASSIGNED_PATIENTS_LIST_LOADER, val);
        const onSuccess = ({data, headers}) => {
            const resPagination = headers?.pagination;
            setPagination({...pagination, ...JSON.parse(resPagination)});
            setFlag(TOGGLE_NAMES.UN_ASSIGNED_PATIENTS_LIST_LOADER, false);
            setPatientList(data);
        };
        dispatch(
            callGetUnAssignedPatients(
                doctorId,
                searchQuery,
                onStartOrFailure(true),
                onSuccess,
                onStartOrFailure(false)
            )
        );
    }

    function onSaveAssignPatient() {
        if (!selectedPatient?.id) {
            return;
        }

        const onStartOrFailure = val => _ => setFlag(TOGGLE_NAMES.ASSIGN_PATIENT_LOADER, val);
        const onAssignSuccess = ({data}) => {
            setFlag(TOGGLE_NAMES.ASSIGN_PATIENT_LOADER, false);
            onSuccess && onSuccess(data, selectedPatient);
        };

        dispatch(
            callAssignPatient(
                doctorId,
                selectedPatient?.id,
                onStartOrFailure(true),
                onAssignSuccess,
                onStartOrFailure(false)
            )
        );
    }
    //#endregion Dispatch Functions

    const actions = (
        <CommonModalActions
            isLoading={getFlag(TOGGLE_NAMES.ASSIGN_PATIENT_LOADER)}
            onSave={onSaveAssignPatient}
            onClose={onClose}
        />
    );

    return (
        <IModal
            onClose={onClose}
            open={open}
            title="Assign Patient"
            actions={actions}
            modalProps={{
                maxWidth: "md",
                fullWidth: true
            }}
        >
            <PatientsListTable
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                select={true}
                hover={true}
                renderActions={{all: false}}
                rowClassName={`${classes.cursorPointer}`}
                pagination={pagination}
                patientsList={patientsList}
                isLoading={getFlag(TOGGLE_NAMES.UN_ASSIGNED_PATIENTS_LIST_LOADER)}
                onRowClick={onPatientSelected}
            />
        </IModal>
    );
}

AssignPatientModal.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    doctorId: PropTypes.number,
    onSuccess: PropTypes.func
};
