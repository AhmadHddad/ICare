import React from "react";
import PropTypes from "prop-types";
import {Grid, makeStyles, Card, CardContent, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    patientDetailsText: {
        marginBottom: 20
    },
    icon: {
        verticalAlign: "middle",
        marginBottom: 4,
        marginLeft: 8
    }
});

const propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    footer: PropTypes.any,
    icon: PropTypes.object,
    justify: PropTypes.string,
    alignItems: PropTypes.string,
    header: PropTypes.any
};

const defaultProps = {
    justify: "space-between",
    alignItems: "stretch"
};

export default function ICard(props) {
    const {title, children, icon: Icon, justify, alignItems, header} = props;
    const classes = useStyles(props);

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="row" justifyContent={justify} alignItems={alignItems}>
                    <Grid item>
                        <Typography
                            className={classes.patientDetailsText}
                            variant="h5"
                            gutterBottom
                            component="h2"
                            color="textSecondary"
                        >
                            {title}
                            {Icon && <Icon className={classes.icon} />}
                        </Typography>
                    </Grid>
                    {header}
                </Grid>
                {children}
            </CardContent>
        </Card>
    );
}

ICard.propTypes = propTypes;
ICard.defaultProps = defaultProps;
