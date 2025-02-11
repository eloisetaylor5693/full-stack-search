import { City } from './city';
import { Country } from './country';

export interface HotelSearchResponse {
  hotels: any[];
  cities: City[];
  countries: Country[];
}
