import { lazy } from "react";

// Icons
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import AirlineSeatFlatIcon from "@material-ui/icons/AirlineSeatFlat";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

// Lazy Imports
const lazyPatientsList = lazy(() =>
  import("containers/patients/patientsList/PatientsList")
);
const lazyPatientDetails = lazy(() =>
  import("containers/patients/patientDetails/PatientDetails")
);
const lazyLoginAndRegister = lazy(() =>
  import("containers/login/LoginAndRegister")
);
const lazyDoctorsList = lazy(_ =>
  import("containers/doctors/doctorsList/DoctorsList")
);

const routs = [
  {
    id: 1,
    name: "Patients list",
    path: "/pationslist",
    component: lazyPatientsList,
    icon: AirlineSeatFlatIcon,
    isMain: true
  },
  {
    id: 2,
    name: "Patients list",
    path: "/pationslist/:id",
    component: lazyPatientDetails,
    icon: FormatListBulletedIcon,
    hidden: true
  },
  {
    id: 3,
    name: "Doctors list",
    path: "/doctorslist",
    component: lazyDoctorsList,
    icon: AssignmentIndIcon
  }
];

export const loginPage = {
  name: "Login",
  path: "/login",
  component: lazyLoginAndRegister
};
export default routs;
