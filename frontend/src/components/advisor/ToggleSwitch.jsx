import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleButton = styled.div`
  width: 100px;
  height: 50px;
  background-color: ${({ $toggled }) => ($toggled ? '#4caf50' : '#ccc')}; /* 배경색 변경 */
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  transition: background-color 0.3s;
`;

const ToggleCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: ${({ $toggled }) => ($toggled ? 'translateX(50px)' : 'translateX(0)')};
`;

function ToggleSwitch() {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled((prev) => !prev);
  };

  return (
    <ToggleButton $toggled={toggled} onClick={handleToggle}>
      <ToggleCircle $toggled={toggled} />
    </ToggleButton>
  );
}

export default ToggleSwitch;
