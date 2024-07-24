import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CarouselPage from './CarouselPage';
import MenuPage from './younger/MenuPage';
import PaymentPage from './younger/PaymentPage';
import ReceiptPage from './younger/ReceiptPage';
import ElderMenuPage from './elder/ElderMenuPage';
import ElderPaymentPage from './elder/ElderPaymentPage';
import ElderReceiptPage from './elder/ElderReceiptPage';
import LoadingPage from './elder/LoadingPage';
import styled from 'styled-components';
const KioskForm = styled.div`
  background-color: black;
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function KioskIndex() {
  return (
    <KioskForm>
      <div style={{ width: '50%' }}>
        <Routes>
          <Route path="/" element={<CarouselPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="receipt" element={<ReceiptPage />} />
          <Route path="elde-rmenu" element={<ElderMenuPage />} />
          <Route path="elder-payment" element={<ElderPaymentPage />} />
          <Route path="elder-receipt" element={<ElderReceiptPage />} />
          <Route path="loading" element={<LoadingPage />} />
        </Routes>
      </div>
    </KioskForm>
  );
}

export default KioskIndex;
