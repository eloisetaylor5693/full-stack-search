import HomePage from './components/homePage';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HotelDetailsPage from './components/hotelDetailsPage';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
