import React          from 'react';
import { render }     from 'react-dom';

import configureStore from './store/configureStore';
import Root           from './rootIndex';

// because we're using webpack to bundle and process with sass: 
require('./styles/main.scss');

const store = configureStore();

render (
  <Root store={store} />,
  document.getElementById('app')
);
 
