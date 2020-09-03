import { combineReducers } from 'redux';
import * as Counter from './Counter';
import * as Authentication from './Authentication';
import * as User from './User';
import * as Account from './Account';

const createRootReducer = () => combineReducers({
  counter: Counter.reducer,
  authentication: Authentication.reducer,
  account: Account.reducer,
  user: User.reducer
})

export default createRootReducer;