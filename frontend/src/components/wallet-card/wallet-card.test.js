import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Default, Loading } from './wallet-card.stories';
import store from '../../redux/store';

test('renders default card', () => {
  render(
    <Provider store={store}>
      <Default {...Default.args} />
    </Provider>,
  );
  const linkElement = screen.getByTestId('wallet-card');
  expect(linkElement).toBeInTheDocument();
});

test('renders loading skeleton card', () => {
  render(<Loading {...Loading.args} />);
  const linkElement = screen.getByTestId('skeleton-wallet');
  expect(linkElement).toBeInTheDocument();
});
