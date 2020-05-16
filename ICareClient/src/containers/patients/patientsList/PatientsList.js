import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  IconButton,
  withStyles,
  Tooltip,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ITable from "../../../components/table/ITable";
import { connect } from "react-redux";
import {
  callGetPatientsList,
  callDeletePatient,
} from "../../../store/actions/patients/patientsActions";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import PatientsListStyle from "./PatientsListStyle";
import WarningModal from "components/warningModal/WarningModal";
import AddEditPatientModal from "components/addEditPatientModal/AddEditPatientModal";
import { toggle } from "utils/utils";
import ForceUnMount from "components/forceUnMount/ForceUnMount";

const toggleTypes = {
  modal: "modal",
  loader: "loader",
};

const toggleNames = {
  addModal: "addModal",
  dataLoader: "dataLoader",
  warningModal: "warningModal",
  deleteLoader: "deleteLoader",
};

function PatientsList({ dispatch, patientsList, classes, history }) {
  const [showModal, setModalState] = useState({
    [toggleNames.addModal]: false,
    [toggleNames.warningModal]: false,
  });
  const [isLoading, setIsLoading] = useState({
    [toggleNames.dataLoader]: false,
    [toggleNames.deleteLoader]: false,
  });
  const [warningMsg, setWarningMsg] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (!patientsList || !patientsList.length) {
      getPatientsList();
    }
  }, []);

  const getPatientsList = () => {
    dispatch(
      callGetPatientsList(
        toggle(toggleNames.dataLoader, isLoading, setIsLoading),
        toggle(toggleNames.dataLoader, isLoading, setIsLoading),
        toggle(toggleNames.dataLoader, isLoading, setIsLoading)
      )
    );
  };

  const renderTableRows = () =>
    (patientsList &&
      patientsList.length &&
      patientsList.map(li => ({
        id: li.id,
        cells: [
          {
            component: <strong>{li.name}</strong>,
          },
          {
            component: new Date(li.dateOfBirth).toLocaleDateString(),
          },
          {
            component:
              (li.lastEntry && new Date(li.lastEntry).toLocaleDateString()) ||
              "No Records",
          },
          {
            component: renderActionBtns(li.id, li.name),
          },
        ],
      }))) ||
    [];

  const renderActionBtns = (id, name) => (
    <Grid container>
      <Grid item>
        <Tooltip title="Details">
          <IconButton
            color="primary"
            aria-label="View"
            edge="start"
            size="small"
            onClick={onViewDetailsClick(id)}
            className={classes.margin}
          >
            <VisibilityIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Edit">
          <IconButton
            color="default"
            aria-label="Edit"
            edge="start"
            size="small"
            onClick={onEditPatientClick(id)}
            className={classes.margin}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Delete">
          <IconButton
            color="secondary"
            aria-label="Delete"
            edge="start"
            size="small"
            onClick={onDeletePatientClicked(id, name)}
            className={classes.margin}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );

  const onViewDetailsClick = id => event => {
    history.push(`pationslist/${id}`, id);
  };

  const onEditPatientClick = id => event => {
    setSelectedPatient(id);
    toggle(toggleNames.addModal, showModal, setModalState)();
  };

  const onDeletePatientClicked = (id, name) => event => {
    setWarningMsg(`Are You Sure You Want To Delete ${name}?`);
    toggle(toggleNames.warningModal, showModal, setModalState)();
    setSelectedPatient(id);
  };

  const deletePatient = () => {
    const onSuccessOrFailure = () => {
      toggle(toggleNames.deleteLoader, toggleTypes.loader)();
      toggle(toggleNames.warningModal, showModal, setModalState)();
      setSelectedPatient(null);
    };

    dispatch(
      callDeletePatient(
        selectedPatient,
        toggle(toggleNames.deleteLoader, toggleTypes.loader),
        onSuccessOrFailure,
        onSuccessOrFailure
      )
    );
  };

  const onSavePatient = () => {
    toggle(toggleNames.addModal, showModal, setModalState)();
    setSelectedPatient(null);
  };

  return (
    <React.Fragment>
      <WarningModal
        onOk={deletePatient}
        onClose={toggle(toggleNames.warningModal, showModal, setModalState)}
        message={warningMsg}
        open={showModal.warningModal}
      />
      <ForceUnMount mount={showModal.addModal}>
        <AddEditPatientModal
          patientIdToEdit={selectedPatient}
          onSave={onSavePatient}
          open={showModal.addModal}
          onClose={toggle(toggleNames.addModal, showModal, setModalState)}
          dispatch={dispatch}
        />
      </ForceUnMount>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item container md={12} xs={12} justify="flex-end">
          <Grid item>
            <Button
              onClick={toggle(toggleNames.addModal, showModal, setModalState)}
              variant="contained"
              color="primary"
            >
              <PersonAddIcon fontSize="small" className={classes.root} />
              Add New Patient
            </Button>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} className={classes.tableContainer}>
          <ITable
            isLoading={isLoading && isLoading.dataLoader}
            rows={renderTableRows()}
            headers={["Patient Name", "Date Of Birth", "Last Entry", " "]}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

PatientsList.propTypes = {
  dispatch: PropTypes.func,
  patientsList: PropTypes.array,
  classes: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  patientsList: state.patientsReducer.patientsList,
});

export default connect(mapStateToProps)(
  withStyles(PatientsListStyle)(PatientsList)
);
