import React from 'react';
import PropTypes from 'prop-types';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import classes from './transaction-card.module.scss';
import { LAST_FOUR_DIGITS, TABLET_BREAKPOINT, xClasses } from '../../utils';
import { useScreenSize } from '../../hooks';

/** Input form to select the wallet where the PagaCoins are going */
export function TransactionCard({
  transaction,
  updateTransaction,
  index,
  deleteTransaction,
  wallets,
  currentHash,
}) {
  const screenSize = useScreenSize();

  function handleChange(field) {
    return function eventHandler(event, child) {
      if (field === 'amount' && !event.target.value.includes('-')) {
        updateTransaction(index, field, event.target.value);
      }

      if (field === 'toWallet') {
        updateTransaction(index, field, child.props.value);
      }
    };
  }
  return (
    <Card
      className={xClasses(classes.transactionRow, 'margin-top-10')}
      data-testid="transaction-card"
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Wallet Hash</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          value={transaction.toWallet}
          onChange={handleChange('toWallet')}
        >
          {Object.keys(wallets).map((userName) =>
            wallets[userName]
              .filter((hash) => hash !== currentHash)
              .map((hash) => (
                <MenuItem key={hash} value={hash}>
                  <span data-testid="select-items">
                    {`${userName} - ${hash.substr(LAST_FOUR_DIGITS)}`}
                  </span>
                </MenuItem>
              )),
          )}
        </Select>
      </FormControl>

      <TextField
        error={transaction.amount <= 0}
        helperText={
          transaction.amount <= 0 && screenSize.width > TABLET_BREAKPOINT
            ? "Amount can't be lower than 0"
            : ''
        }
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          type: 'number',
          inputProps: {
            min: 0,
          },
        }}
        value={transaction.amount}
        onChange={handleChange('amount')}
      />

      <Button color="secondary">
        <DeleteOutlineOutlinedIcon onClick={deleteTransaction} />
      </Button>
    </Card>
  );
}

TransactionCard.propTypes = {
  /** Current account hash */
  currentHash: PropTypes.string,
  /** Transaction values. toWallet: Wallet where the coins are going to be sent. Amount: Amount of coins */
  transaction: PropTypes.shape({
    toWallet: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  /** Position of the transaction in the array */
  index: PropTypes.number,
  /** Function to update the state of the transaction */
  updateTransaction: PropTypes.func,
  /** Function to delete the current transaction */
  deleteTransaction: PropTypes.func,
  wallets: PropTypes.shape({
    user_name: PropTypes.arrayOf(PropTypes.string),
  }),
};
TransactionCard.defaultProps = {
  currentHash: '',
  transaction: {
    toWallet: '',
    amount: 0,
  },
  index: null,
  updateTransaction: () => {},
  deleteTransaction: () => {},
  wallets: {},
};

const mapStateToProps = (state) => ({ wallets: state.wallets.select });

export default React.memo(connect(mapStateToProps)(TransactionCard));
