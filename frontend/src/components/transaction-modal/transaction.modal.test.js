import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Default } from './transaction-modal.stories';
import store from '../../redux/store';

test('renders empty transaction card', () => {
  render(
    <Provider store={store}>
      <Default {...Default.args} />
    </Provider>,
  );
  const linkElement = screen.getByTestId('transaction-modal');
  expect(linkElement).toBeInTheDocument();
});
