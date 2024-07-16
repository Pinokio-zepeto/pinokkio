import React from "react";
import { Router, Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import Menu from "../../../components/kiosk/Menu";

function ElderMenuPage() {
  const navigate = useNavigate();

  const goPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="MenuPage">
      this is menu-page
      <Menu />
      <Button onClick={goPayment} text="결제" />
    </div>
  );
}

export default ElderMenuPage;
