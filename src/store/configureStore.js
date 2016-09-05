import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers/reducer';

export default (initialState = {}) => {
  const middleWare = [thunk];

  const enhancers = [];
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleWare),
      ...enhancers
    )
  )

  return store
}
