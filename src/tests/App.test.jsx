import { render, screen } from '@testing-library/react';
import App from '../App';
import { expect } from 'vitest';

test('render h1 element', () => {
  render(<App />);
  screen.debug();
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('list contains 5 animals', () => {
  render(<App />);

  const listElement = screen.getByRole('list');
  const listItems = screen.getAllByRole('listitem');

  expect(listElement).toBeInTheDocument();
  expect(listElement).toHaveClass('animals');
  expect(listItems.length).toEqual(5);
});
