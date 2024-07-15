import React from "react";
import { Router, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

function PaymentPage() {
  const navigate = useNavigate();

  const goReceipt = () => {
    navigate("/receipt");
  };

  return (
    <div className="PaymentPage">
      this is payment-page
      <Button onClick={goReceipt} text="영수증 출력" />
    </div>
  );
}

export default PaymentPage;
