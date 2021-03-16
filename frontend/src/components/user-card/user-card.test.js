import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default, Faved, Loading } from './user-card.stories';

test('renders default card', () => {
  render(<Default {...Default.args} />);
  const linkElement = screen.getByText(/Adela Antúnez/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders faved card', () => {
  render(<Faved {...Faved.args} />);
  const linkElement = screen.getByTestId('faved');
  expect(linkElement).toBeInTheDocument();
});

test('renders loading skeleton card', () => {
  render(<Loading {...Loading.args} />);
  const linkElement = screen.getByTestId('skeleton-card');
  expect(linkElement).toBeInTheDocument();
});
