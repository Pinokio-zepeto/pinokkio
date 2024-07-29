import React from 'react';
import styled from 'styled-components';

const MCC = styled.div`
  &:hover {
    font-weight: bold;
  }
  background-image: ${(props) =>
    props.cat === props.selectedcat ? 'linear-gradient(to top, #f9bc73 50%, white 50%)' : null};
  margin: 10px 0;
  font-family: 'PeoplefirstNeatLoudTTF';
  text-align: center;
  @font-face {
    font-family: 'PeoplefirstNeatLoudTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2406-2@1.0/PeoplefirstNeatLoudTTF.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

function MenuCategoryCard({ cat, setselectedcat, selectedcat }) {
  const handleClick = () => {
    setselectedcat(cat);
  };

  return (
    <MCC onClick={handleClick} selectedcat={selectedcat} cat={cat}>
      {cat}
    </MCC>
  );
}

export default MenuCategoryCard;
