import { SAVE_WALLETS_SELECT, SAVE_USER_WALLETS } from '../types';

const initialState = {
  select: {},
  list: [],
};

export default function UsersReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_WALLETS_SELECT:
      return {
        ...state,
        select: action.payload,
      };
    case SAVE_USER_WALLETS:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
