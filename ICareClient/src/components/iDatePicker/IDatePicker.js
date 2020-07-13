import React from "react";
import PropTypes from "prop-types";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {Controller} from "react-hook-form";
import MomentUtils from "@date-io/moment";

const propTypes = {
    rules: PropTypes.object,
    name: PropTypes.string,
    control: PropTypes.any,
    defaultValue: PropTypes.any,
    fullWidth: PropTypes.bool,
    autoOk: PropTypes.bool,
    format: PropTypes.string,
    maxDate: PropTypes.any
};

const defaultProps = {
    fullWidth: true,
    autoOk: true,
    maxDate: new Date(),
    defaultValue: new Date(),
    format: "DD/MM/YYYY"
};

export default function IDatePicker({
    rules,
    name,
    control,
    defaultValue,
    fullWidth,
    autoOk,
    format,
    maxDate,
    ...rest
}) {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Controller
                as={
                    <KeyboardDatePicker
                        autoOk={autoOk}
                        fullWidth={fullWidth}
                        maxDate={maxDate}
                        format={format}
                        variant="inline"
                        inputVariant="outlined"
                        {...rest}
                    />
                }
                rules={rules}
                defaultValue={defaultValue}
                name={name}
                control={control}
            />
        </MuiPickersUtilsProvider>
    );
}

IDatePicker.propTypes = propTypes;
IDatePicker.defaultProps = defaultProps;
