import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = (props) => {
  const mode = props.disabled ? 'button-disabled' : `button-${props.variant}`;
  const className = ['in-button', `button-${props.size}`, mode].join(' ');

  return (
    <button {...props} className={className} >
      {props.label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
};

Button.defaultProps = {
  label: 'Button',
  disabled: false,
  size: 'medium',
  variant: 'secondary',
};

export default Button;
