import { createStore, applyMiddleware, compose } from 'redux';
import reducer                                   from '../reducers/reducer';
import DevTools                                  from '../containers/DevTools';
import thunkMiddleware                           from 'redux-thunk';

const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState);

  return store;
}  
