import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

// Material UI
import {withStyles} from "@material-ui/core";

// Actions
import {callGetPatientsList, callDeletePatient} from "store/actions/patients/patientsActions";

// Styles
import PatientsListStyle from "./PatientsListStyle";

// Components
import WarningModal from "components/warningModal/WarningModal";
import AddEditPatientModal from "components/addEditPatientModal/AddEditPatientModal";

// Utils
import {toggle} from "utils/utils";
import ForceUnMount from "components/forceUnMount/ForceUnMount";

// constants
import {PAGINATION, DEFAULT_PAGINATION_VALUES} from "constants/constants";
import {RenderActionBtns} from "containers/listUtils/listUtils";
import TableWithBtnLayout from "components/tableWithBtnLayout/TableWithBtnLayout";

const toggleTypes = {
    modal: "modal",
    loader: "loader"
};

const toggleNames = {
    addModal: "addModal",
    dataLoader: "dataLoader",
    warningModal: "warningModal",
    deleteLoader: "deleteLoader"
};

function PatientsList({dispatch, patientsList, history}) {
    const [showModal, setModalState] = useState({
        [toggleNames.addModal]: false,
        [toggleNames.warningModal]: false
    });
    const [isLoading, setIsLoading] = useState({
        [toggleNames.dataLoader]: false,
        [toggleNames.deleteLoader]: false
    });
    const [warningMsg, setWarningMsg] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [pagination, setPagination] = useState(DEFAULT_PAGINATION_VALUES);

    useEffect(() => {
        if (!patientsList || !patientsList.length) {
            getPatientsList();
        }
    }, []);

    const getPatientsList = (paginationQuery = "") => {
        dispatch(
            callGetPatientsList(
                paginationQuery,
                toggle(toggleNames.dataLoader, isLoading, setIsLoading),
                res => {
                    const resPagination = res?.headers?.pagination;
                    setPagination({...pagination, ...JSON.parse(resPagination)});
                    toggle(toggleNames.dataLoader, isLoading, setIsLoading)();
                },
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
                        component: <strong>{li.name}</strong>
                    },
                    {
                        component: new Date(li.dateOfBirth).toLocaleDateString()
                    },
                    {
                        component:
                            (li.lastEntry && new Date(li.lastEntry).toLocaleDateString()) ||
                            "No Records"
                    },
                    {
                        component: RenderActionBtns(
                            li.id,
                            li.name,
                            onViewDetailsClick,
                            onEditPatientClick,
                            onDeletePatientClicked
                        )
                    }
                ]
            }))) ||
        [];

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

    const onChangePage = (e, newPage) => {
        setPagination({...pagination, currentPage: newPage + 1});
        getPatientsList(`?${PAGINATION.pageNumber}=${newPage + 1}`);
    };

    const onChangeRowsPerPage = e => {
        let value = e?.target?.value || 5;
        value = Number(value);

        getPatientsList(`?${PAGINATION.pageNumber}=${1}&${PAGINATION.pageSize}=${value}`);

        setPagination({
            ...pagination,
            itemsPerPage: value,
            currentPage: 1
        });
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
            <TableWithBtnLayout
                AddBtnLabel="Add New Patient"
                isLoadingData={isLoading && isLoading.dataLoader}
                onAddBtnClick={toggle(toggleNames.addModal, showModal, setModalState)}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                pagination={pagination}
                tableHeaders={["Patient Name", "Date Of Birth", "Last Entry", " "]}
                tableDataRows={renderTableRows()}
            />
        </React.Fragment>
    );
}

PatientsList.propTypes = {
    dispatch: PropTypes.func,
    patientsList: PropTypes.array,
    classes: PropTypes.object,
    history: PropTypes.object
};

const mapStateToProps = state => ({
    patientsList: state.patientsReducer.patientsList
});

export default connect(mapStateToProps)(withStyles(PatientsListStyle)(PatientsList));
