import React from "react";
import PropTypes from "prop-types";

export default function ForceUnMount(props) {
  const [component, setComponent] = React.useState(null);

  React.useEffect(() => {
    if (props.mount) {
      setComponent(props.children);
    }
    if (!props.mount) {
      setComponent(null);
    }
  }, [props.mount, props.children]);

  return component;
}

ForceUnMount.propTypes = {
  mount: PropTypes.bool.isRequired,
};
