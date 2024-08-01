import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.div`
  padding-left: 1vw;
  padding-top: 1vh;
  font-size: 3vh;
  color: #7392ff;
  font-family: 'Alfa Slab One', serif;
  font-weight: 400;
  font-style: normal;
`;

const ReceiptButton = styled.button`
  width: 100px;
  height: 25px;
  font-size: 10px;
  margin-top: 600px;
`;

function PaymentPage() {
  const navigate = useNavigate();

  const goReceipt = () => {
    navigate('/kiosk/receipt');
  };

  return (
    <>
      <Logo>Pinokio</Logo>
      <ReceiptButton onClick={goReceipt}>영수증 출력</ReceiptButton>
    </>
  );
}

export default PaymentPage;
