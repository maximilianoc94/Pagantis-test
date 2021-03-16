import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import TransactionCard from '../transaction-card';
import { saveUserWallets } from '../../redux/actions';
import { LAST_FOUR_DIGITS, currencyFormat, xClasses } from '../../utils';
import classes from './transaction-modal.module.scss';
import CoinIcon from '../coin';
import walletsService from '../../services/wallets.service';

export function EndScreen({ loading, state, handleClose, reset }) {
  if (loading) {
    return (
      <>
        <span>Sending PagaCoins. Please Wait.</span>
        <CircularProgress />
      </>
    );
  }

  if (state === 'success') {
    return (
      <>
        <CheckCircleOutlineIcon style={{ color: green[500], fontSize: 100 }} />
        <span>Operation Successful!</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            reset();
            handleClose();
          }}
        >
          Continue
        </Button>
      </>
    );
  }

  if (state === 'error') {
    return (
      <>
        <ErrorOutlineIcon color="secondary" style={{ fontSize: 100 }} />
        <span>Failed to complete the transactions. Operation Canceled.</span>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            reset();
            handleClose();
          }}
        >
          Continue
        </Button>
      </>
    );
  }
}

EndScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  state: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export function TransactionModal({
  storedUser,
  currentWallet,
  isOpen,
  handleClose,
  storeUserWallets,
}) {
  const [transactionsList, setTransactionsList] = useState([
    { toWallet: '', amount: 0 },
  ]);
  const [availableAmount, setAvailableAmount] = useState(currentWallet.coins);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const transactionsTotalAmount = transactionsList.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );
    const currentAvailableAmount =
      currentWallet.coins - transactionsTotalAmount;
    setAvailableAmount(currentAvailableAmount);
  }, [transactionsList, currentWallet.coins]);

  const updateTransaction = useCallback(
    (index, field, value) => {
      const listCopy = _.cloneDeep(transactionsList);
      listCopy[index][field] = value;
      setTransactionsList(listCopy);
    },
    [transactionsList],
  );

  function addNewTransaction() {
    const listCopy = _.cloneDeep(transactionsList);
    listCopy.push({ toWallet: '', amount: 0 });
    setTransactionsList(listCopy);
  }

  function deleteTransaction(id) {
    const listCopy = _.cloneDeep(transactionsList);
    listCopy.splice(id, 1);
    setTransactionsList(listCopy);
  }

  function sendTransactions() {
    if (
      transactionsList.every(
        (transaction) => transaction.toWallet && transaction.amount > 0,
      )
    ) {
      const requestBody = {
        fromWallet: currentWallet.hash,
        transactions: transactionsList,
      };
      setLoading(true);
      walletsService
        .createTransactions(requestBody)
        .then(async () => {
          const { data } = await walletsService.getUserWallets(storedUser.id);
          storeUserWallets(data);
          setLoading(false);
          setShowEndScreen('success');
        })
        .catch(() => {
          setLoading(false);
          setShowEndScreen('error');
        });
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      data-testid="transaction-modal"
    >
      <Fade in={isOpen}>
        <div
          className={xClasses(
            classes.paper,
            showEndScreen ? classes.endScreen : '',
          )}
        >
          {showEndScreen && (
            <EndScreen
              loading={loading}
              state={showEndScreen}
              handleClose={handleClose}
              reset={() => {
                setShowEndScreen(false);
              }}
            />
          )}
          {!showEndScreen && (
            <>
              <h2 className={classes.ownerName}>{storedUser?.name}</h2>
              <div className={classes.walletDescription}>
                <h3 className={classes.walletHash}>
                  Wallet *{currentWallet.hash.substr(LAST_FOUR_DIGITS)}
                </h3>
                <h3
                  className={xClasses(
                    classes.walletHash,
                    availableAmount < 0 ? 'red-txt' : '',
                  )}
                >
                  {currencyFormat(availableAmount)}
                  <CoinIcon />
                </h3>
              </div>
              <div className={classes.transactionsList}>
                {transactionsList.map((transaction, i) => (
                  <TransactionCard
                    key={transaction.toWallet || i}
                    currentHash={currentWallet.hash}
                    transaction={transaction}
                    index={i}
                    updateTransaction={updateTransaction}
                    deleteTransaction={() => {
                      deleteTransaction(i);
                    }}
                  />
                ))}
                <div className={classes.btnGroup}>
                  <Button
                    onClick={addNewTransaction}
                    variant="outlined"
                    color="primary"
                    endIcon={<AddIcon />}
                    className="margin-top-10"
                  >
                    Add more transactions
                  </Button>
                  <Button
                    disabled={
                      !transactionsList.every(
                        (transaction) =>
                          transaction.toWallet && transaction.amount > 0,
                      ) || availableAmount < 0
                    }
                    onClick={sendTransactions}
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    className="margin-top-10"
                  >
                    Send PagaCoins
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Fade>
    </Modal>
  );
}

const userPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
});

TransactionModal.propTypes = {
  storedUser: userPropType,
  currentWallet: PropTypes.shape({
    user_id: PropTypes.string,
    hash: PropTypes.string,
    coins: PropTypes.number,
  }),
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  storeUserWallets: PropTypes.func,
};

TransactionModal.defaultProps = {
  currentWallet: {
    user_id: '1',
    hash: 'TestWalletHash',
    coins: 20.95,
  },
  storedUser: null,
  isOpen: false,
  storeUserWallets: () => {},
};

const mapStateToProps = (store) => ({
  storedUser: store.users.current,
});

export default React.memo(
  connect(mapStateToProps, { storeUserWallets: saveUserWallets })(
    TransactionModal,
  ),
);
