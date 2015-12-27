import React                             from 'react';
import ReactDOM                          from 'react-dom';
import thunkMiddleware                   from 'redux-thunk';
import { createStore, applyMiddleware }  from 'redux';
import { Provider }                      from 'react-redux';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import reducer                           from './reducers/reducer';
import App                               from './containers/App';
import AppContainer from './containers/AppContainer';
import Another from './components/AnotherComponent';

// because we're using webpack to bundle and process with sass: 
require('./styles/main.scss');

// we need the thunk middleware so we can have async (eg, ajax calls) actions passed to the store. See actions/ for examples
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

let history = createHistory();

ReactDOM.render(
  <Provider store={store}>  
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route path="app" component={App}/>
        <Route path="another" component={Another}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
