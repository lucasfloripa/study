import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ReservationEdit } from './pages';

export function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route
          path="/reservation/:reservationId"
          element={<ReservationEdit />}
        />
      </Routes>
    </BrowserRouter>
  );
}
