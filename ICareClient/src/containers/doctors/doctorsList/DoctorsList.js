import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { callGetDoctors } from "store/actions/doctors/doctorsActions";
import { toggle } from "utils/utils";

import { RenderActionBtns } from "containers/listUtils/listUtils";
import TableWithBtnLayout from "components/tableWithBtnLayout/TableWithBtnLayout";
import { DEFAULT_PAGINATION_VALUES } from "constants/constants";

const propTypes = {};

const defaultProps = {};

// Constants
const toggleNames = {
  addModal: "addModal",
  dataLoader: "dataLoader",
  warningModal: "warningModal",
  deleteLoader: "deleteLoader"
};

function DoctorsList({ dispatch, doctorsList }) {
  const [flags, setFlags] = useState({
    [toggleNames.dataLoader]: false
  });

  useEffect(_ => {
    dispatch(
      callGetDoctors(
        toggle(toggleNames.dataLoader, flags, setFlags),
        toggle(toggleNames.dataLoader, flags, setFlags),
        toggle(toggleNames.dataLoader, flags, setFlags)
      )
    );
  }, []);

  const renderTableRows = () =>
    (doctorsList &&
      doctorsList.length &&
      doctorsList.map(li => ({
        id: li.id,
        cells: [
          {
            component: <strong>{li.name}</strong>
          },
          {
            component: new Date(li.dateOfBirth).toLocaleDateString()
          },
          {
            component: li.specialty
          },
          {
            component: li.department
          },
          {
            component: li.numberOfAssignedPatients
          },
          {
            component: RenderActionBtns(
              li.id,
              li.name,
              () => {},
              () => {},
              () => {}
            )
          }
        ]
      }))) ||
    [];

  return (
    <React.Fragment>
      <TableWithBtnLayout
        AddBtnLabel="Add New Doctor"
        isLoadingData={toggle.isLoadingData}
        onAddBtnClick={() => {}}
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

const mapStateToProps = state => ({
  doctorsList: state.doctorsReducer.doctorsList
});

DoctorsList.propTypes = propTypes;
DoctorsList.defaultProps = defaultProps;

export default connect(mapStateToProps)(DoctorsList);
