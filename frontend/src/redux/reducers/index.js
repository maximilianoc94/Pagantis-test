import { combineReducers } from 'redux';
import UsersReducer from './users';
import WalletsReducer from './wallets';

export default combineReducers({
  users: UsersReducer,
  wallets: WalletsReducer,
});
