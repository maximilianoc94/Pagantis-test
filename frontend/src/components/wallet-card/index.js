import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from 'react-loading-skeleton';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Button } from '@material-ui/core';
import classes from './wallet-card.module.scss';
import CoinIcon from '../coin';
import {
  currencyFormat,
  LAST_FOUR_DIGITS,
  MOBILE_BREAKPOINT,
  xClasses,
} from '../../utils';
import TransactionModal from '../transaction-modal';
import { useScreenSize } from '../../hooks';

/** Displays the wallets summary */
export function WalletCard({ walletHash, coinsAmount, loading }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const [coinFlip, setCoinFlip] = useState('');

  const screenSize = useScreenSize();

  if (loading) {
    return (
      <Card className={classes.root} data-testid="skeleton-wallet">
        <CardContent className={classes.cardContent}>
          <div className={classes.titleWrapper}>
            <Skeleton height={36} width={300} />
          </div>
          <div className="justify-end">
            <Skeleton height={36} width={200} />
          </div>
          <div className="justify-end">
            <Skeleton height={36} width={100} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={classes.root} data-testid="wallet-card">
      <CardContent className={classes.cardContent}>
        <div className={classes.titleWrapper}>
          {screenSize.width > MOBILE_BREAKPOINT
            ? walletHash
            : `****${walletHash.substr(LAST_FOUR_DIGITS)}`}
        </div>
        <div className={xClasses(classes.coinsWrapper, 'justify-end')}>
          {currencyFormat(coinsAmount)}
          <CoinIcon
            className={coinFlip}
            onAnimationEnd={() => {
              setCoinFlip('');
            }}
            onClick={() => {
              setCoinFlip((animationState) =>
                animationState ? '' : classes.animateCoin,
              );
            }}
          />
        </div>
        <div className="justify-end">
          <Button
            variant="contained"
            color="primary"
            size="small"
            endIcon={<DoubleArrowIcon />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Transfer
          </Button>
          <TransactionModal
            currentWallet={{
              hash: walletHash,
              coins: coinsAmount,
            }}
            isOpen={isModalOpen}
            handleClose={() => {
              setModalOpen(false);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

WalletCard.propTypes = {
  /** The identifier hash of the wallet  */
  walletHash: PropTypes.string,
  /** The amount of coins currently held on the wallet */
  coinsAmount: PropTypes.number,
  /** Display loading skeleton */
  loading: PropTypes.bool,
};

WalletCard.defaultProps = {
  walletHash: '',
  coinsAmount: 0,
  loading: false,
};

export default React.memo(WalletCard);
