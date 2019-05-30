import React from 'react';
import renderer from '../lib/index';

//import Original from './original';
import Jest from './jest';

const App = () => {
  return (
    <React.Fragment>
      <Jest />
    </React.Fragment>
  );
};

renderer.render(<App />);
