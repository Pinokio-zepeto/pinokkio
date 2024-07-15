import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import CarouselPage from "./CarouselPage";
import MenuPage from "./younger/MenuPage";
import ElderMenuPage from "./elder/ElderMenuPage";

import PaymentPage from "./younger/PaymentPage";
import ReceiptPage from "./younger/ReceiptPage";

function Kiosk() {
  return (
    <div className="Kiosk">
      <Router>
        <Routes>
          <Route path="/" element={<CarouselPage />} />
          <Route path="/eldermenu" element={<ElderMenuPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Kiosk;
