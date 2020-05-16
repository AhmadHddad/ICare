import GeneralStyles from "../../shared/GeneralStyles";
const PatientRecordsCardStyle = theme => ({
  ...GeneralStyles(),
  root: {
    minWidth: 275,
  },
  patientDetailsText: {
    marginBottom: 20,
  },
  icon: {
    verticalAlign: "middle",
    marginBottom: 3,
    marginLeft: 5,
  },
  tablePaper: {
    boxShadow: "none",
    border: "1px solid whitesmoke",
  },
  desc: {
    fontSize: "unset",
    maxWidth: "20vw",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  expandedDesc: {
    padding: "5px 0",
  },
  editIcon: {
    margin: "0 5px",
  },
});

export default PatientRecordsCardStyle;
