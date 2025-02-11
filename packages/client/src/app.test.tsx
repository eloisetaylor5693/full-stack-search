import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App, { Hotel } from './app';
import { HotelSearchResponse } from './interfaces/hotelSearchResponse';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

describe('Search page', () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  test('renders search input', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Search accommodation...');
    expect(input).toBeInTheDocument();
  });

  describe('When user enters a search term', () => {
    const searchTerm = 'marriot';

    describe('and there are maatching hotels', () => {
      const mockHotelsResponse: HotelSearchResponse = {
        cities: [],
        countries: [],
        hotels: [
          {
            _id: '123',
            chain_name: 'Marriott',
            hotel_name: 'Sheraton Grand Hotel & Spa, Edinburgh',
            city: 'Edinburgh',
            country: 'United Kingdom',
          },
        ],
      };

      test('renders a hotel in the search results', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockHotelsResponse));

        render(<App />);
        let input: HTMLInputElement = screen.getByPlaceholderText(
          'Search accommodation...',
        );

        await fireEvent.change(input, { target: { value: searchTerm } });

        input = screen.getByPlaceholderText('Search accommodation...');
        expect(input.value).toBe(searchTerm);

        const searchTearmInSearchBox =
          await screen.getByDisplayValue(searchTerm);
        expect(searchTearmInSearchBox).toBeVisible();

        await waitFor(() => {
          const hotelHeading = screen.getByText('Hotels');
          expect(hotelHeading).toBeVisible();

          const matchingHotel = screen.getByText(
            'Sheraton Grand Hotel & Spa, Edinburgh',
          );
          expect(matchingHotel).toBeVisible();

          const countriesNotMatchedText = screen.getByText(
            'No countries matched',
          );
          expect(countriesNotMatchedText).toBeVisible();

          const citiesNotMatchedText = screen.getByText('No cities matched');
          expect(citiesNotMatchedText).toBeVisible();
        });
      });
    });
  });
});
