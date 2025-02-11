import { City } from './city';
import { Country } from './country';
import { Hotel } from './hotel';

export interface HotelSearchResponse {
  hotels: Hotel[];
  cities: City[];
  countries: Country[];
}
