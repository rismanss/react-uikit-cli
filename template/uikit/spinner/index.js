import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

const Spinner = (props) => {
  const className = ['in-spinner', `spinner-${props.type}`, `spinner-${props.size}`, `spinner-${props.type}-${props.variant}`].join(' ');
  return (
    <div className={className}></div>
  );
};

Spinner.propTypes = {
  type: PropTypes.oneOf(['bounce', 'circle']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
};

Spinner.defaultProps = {
  type: 'circle',
  size: 'medium',
  variant: 'secondary',
};

export default Spinner;
