import React from 'react';
import PropTypes from 'prop-types';
import './switch.css';

const Switch = (props) => {
  const className = [`slider-${props.variant}`, 'round'].join(' ');
  return (
    <div className='wrapper'>
      <label className='switch'>
        <input {...props} type='checkbox'/>
        <span className={className}></span>
      </label>
      <label className='text-label'>{props.label}</label>
    </div>
  );
};

Switch.propTypes = {
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  label: PropTypes.string,
};

Switch.defaultProps = {
  disabled: false,
  variant: 'secondary',
  label: 'Switch',
};

export default Switch;
