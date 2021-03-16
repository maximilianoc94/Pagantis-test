import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default, WithValues } from './transaction-card.stories';

test('renders empty transaction card', () => {
  render(<Default />);
  const linkElement = screen.getByTestId('transaction-card');
  expect(linkElement).toBeInTheDocument();
});

test('renders transaction card with select values', () => {
  render(<WithValues {...WithValues.args} />);
  const linkElement = screen.getByTestId('select-items');
  expect(linkElement).toBeInTheDocument();
});
