import { combineReducers } from 'redux';
import * as Counter from './Counter';
import * as Authentication from './Authentication';
import * as User from './User';
import * as Password from './Password';

const createRootReducer = () => combineReducers({
  counter: Counter.reducer,
  authentication: Authentication.reducer,
  password: Password.reducer,
  user: User.reducer
})

export default createRootReducer;