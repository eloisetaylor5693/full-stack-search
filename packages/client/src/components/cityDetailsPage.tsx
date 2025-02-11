import { useEffect, useState } from 'react';
import { API_URL } from '../utils/ApiUrl';
import { useParams } from 'react-router-dom';
import { City } from '../interfaces/city';

const CityDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const [city, setCity] = useState<City>();

  useEffect(() => {
    fetch(`${API_URL}/city/${id}`)
      .then((response) => response.json())
      .then((data) => setCity(data as City));
  });

  return (
    <div>
      {city && <h1>{city.name}</h1>}

      {!city && <p>Could not found any cities with the ID {id}</p>}
    </div>
  );
};

export default CityDetailsPage;
