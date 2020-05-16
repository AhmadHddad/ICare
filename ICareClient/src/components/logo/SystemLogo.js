import React from "react";
import logo from "../../logo/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: 64
  },
  img: {
    width: "100%",
    height: "100%",
    color: "#3f51b5",
    "pointer-events": "none",
    "-webkit-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"
  }
});

export default function SystemLogo(props) {
  const classes = useStyles();
  return (
    <Tooltip title="ICARE">
      <div className={props.rootStyle || classes.root}>
        <img src={logo} className={props.imgStyle || classes.img} alt="logo" />
      </div>
    </Tooltip>
  );
}

SystemLogo.propTypes = {
  rootStyle: PropTypes.string,
  imgStyle: PropTypes.string
};
