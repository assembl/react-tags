import React from 'react';
import PropTypes from 'prop-types';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { isAdmin, removeComponent, className } = props;
  if (!isAdmin) {
    return null;
  }

  if (removeComponent) {
    const Component = removeComponent;
    return <Component {...props} />;
  }

  return (
    <span className={className}>
      {crossStr}
    </span>
  );
};

RemoveComponent.propTypes = {
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
  removeComponent: PropTypes.func,
};

export default RemoveComponent;
