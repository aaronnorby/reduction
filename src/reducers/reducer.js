import {
  ACTION_ONE,
  ASYNC_ACTION_START,
  ASYNC_ACTION_END
} from '../actions/index'; 

const INITIAL_STATE = { 
  someProp: 'default',
  data: '',
  isFetching: false };

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTION_ONE:
      return Object.assign({}, state, {someProp: action.someProp});
    case ASYNC_ACTION_START:
      return Object.assign({}, state, {isFetching: true});
    case ASYNC_ACTION_END:
      return Object.assign({}, state, {isFetching: false, data: action.returnedData});
    default: 
      return state;
  }
}
