import {
  STORE_USERS,
  SELECT_USER,
  SAVE_WALLETS_SELECT,
  SAVE_USER_WALLETS,
} from './types';

export const storeUsers = (payload) => ({
  type: STORE_USERS,
  payload,
});

export const selectUser = (payload) => ({
  type: SELECT_USER,
  payload,
});

export const saveWalletsSelect = (payload) => ({
  type: SAVE_WALLETS_SELECT,
  payload,
});

export const saveUserWallets = (payload) => ({
  type: SAVE_USER_WALLETS,
  payload,
});
