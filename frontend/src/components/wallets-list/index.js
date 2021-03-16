import React from 'react';
import PropTypes from 'prop-types';
import classes from './wallets-list.module.scss';
import { WalletCard } from '../wallet-card';
import { useScreenSize } from '../../hooks';
import {
  LOADING_WALLETS_AMOUNT,
  MOBILE_BREAKPOINT,
  xClasses,
} from '../../utils';

/** Container to display a list of wallets for a given user */
export function WalletsList({ wallets, loading }) {
  const screenSize = useScreenSize();

  const list = loading
    ? [...new Array(LOADING_WALLETS_AMOUNT)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <WalletCard loading key={i} />
      ))
    : wallets.map((wallet) => (
        <WalletCard
          key={wallet.hash}
          walletHash={wallet.hash}
          coinsAmount={wallet.coins}
        />
      ));
  return (
    <div className={classes.listContainer}>
      {screenSize.width > MOBILE_BREAKPOINT && (
        <div className={classes.listHeader}>
          <div className={classes.hashHeader}>Wallet Hash</div>
          <div className={xClasses(classes.coinHeader)}>PagaCoins</div>
          <div style={{ width: 120 }} />
        </div>
      )}
      <div className={classes.listWrapper}>{list}</div>
    </div>
  );
}

WalletsList.propTypes = {
  /** List of user's active wallets */
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      hash: PropTypes.string,
      coins: PropTypes.number,
    }),
  ),
  /** Display loading skeleton */
  loading: PropTypes.bool,
};

WalletsList.defaultProps = {
  wallets: [],
  loading: false,
};

export default React.memo(WalletsList);
