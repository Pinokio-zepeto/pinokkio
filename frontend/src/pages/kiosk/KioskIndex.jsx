import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import CarouselPage from "./CarouselPage";
import MenuPage from "./younger/MenuPage";
import PaymentPage from "./younger/PaymentPage";
import ReceiptPage from "./younger/ReceiptPage";
import ElderMenuPage from "./elder/ElderMenuPage";
import ElderPaymentPage from "./elder/ElderPaymentPage";
import ElderReceiptPage from "./elder/ElderReceiptPage";
import LoadingPage from "./elder/LoadingPage";
import KioskNavbar from "../../components/common/KioskNavbar";

function AdvIndex() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };
  return (
    <div className="Adv-index">
      <KioskNavbar onClick={onClick} />
      this is kiosk index
      <Routes>
        <Route path="/" element={<CarouselPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="payment" element={<PaymentPage />} />
        <Route path="receipt" element={<ReceiptPage />} />
        <Route path="elder-menu" element={<ElderMenuPage />} />
        <Route path="elder-payment" element={<ElderPaymentPage />} />
        <Route path="elder-receipt" element={<ElderReceiptPage />} />
        <Route path="loading" element={<LoadingPage />} />
      </Routes>
    </div>
  );
}

export default AdvIndex;
