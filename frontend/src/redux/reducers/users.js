import { STORE_USERS, SELECT_USER } from '../types';

const initialState = {
  users: [],
  current: null,
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_USERS:
      return {
        ...state,
        list: action.payload,
      };
    case SELECT_USER:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
}
