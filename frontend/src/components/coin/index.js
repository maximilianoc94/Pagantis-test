import React, { useState } from 'react';

import classes from './coin.module.scss';
import { ReactComponent as CoinIcon } from '../../assets/icons/coin.svg';

/** Animated Coin component */
export function WalletCard() {
  const [coinFlip, setCoinFlip] = useState('');

  return (
    <div className={classes.coin}>
      <CoinIcon
        data-testid="coin-icon"
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
  );
}

export default React.memo(WalletCard);
