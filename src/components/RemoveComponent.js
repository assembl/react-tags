import React from 'react';
import PropTypes from 'prop-types';

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props) => {
  const { isAdmin, removeComponent, onClick, className } = props;
  if (!isAdmin) {
    return null;
  }

  if (removeComponent) {
    const Component = removeComponent;
    return <Component {...props} />;
  }

  return (
    <a onClick={onClick} className={className} onKeyDown={onClick}>
      {crossStr}
    </a>
  );
};

RemoveComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  removeComponent: PropTypes.func,
};

export default RemoveComponent;
