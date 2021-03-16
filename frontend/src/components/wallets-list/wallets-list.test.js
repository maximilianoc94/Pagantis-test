import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { Default, Loading } from './wallets-list.stories';
import { LOADING_WALLETS_AMOUNT } from '../../utils';
import mockWalletsList from './mock-data';

test('renders Wallet list with 4 items', () => {
  render(
    <Provider store={store}>
      <Default {...Default.args} />
    </Provider>,
  );
  const elements = screen.getAllByTestId('wallet-card');
  expect(elements.length).toEqual(mockWalletsList.length);
});

test('renders loading wallet list with fixed amount of cards', () => {
  render(<Loading {...Loading.args} />);
  const elements = screen.getAllByTestId('skeleton-wallet');
  expect(elements.length).toEqual(LOADING_WALLETS_AMOUNT);
});
