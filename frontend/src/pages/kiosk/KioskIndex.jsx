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
  /* background-color: white;
  height: 150vh;*/
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f9;
`;

const KioskOutline = styled.div`
  background-color: black;
  height: 1500px;
  border-radius: 30px;
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`;

const KioskInline = styled.div`
  background-color: white;
  height: 1000px;
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function KioskIndex() {
  return (
    <KioskForm>
      <KioskOutline>
        <KioskInline>
          {/* <div style={{ width: '50%' }}> */}
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
          {/* </div> */}
        </KioskInline>
      </KioskOutline>
    </KioskForm>
  );
}

export default KioskIndex;
