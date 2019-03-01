import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const plusStr = String.fromCharCode(43);

const AddComponent = (props) => {
  const { isAdmin, addComponent, className } = props;
  if (!isAdmin) {
    return null;
  }

  if (addComponent) {
    const Component = addComponent;
    return <Component {...props} />;
  }

  return (
    <span className={ClassNames('icon-input', className)}>
      {plusStr}
    </span>
  );
};

AddComponent.propTypes = {
  className: PropTypes.string,
  isAdmin: PropTypes.bool,
  addComponent: PropTypes.func,
};

export default AddComponent;
