import React from 'react';
import styled from 'styled-components';
import coffeeImage from '../../assets/coffee_image.png';

const MMC = styled.div`
  background: white;
  width: 100px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

function MenuMainCard({ menu, setSelectedMenu, setModal }) {
  const handleClick = () => {
    setModal(true);
    setSelectedMenu(menu);
  };

  return (
    <MMC onClick={handleClick}>
      <Image src={coffeeImage} />
      {menu}
    </MMC>
  );
}

export default MenuMainCard;
