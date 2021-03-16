import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import UserList from '../../components/user-list';
import { storeUsers } from '../../redux/actions';
import UsersService from '../../services/users.service';

function UsersPage({ users, saveUsers }) {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    UsersService.getAllUsers()
      .then((response) => {
        if (response.data) {
          saveUsers(response.data);
          setLoading(false);
        }
      })
      .catch(() => {
        addToast('Unexpected error fetching users list', {
          appearance: 'error',
        });
      });
  }, [addToast, saveUsers]);

  return (
    <div className="page-container page">
      <h2>Welcome, Admin</h2>
      <h4>{"Here's your user list: "}</h4>
      <UserList loading={loading} users={users} />
    </div>
  );
}
UsersPage.propTypes = {
  /** Users list supplied by the store */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isFav: PropTypes.bool.isRequired,
    }),
  ),
  /** ActionCreator to save users in the store */
  saveUsers: PropTypes.func.isRequired,
};

UsersPage.defaultProps = {
  users: [],
};

const mapStateToProps = (state) => ({ users: state.users.list });

export default connect(mapStateToProps, { saveUsers: storeUsers })(UsersPage);
