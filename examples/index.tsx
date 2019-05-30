import React from 'react';
import renderer from '../lib/index';

import Original from './original';

const App = () => {
  return (
    <React.Fragment>
      <Original />
    </React.Fragment>
  );
};

renderer.render(<App />);
