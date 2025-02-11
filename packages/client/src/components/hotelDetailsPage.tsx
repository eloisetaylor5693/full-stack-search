import { useEffect, useState } from 'react';
import { Hotel } from '../interfaces/hotel';
import { API_URL } from '../utils/ApiUrl';
import { useParams } from 'react-router-dom';

const HotelDetailsPage = (): JSX.Element => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel>();

  useEffect(() => {
    fetch(`${API_URL}/hotel/${id}`).then((hotelResponse) => {
      hotelResponse.json().then((hotelInfo) => setHotel(hotelInfo as Hotel));
    });
  });

  return (
    <div>
      {hotel && <h1>{hotel.hotel_name}</h1>}

      {!hotel && <p>Could not found any hotels with the ID {id}</p>}
    </div>
  );
};

export default HotelDetailsPage;
