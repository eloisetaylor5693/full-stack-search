import HomePage from './components/homePage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HotelDetailsPage from './components/hotelDetailsPage';
import CityDetailsPage from './components/cityDetailsPage';
import CountryDetailsPage from './components/countryDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels/:id" element={<HotelDetailsPage />} />
        <Route path="/cities/:id" element={<CityDetailsPage />} />
        <Route path="/countries/:id" element={<CountryDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
