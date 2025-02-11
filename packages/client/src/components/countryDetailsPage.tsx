import { useEffect, useState } from 'react';
import { API_URL } from '../utils/ApiUrl';
import { useParams } from 'react-router-dom';
import { Country } from '../interfaces/country';

const CountryDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    fetch(`${API_URL}/country/${id}`)
      .then((response) => response.json())
      .then((data) => setCountry(data as Country));
  });

  return (
    <div>
      {country && <h1>{country.country}</h1>}

      {!country && <p>Could not found any countries with the ID {id}</p>}
    </div>
  );
};

export default CountryDetailsPage;
