import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {unstable_batchedUpdates} from "react-dom";

// hooks
import {useFlag, useITablePagination} from "hooks/stateHooks";
import {useParams} from "react-router-dom";

// IComponents
import ICard from "common/iCard/ICard.js";

// hook form
import {useForm} from "react-hook-form";

// Icons
import DetailsIcon from "@material-ui/icons/Details";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

// Material UI
import {Grid, makeStyles, Button} from "@material-ui/core";

// Core Components
import PatientsListTable from "components/patientsListTable/PatientsListTable";
import DoctorDetailsFields from "containers/doctors/doctorComposer/DoctorDetailsFields";
import AssignPatientModal from "containers/doctors/assignPatientModal/AssignPatientModal";

// Actions
import {
    callGetDoctorById,
    callGetAssignedPatients,
    callDeleteAssignedPatient
} from "store/actions/doctors/doctorsActions";

// Styles
import DoctorDetailsStyle from "./DoctorDetailsStyle";

// Common
import ForceUnMount from "common/forceUnMount/ForceUnMount";

// Utils
import {toggleFlag, setPaginationUtil} from "utils/utils";

// Constants
import {DOCTOR_DETAILS_FIELDS} from "constants/fields";

const TOGGLE_NAMES = {
    DOCTOR_LOADER: "DOCTOR_LOADER",
    ASSIGNED_PATIENTS_LOADER: "ASSIGNED_PATIENTS_LOADER",
    ASSIGN_PATIENT_MODAL: "ASSIGN_PATIENT_MODAL"
};

const {
    name,
    dateOfBirth,
    department,
    email,
    specialty,
    officialId,
    university
} = DOCTOR_DETAILS_FIELDS;

export default function DoctorDetails(props) {
    //#region State
    const [assignedPatients, setAssignedPatients] = useState([]);

    const [getFlag, setFlag] = useFlag(Object.values(TOGGLE_NAMES));

    const [pagination, onPageChange, onRowChange, setPagination] = useITablePagination();
    //#endregion

    //#region Other Hooks
    const {control, errors, setValue} = useForm();

    const dispatch = useDispatch();
    const params = useParams();
    const classes = makeStyles(DoctorDetailsStyle)(props);
    //#endregion Other Hooks

    //#region Variables
    const doctorId = Number(params.id);
    //#endregion Variables

    //#region LifeCycle
    useEffect(getAssignedPatients, []);

    useEffect(getDoctor, []);
    //#endregion LifeCycle

    //#region Other Functions
    function onAssignPatientSuccess(data) {
        unstable_batchedUpdates(_ => {
            setFlag(TOGGLE_NAMES.ASSIGN_PATIENT_MODAL, false);
            setAssignedPatients(prev => {
                const assignPatientsToUpdate = [...prev];

                assignPatientsToUpdate.unshift(data);
                return assignPatientsToUpdate;
            });
        });
    }

    function onChangePage(e, newPage) {
        onPageChange(newPage, getAssignedPatients);
    }

    function onChangeRowsPerPage(e) {
        const value = e?.target?.value || 5;

        onRowChange(value, getAssignedPatients);
    }

    //#endregion Other Functions

    //#region Dispatch Functions
    function getDoctor() {
        const onCallback = () => {
            setFlag(TOGGLE_NAMES.DOCTOR_LOADER, true);
        };

        const onSuccess = ({data}) => {
            setValue(name, data.name);
            setValue(specialty, data.specialty);
            setValue(officialId, data.officialId);
            setValue(university, data.university);
            setValue(dateOfBirth, data.dateOfBirth);
            setValue(department, data.department);
            setValue(email, data.email);
        };

        dispatch(callGetDoctorById(doctorId, onCallback, onSuccess, onCallback));
    }

    function getAssignedPatients(query = "") {
        setFlag([TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER], true);

        const onSuccess = ({data, headers}) => {
            unstable_batchedUpdates(_ => {
                setPaginationUtil(setPagination, headers, pagination);
                setAssignedPatients(data);
                setFlag([TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER], false);
            });
        };

        dispatch(
            callGetAssignedPatients(
                doctorId,
                query,
                toggleFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER, true, setFlag),
                onSuccess,
                toggleFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER, false, setFlag)
            )
        );
    }

    function onDeleteAssignedPatient(patientId) {
        return function () {
            function onDeleteAssignedPatientSuccess(data) {
                unstable_batchedUpdates(_ => {
                    setFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER, false);
                    setAssignedPatients(prev => {
                        let assignPatientsToUpdate = [...prev];

                        assignPatientsToUpdate = assignPatientsToUpdate.filter(
                            p => p.id !== patientId
                        );
                        return assignPatientsToUpdate;
                    });
                });
            }

            dispatch(
                callDeleteAssignedPatient(
                    doctorId,
                    patientId,
                    toggleFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER, true, setFlag),
                    onDeleteAssignedPatientSuccess,
                    toggleFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER, false, setFlag)
                )
            );
        };
    }
    //#endregion Dispatch Functions

    return (
        <React.Fragment>
            <ForceUnMount mount={getFlag(TOGGLE_NAMES.ASSIGN_PATIENT_MODAL)}>
                <AssignPatientModal
                    doctorId={doctorId}
                    onSuccess={onAssignPatientSuccess}
                    open
                    onClose={toggleFlag(TOGGLE_NAMES.ASSIGN_PATIENT_MODAL, false, setFlag)}
                />
            </ForceUnMount>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12}>
                    <ICard title={"Doctor Details"} icon={DetailsIcon}>
                        <DoctorDetailsFields disabled={true} control={control} errors={errors} />
                    </ICard>
                </Grid>
                <Grid item xs={12}>
                    <ICard title={"Assigned Patients"} icon={AssignmentIndIcon}>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Grid container item xs={12} md={12} justify="flex-end">
                                <Button
                                    onClick={toggleFlag(
                                        TOGGLE_NAMES.ASSIGN_PATIENT_MODAL,
                                        true,
                                        setFlag
                                    )}
                                    variant="contained"
                                    color="primary"
                                >
                                    <PersonAddIcon
                                        fontSize="small"
                                        className={classes.buttonIconStyle}
                                    />
                                    Assign Patient
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <PatientsListTable
                                    onDeletePatientClicked={onDeleteAssignedPatient}
                                    renderActions={{delete: true, all: false}}
                                    isLoading={getFlag(TOGGLE_NAMES.ASSIGNED_PATIENTS_LOADER)}
                                    patientsList={assignedPatients}
                                    pagination={pagination}
                                    onChangePage={onChangePage}
                                    onChangeRowsPerPage={onChangeRowsPerPage}
                                />
                            </Grid>
                        </Grid>
                    </ICard>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
