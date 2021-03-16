import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from './layout.stories';

test('renders Header', () => {
  render(<Default />);
  const linkElement = screen.getByTestId('header-logo');
  expect(linkElement).toBeInTheDocument();
});
