import Axios from 'axios';
import { BASE_URL } from './constants';

const PATH = `${BASE_URL}/wallets`;

function getUserWallets(userId) {
  return Axios.get(`${PATH}?user=${userId}`);
}

function getWalletsSelect() {
  return Axios.get(`${PATH}/select`);
}

function createTransactions(body) {
  return Axios.post(`${PATH}/transaction`, body);
}

export default {
  createTransactions,
  getUserWallets,
  getWalletsSelect,
};
