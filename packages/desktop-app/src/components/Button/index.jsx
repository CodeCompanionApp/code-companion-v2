import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './index.css';

const Button = ({
  to,
  onClick,
  disabled,
  children,
}) => (
  !to
    ?
      <button className={styles.button} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    :
      <Link to={to}>
        <button className={styles.button} disabled={disabled}>
          {children}
        </button>
      </Link>
);

Button.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  to: null,
  onClick: null,
  disabled: false,
};

export default Button;
