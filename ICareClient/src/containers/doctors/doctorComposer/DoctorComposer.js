import React, {useEffect} from "react";
import PropTypes from "prop-types";
import IComposer from "common/modal/IComposer";
import {useForm} from "react-hook-form";
import {
    callAddDoctor,
    callGetDoctorById,
    callEditDoctor
} from "store/actions/doctors/doctorsActions";
import {useFlag} from "hooks/stateHooks";
import DoctorDetailsFields from "./DoctorDetailsFields";

// Constants
const toggleNames = {
    savingLoader: "savingLoader",
    doctorLoader: "doctorLoader"
};

export default function DoctorComposer({dispatch, onClose, onSaveSuccess, open, doctorId}) {
    const isEdit = !!doctorId;

    const {handleSubmit, control, errors, setValue} = useForm();

    const [getFlag, setFlag] = useFlag([[toggleNames.savingLoader], [toggleNames.doctorLoader]]);

    useEffect(getDoctorById, [isEdit]);

    function getDoctorById() {
        if (isEdit) {
            function onCallback() {
                setFlag([toggleNames.doctorLoader], true);
            }

            function onSuccess({data}) {
                setDoctorFields(data);
                setFlag([toggleNames.doctorLoader], false);
            }

            dispatch(callGetDoctorById(doctorId, onCallback, onSuccess, onCallback));
        }
    }

    function onSave(data) {
        if (isEdit) {
            dispatch(
                callEditDoctor(
                    {...data, id: doctorId},
                    setFlag(toggleNames.savingLoader, true),
                    onSaveSuccess && onSaveSuccess,
                    setFlag(toggleNames.savingLoader, false)
                )
            );
        } else {
            dispatch(
                callAddDoctor(
                    data,
                    setFlag(toggleNames.savingLoader, true),
                    onSaveSuccess && onSaveSuccess,
                    setFlag(toggleNames.savingLoader, false)
                )
            );
        }
    }

    function setDoctorFields(doctorToEdit) {
        setValue("name", doctorToEdit?.name || "");
        setValue("dateOfBirth", doctorToEdit?.dateOfBirth);
        setValue("email", doctorToEdit?.email || "");
        setValue("officialId", doctorToEdit?.officialId || "");
        setValue("specialty", doctorToEdit?.specialty || "");
        setValue("university", doctorToEdit?.university || "");
        setValue("department", doctorToEdit?.department || "");
    }

    return (
        <IComposer
            open={open}
            isLoading={getFlag([toggleNames.doctorLoader])}
            isSaving={getFlag([toggleNames.savingLoader])}
            onSubmit={handleSubmit(onSave)}
            onClose={onClose}
        >
            <DoctorDetailsFields
                control={control}
                errors={errors}
                disabled={{officialId: isEdit}}
            />
        </IComposer>
    );
}

DoctorComposer.propTypes = {
    dispatch: PropTypes.func,
    isEdit: PropTypes.bool,
    onClose: PropTypes.func,
    onSaveSuccess: PropTypes.func,
    open: PropTypes.bool
};
