import React from 'react';
import PropTypes from 'prop-types';

const plusStr = String.fromCharCode(43);

const AddComponent = (props) => {
  const { isAdmin, addComponent, onClick, className } = props;
  if (!isAdmin) {
    return null;
  }

  if (addComponent) {
    const Component = addComponent;
    return <Component {...props} />;
  }

  return (
    <button onClick={onClick} className={className} >
      {plusStr}
    </button>
  );
};

AddComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  addComponent: PropTypes.func,
};

export default AddComponent;
