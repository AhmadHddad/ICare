import React, {useEffect, useState} from "react";
import {Grid, IconButton} from "@material-ui/core";
import {callGetPatientById, callGetPatientStatistics} from "store/actions/patients/patientsActions";

import {toggle} from "utils/utils";
import {connect} from "react-redux";
import AddEditPatientModal from "components/addEditPatientModal/AddEditPatientModal";
import ForceUnMount from "common/forceUnMount/ForceUnMount";
import PatientDetailsCard from "components/patient/PatientDetailsCard";
import PatientRecordsCard from "components/patient/PatientRecordsCard";
import AddEditRecordModal from "components/addEditRecordModal/AddEditRecordModal";
import PatientStatistics from "components/patient/PatientStatistics";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const toggleObj = {
    editDetailModal: "editDetailModal",
    dataLoader: "dataLoader",
    editAddRecordModal: "editAddRecordModal"
};

function PatientDetails({match, dispatch, history, ...rest}) {
    const [showHide, setShowHide] = useState({
        [toggleObj.dataLoader]: false,
        [toggleObj.editDetailModal]: false,
        [toggleObj.editAddRecordModal]: false
    });

    const [patientDetails, setPatientDetails] = useState({
        id: "",
        name: "",
        dateOfBirth: "",
        email: "",
        officialId: "",
        phoneNumber: ""
    });

    const [records, setRecords] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [selectedRecord, setSelectedRecord] = useState(null);

    const patientId = match.params.id;

    useEffect(() => {
        const onSuccessGetPatientById = ({data: {records, ...rest}}) => {
            setDetails({...rest});
            setRecords(records);
            toggle(toggleObj.dataLoader, showHide, setShowHide)();
        };
        dispatch(
            callGetPatientById(
                patientId,
                toggle(toggleObj.dataLoader, showHide, setShowHide),
                onSuccessGetPatientById,
                toggle(toggleObj.dataLoader, showHide, setShowHide),
                "?withRecords=true"
            )
        );

        const onSuccessGetPatientStatistics = ({data}) => {
            setStatistics(data);
            toggle(toggleObj.dataLoader, showHide, setShowHide)();
        };

        dispatch(
            callGetPatientStatistics(
                patientId,
                toggle(toggleObj.dataLoader, showHide, setShowHide),
                onSuccessGetPatientStatistics,
                toggle(toggleObj.dataLoader, showHide, setShowHide)
            )
        );
    }, []);

    const setDetails = ({name, officialId, dateOfBirth, email, id, phoneNumber}) => {
        setPatientDetails({
            id,
            name,
            officialId,
            email,
            phoneNumber,
            dateOfBirth
        });
    };

    const onEditDetailsSuccess = patient => {
        setDetails(patient);
        toggle(toggleObj.editDetailModal, showHide, setShowHide)();
    };

    const onSaveRecord = (record, isEdit) => {
        let updatedRecords = [...records];

        if (isEdit) {
            updatedRecords = records.map(rec => {
                if (rec.id === record.id) {
                    return record;
                } else {
                    return rec;
                }
            });
        } else {
            updatedRecords = updatedRecords.concat(record);
        }

        setRecords(updatedRecords);
        toggle(toggleObj.editAddRecordModal, showHide, setShowHide)();
    };

    const onEditRecordClick = id => {
        const recordForEdit = records.find(rec => rec.id === id);

        if (recordForEdit) {
            setSelectedRecord(recordForEdit);
            toggle(toggleObj.editAddRecordModal, showHide, setShowHide)();
        }
    };

    return (
        <React.Fragment>
            <ForceUnMount mount={showHide.editDetailModal}>
                <AddEditPatientModal
                    onSave={onEditDetailsSuccess}
                    dispatch={dispatch}
                    patientToEdit={patientDetails}
                    open={showHide.editDetailModal}
                    onClose={toggle(toggleObj.editDetailModal, showHide, setShowHide)}
                />
            </ForceUnMount>
            <ForceUnMount mount={showHide.editAddRecordModal}>
                <AddEditRecordModal
                    recordToEdit={selectedRecord}
                    onSave={onSaveRecord}
                    patientId={patientId}
                    onClose={toggle(toggleObj.editAddRecordModal, showHide, setShowHide)}
                    open={showHide.editAddRecordModal}
                    dispatch={dispatch}
                />
            </ForceUnMount>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                <Grid item md={12} xs={12} sm={12}>
                    <IconButton color="inherit" edge="start" onClick={() => history.goBack()}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <PatientDetailsCard
                        isLoading={showHide.dataLoader}
                        patientDetails={patientDetails}
                        onEdit={toggle(toggleObj.editDetailModal, showHide, setShowHide)}
                    />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <PatientStatistics
                        statistics={statistics}
                        dispatch={dispatch}
                        isLoading={showHide.dataLoader}
                        patientDetails={patientDetails}
                        onEdit={toggle(toggleObj.editDetailModal, showHide, setShowHide)}
                    />
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                    <PatientRecordsCard
                        isLoading={showHide.dataLoader}
                        patientRecords={records}
                        onEditRecordClick={onEditRecordClick}
                        onAddNewRecordClick={toggle(
                            toggleObj.editAddRecordModal,
                            showHide,
                            setShowHide
                        )}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connect()(PatientDetails);
