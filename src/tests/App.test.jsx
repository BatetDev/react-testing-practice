import { render, screen } from '@testing-library/react';
import { vi, expect, test, beforeEach, afterEach } from 'vitest';
import App from '../App';

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'Jack', email: 'jack@email.com' }),
      }),
    ),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

test('render h1 element', () => {
  render(<App />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});

test('list contains 5 animals', () => {
  render(<App />);

  const listElement = screen.getByRole('list');
  const listItems = screen.getAllByRole('listitem');

  expect(listElement).toBeInTheDocument();
  expect(listElement).toHaveClass('animals');
  expect(listItems).toHaveLength(5);
});

test('loading text is shown while API request is in progress', () => {
  render(<App />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders the user after fetch resolves', async () => {
  render(<App />);

  expect(await screen.findByText('Jack')).toBeInTheDocument();
  expect(screen.getByText('jack@email.com')).toBeInTheDocument();
});
