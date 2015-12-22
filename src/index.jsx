import React                             from 'react';
import ReactDOM                          from 'react-dom';
import thunkMiddleware                   from 'redux-thunk';
import { createStore, applyMiddleware }  from 'redux';
import { Provider }                      from 'react-redux';
import reducer                           from './reducers/reducer';
import { AppContainer }                  from './containers/app';

// because we're using webpack to bundle and process with sass: 
require('./styles/main.scss');

// we need the thunk middleware so we can have async (eg, ajax calls) actions passed to the store. See actions/ for examples
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>  
    <AppContainer />
  </Provider>,
  document.getElementById('app')
);
