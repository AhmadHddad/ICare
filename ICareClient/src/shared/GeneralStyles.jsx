const GeneralStyles = theme => ({
    disabled: {
        "pointer-events": "none",
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
        opacity: 0.45
    },
    textAlignCenter: {
        textAlign: "center"
    },
    cursorPointer: {
        cursor: "pointer"
    },
    verticalAlignMiddle: {
        verticalAlign: "middle"
    },
    removeSidePadding: {
        paddingLeft: "0 !important",
        paddingRight: "0 !important"
    },
    removeMargin: {
        margin: "0 !important"
    },
    tablePaper: {
        boxShadow: "none",
        border: "1px solid whitesmoke"
    }
});

export default GeneralStyles;
