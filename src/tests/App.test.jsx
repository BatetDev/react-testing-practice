import { render, screen, waitFor } from '@testing-library/react';
import { vi, expect, test } from 'vitest';
import App from '../App';

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

test('renders the user after fetch resolves', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => {
      const user = { name: 'Jack', email: 'jack@email.com' };
      return Promise.resolve({
        json: () => Promise.resolve(user),
      });
    }),
  );

  render(<App />);

  expect(await screen.findByText('Jack')).toBeInTheDocument();
  expect(screen.getByText('jack@email.com')).toBeInTheDocument();
});

test('loading text is shown while API request is in progress', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ name: 'Jack', email: 'j@x.com' }),
      }),
    ),
  );

  render(<App />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() =>
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
  );
});
