import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';

describe('App', () => {
  describe('initial render', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise(() => {})),
      ); // never resolves
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('renders the h1 element', () => {
      render(<App />);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders 5 animals in the list', () => {
      render(<App />);

      const listElement = screen.getByRole('list');
      const listItems = screen.getAllByRole('listitem');

      expect(listElement).toHaveClass('animals');
      expect(listItems).toHaveLength(5);
    });
  });

  describe('async fetch behavior', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('shows the loading text while the request is in progress', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => new Promise(() => {})), // never resolves
      );

      render(<App />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the user after fetch resolves', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve({ name: 'Jack', email: 'jack@email.com' }),
          }),
        ),
      );

      render(<App />);
      expect(await screen.findByText('Jack')).toBeInTheDocument();
      expect(screen.getByText('jack@email.com')).toBeInTheDocument();
    });

    it('shows an error message when fetch rejects', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn(() => Promise.reject(new Error('API is down'))),
      );

      render(<App />);
      expect(await screen.findByText('API is down')).toBeInTheDocument();
    });
  });
});
