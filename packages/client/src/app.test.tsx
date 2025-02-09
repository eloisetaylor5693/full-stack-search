import { describe, expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import App from './app';

test('renders search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText('Search accommodation...');
  expect(input).toBeInTheDocument();
});

describe('When user enters a search term', () => {
  const searchTerm = 'marriot';

  test('renders text input by user in the input box', () => {
    render(<App />);
    let input: HTMLInputElement = screen.getByPlaceholderText(
      'Search accommodation...',
    );

    fireEvent.change(input, { target: { value: searchTerm } });

    input = screen.getByPlaceholderText('Search accommodation...');
    screen.debug();

    expect(input.value).toBe(searchTerm);

    const searchTearmInSearchBox = screen.getByDisplayValue(searchTerm);
    expect(searchTearmInSearchBox).toBeInTheDocument();
  });
});
