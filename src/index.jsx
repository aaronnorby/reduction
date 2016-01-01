import React                             from 'react';
import ReactDOM                          from 'react-dom';
import { createStore, applyMiddleware }  from 'redux';
import { Provider }                      from 'react-redux';
import App                               from './containers/App';
import configureStore                    from './store/configureStore';
import DevTools                          from './containers/DevTools';

// because we're using webpack to bundle and process with sass: 
require('./styles/main.scss');

//const store = createStoreWithMiddleware(reducer);
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>  
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('app')
);
