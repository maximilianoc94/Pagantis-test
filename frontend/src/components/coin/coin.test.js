import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from './coin.stories';

test('renders coin icon', () => {
  render(<Default />);
  const linkElement = screen.getByTestId('coin-icon');
  expect(linkElement).toBeInTheDocument();
});
