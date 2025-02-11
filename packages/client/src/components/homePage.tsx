import { useRef, useState, type ChangeEvent } from 'react';
import { Hotel } from '../interfaces/hotel';
import { City } from '../interfaces/city';
import { Country } from '../interfaces/country';
import { API_URL } from '../utils/ApiUrl';

function HomePage() {
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);

  const [showClearBtn, setShowClearBtn] = useState(false);

  const clearSearchResults = () => {
    //@ts-expect-error current is not null, and clear functionality works in the UI.  I can remove the HTMLInputElement typing but that doesn't include the value prop
    searchBoxRef.current.value = '';

    setHotels([]);
    setCities([]);
    setCountries([]);
  };

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setHotels([]);
      setCities([]);
      setCountries([]);
      setShowClearBtn(false);
      return;
    }

    const searchResponse = await fetch(
      `${API_URL}/hotels?freetext-search=${event.target.value}`,
    );
    const searchResults = await searchResponse.json();

    setShowClearBtn(true);
    setHotels(searchResults?.hotels);
    setCities(searchResults?.cities);
    setCountries(searchResults?.countries);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  ref={searchBoxRef}
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={fetchData}
                />
                {showClearBtn && (
                  <span className="left-pan" onClick={clearSearchResults}>
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>

              {(!!hotels?.length ||
                !!cities?.length ||
                !!countries?.length) && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {hotels.length ? (
                    hotels.map((hotel, index) => (
                      <li key={index}>
                        <a
                          href={`/hotels/${hotel._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-building mr-2"></i>
                          {hotel.hotel_name}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No hotels matched</p>
                  )}

                  <h2>Countries</h2>
                  {countries.length ? (
                    countries.map((country, index) => (
                      <li key={index}>
                        <a
                          href={`/country/${country._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-globe mr-2"></i>
                          {country.country}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No countries matched</p>
                  )}

                  <h2>Cities</h2>
                  {cities.length ? (
                    cities.map((city, index) => (
                      <li key={index}>
                        <a
                          href={`/cities/${city._id}`}
                          className="dropdown-item"
                        >
                          <i className="fa fa-map-marker mr-2"></i>
                          {city.name}
                        </a>
                        <hr className="divider" />
                      </li>
                    ))
                  ) : (
                    <p>No cities matched</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
