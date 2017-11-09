import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const buttonStyle = {
  fontFamily: 'Source Code Pro',
  fontSize: 'inherit',
  background: 'none',
  border: '2px solid black',
};

const Button = ({ to, children }) => (
  <Link to={to}>
    <button style={buttonStyle}>
      {children}
    </button>
  </Link>
);

Button.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  to: null,
};

export default Button;
