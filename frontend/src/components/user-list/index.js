import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { sortByFav, LOADING_CARDS_AMOUNT } from '../../utils';
import UserCard from '../user-card';
import { storeUsers } from '../../redux/actions';
import classes from './user-list.module.scss';
import usersService from '../../services/users.service';

/**
 * Display grid for multiple user cards
 */
export function UserList({ users, loading, saveUsers }) {
  const toggleFavorite = useCallback(
    (id) => {
      const usersCopy = _.cloneDeep(users);
      const indexOfUser = usersCopy.findIndex((element) => element.id === id);
      if (indexOfUser !== -1) {
        const toggledValue = !usersCopy[indexOfUser].isFav;
        usersCopy[indexOfUser].isFav = toggledValue;
        saveUsers(usersCopy);
        usersService.updateUserFav(id, toggledValue);
      }
    },
    [users, saveUsers],
  );

  const list = loading
    ? [...new Array(LOADING_CARDS_AMOUNT)].map((empty, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <UserCard loading key={i} id={String(i)} />
      ))
    : users
        .sort(sortByFav)
        .map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            image={user.image}
            title={user.name}
            isFav={user.isFav}
            description={user.description}
            toggleFavorite={toggleFavorite}
          />
        ));

  return <div className={classes.listContainer}>{list}</div>;
}

UserList.propTypes = {
  /** Action Creator to update users */
  saveUsers: PropTypes.func,
  /** Displays loading skeleton */
  loading: PropTypes.bool,
  /** List of users objects */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isFav: PropTypes.bool.isRequired,
    }),
  ),
};
UserList.defaultProps = {
  users: [],
  loading: false,
  saveUsers: () => {},
};

export default React.memo(connect(null, { saveUsers: storeUsers })(UserList));
