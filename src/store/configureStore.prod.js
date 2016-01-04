import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import reducer                                   from '../reducers/reducer';

const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}
