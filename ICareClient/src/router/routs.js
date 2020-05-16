import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { lazy } from "react";

const lazyPatientsList = lazy(() =>
  import("containers/patients/patientsList/PatientsList")
);
const lazyPatientDetails = lazy(() =>
  import("containers/patients/patientDetails/PatientDetails")
);
const lazyLoginAndRegister = lazy(() =>
  import("containers/login/LoginAndRegister")
);

const routs = [
  {
    id: 1,
    name: "Patients list",
    path: "/pationslist",
    component: lazyPatientsList,
    icon: FormatListBulletedIcon,
    isMain: true
  },
  {
    id: 2,
    name: "Patients list",
    path: "/pationslist/:id",
    component: lazyPatientDetails,
    icon: FormatListBulletedIcon,
    hidden: true
  }
];

export const loginPage = {
  name: "Login",
  path: "/login",
  component: lazyLoginAndRegister
};
export default routs;
