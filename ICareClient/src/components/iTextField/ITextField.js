import React from "react";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import {TextField} from "@material-ui/core";

const propTypes = {
    control: PropTypes.any,
    textFieldProps: PropTypes.object,
    rules: PropTypes.object,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    variant: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default function ITextField({
    control,
    rules,
    name,
    defaultValue,
    fullWidth,
    variant,
    ...rest
}) {
    return (
        <Controller
            as={<TextField fullWidth={fullWidth} variant={variant} {...rest} />}
            rules={rules}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    );
}

ITextField.propTypes = propTypes;
ITextField.defaultProps = {
    fullWidth: true,
    variant: "outlined",
    defaultValue: ""
};
