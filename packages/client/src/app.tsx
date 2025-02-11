import HomePage from './components/homePage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HotelDetailsPage from './components/hotelDetailsPage';
import CityDetailsPage from './components/cityDetailsPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
