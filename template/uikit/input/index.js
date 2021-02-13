import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

const Input = (props) => {
  const mode = props.disabled ? 'input-disabled' : `input-${props.variant}`;
  const className = ['in-input', `input-${props.size}`, mode].join(' ');
  return (
    <input {...props} className={className} style={{ width: props.width }}/>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  width: PropTypes.string,
};

Input.defaultProps = {
  placeholder: 'Text Input...',
  disabled: false,
  size: 'medium',
  variant: 'secondary',
  width: '100%',
};

export default Input;
