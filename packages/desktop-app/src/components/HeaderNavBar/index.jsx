import React from 'react';

const headerNavBarContainerStyle = {
  background: '#29272e',
  WebkitAppRegion: 'drag',
  height: '30px',
  textAlign: 'center',
};

const logoTextStyle = {
  color: '#fff',
  fontSize: '14px',
  marginTop: '5px',
};

export default () => (
  <div style={headerNavBarContainerStyle}>
    <div style={logoTextStyle}>Code Companion</div>
  </div>
);
