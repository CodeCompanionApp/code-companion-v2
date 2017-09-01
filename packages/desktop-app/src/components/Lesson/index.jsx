import React from 'react';

export default props => (
  <div>
    <p>This is a lesson!</p>
    <pre>
      {JSON.stringify(props)}
    </pre>
  </div>
);
