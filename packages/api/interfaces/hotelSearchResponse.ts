import { Hotel } from './hotel';

export interface HotelSearchResponse {
  hotels: Hotel[];
  cities: string[];
  countries: string[];
}
