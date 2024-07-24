import React from "react";
import styled from "styled-components";
import "./KioskNavbar.css";

const Logo = styled.div`
  font-size: 40px;
  color: rgb(102, 102, 255);
  font-family: "Alfa Slab One", serif;
  font-weight: 400;
  font-style: normal;
`;

function Navbar({ onClick }) {
  return (
    <div>
      <Logo onClick={onClick}>Pinokio</Logo>
    </div>
  );
}

export default Navbar;
