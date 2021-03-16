import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { Default, Loading } from './user-list.stories';
import { LOADING_CARDS_AMOUNT } from '../../utils';
import mockUserList from './mock-data';

test('renders user list with 5 items', () => {
  render(
    <Provider store={store}>
      <Default {...Default.args} />
    </Provider>,
  );
  const elements = screen.getAllByTestId('user-card');
  expect(elements.length).toEqual(mockUserList.length);
});

test('renders loading user list with fixed amount of cards', () => {
  render(
    <Provider store={store}>
      <Loading {...Loading.args} />
    </Provider>,
  );
  const elements = screen.getAllByTestId('skeleton-card');
  expect(elements.length).toEqual(LOADING_CARDS_AMOUNT);
});
