import React from 'react';
import PropTypes from 'prop-types';

const App = ({
  demo,
  toggleDemo,
}) => (
  <div>
    <span>Demo is {demo ? 'true' : 'false'}.</span>
    <button
      onClick={() => {
        toggleDemo();
      }}
    >
      Toggle
    </button>
  </div>
);

App.propTypes = {
  demo: PropTypes.bool.isRequired,
  toggleDemo: PropTypes.func.isRequired,
};

export default App;
