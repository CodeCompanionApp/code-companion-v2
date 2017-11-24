import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function getStyle(ready) {
  const normal = { padding: '1rem 1rem' };
  const transition = 'all .2s ease-out';
  const transitionDelay = '1s';
  return ready
    ? {
      ...normal,
      opacity: 1,
      transition,
      transitionDelay,
    }
    : { ...normal, opacity: 0 };
}

const AppContentContainer = ({ ready, children }) => (
  <div style={getStyle(ready)}>
    {children}
  </div>
);

AppContentContainer.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

AppContentContainer.defaultProps = {
  ready: false,
};

export default connect(state => ({ ready: state.app.ready }))(AppContentContainer);
