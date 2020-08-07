import GeneralStyles from "shared/GeneralStyles";

const ITableStyle = theme => ({
    ...GeneralStyles,
    table: {
        minWidth: 650
    },
    loader: {
        minHeight: 150,
        width: "100%"
    },
    collapseTableCell: {
        paddingBottom: 0,
        paddingTop: 0,
        border: "none"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    selectedRow: {
        backgroundColor: "rgba(0, 0, 0, 0.04)"
    }
});

export default ITableStyle;
