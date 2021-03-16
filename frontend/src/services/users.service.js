import Axios from 'axios';
import { BASE_URL } from './constants';

const PATH = `${BASE_URL}/users`;

function getAllUsers() {
  return Axios.get(`${PATH}`);
}

function updateUserFav(id, isFav) {
  return Axios.put(`${PATH}?id=${id}`, { isFav });
}

function getUser(id) {
  return Axios.get(`${PATH}?id=${id}`);
}

export default {
  getAllUsers,
  updateUserFav,
  getUser,
};
