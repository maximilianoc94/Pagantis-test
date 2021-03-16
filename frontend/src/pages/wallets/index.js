import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { Link } from '@reach/router';
import {
  selectUser,
  saveWalletsSelect,
  saveUserWallets,
} from '../../redux/actions';
import { WalletsList } from '../../components/wallets-list';
import WalletsService from '../../services/wallets.service';
import UsersService from '../../services/users.service';

function WalletsPage({
  userId,
  storeUser,
  userWallets,
  storeUserWallets,
  storeWalletsSelect,
}) {
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  useEffect(() => {
    WalletsService.getUserWallets(userId)
      .then((response) => {
        if (response.data) {
          storeUserWallets(response.data);
          setLoading(false);
        }
      })
      .catch(() => {
        addToast('Unexpected error fetching user wallets', {
          appearance: 'error',
        });
      });

    WalletsService.getWalletsSelect()
      .then((response) => {
        if (response.data) {
          storeWalletsSelect(response.data);
        }
      })
      .catch(() => {
        addToast('Unexpected error fetching wallets list', {
          appearance: 'error',
        });
      });

    if (userId != null) {
      UsersService.getUser(userId)
        .then(({ data }) => {
          if (data) {
            storeUser(data);
          }
        })
        .catch(() => {
          addToast('Unexpected error fetching selected user', {
            appearance: 'error',
          });
        });
    }
  }, [addToast, storeUser, storeUserWallets, storeWalletsSelect, userId]);

  return (
    <div className="page-container page">
      <Fade in>
        <Link to="/">
          <Button variant="outlined" color="primary">
            Go Back
          </Button>
        </Link>
      </Fade>
      <WalletsList wallets={userWallets} loading={loading} />
    </div>
  );
}

WalletsPage.propTypes = {
  /** Identifier of the user supplied via url param */
  userId: PropTypes.string,
  /** List of user's active wallets */
  userWallets: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string,
      coins: PropTypes.number,
    }),
  ),
  /** Action creator to store the user's wallets */
  storeUserWallets: PropTypes.func,
  /** Action creator to store users */
  storeUser: PropTypes.func,
  /** Action creator to store users */
  storeWalletsSelect: PropTypes.func,
};

WalletsPage.defaultProps = {
  userId: '',
  userWallets: [],
  storeUserWallets: () => {},
  storeUser: () => {},
  storeWalletsSelect: () => {},
};

const mapStateToProps = (state) => ({ userWallets: state.wallets.list });

export default connect(mapStateToProps, {
  storeUser: selectUser,
  storeWalletsSelect: saveWalletsSelect,
  storeUserWallets: saveUserWallets,
})(WalletsPage);
