import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CarouselPageStyle = styled.div`
  padding-top: 700px;
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ButtonBackBox = styled.div`
  position: absolute;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 9px;

  height: 100px;
  width: 90px;
`;

const ButtonFrontBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
  font-family: 'PeoplefirstNeatLoudTTF';
  background-color: #eeeeee;
  z-index: 1;

  @font-face {
    font-family: 'PeoplefirstNeatLoudTTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2406-2@1.0/PeoplefirstNeatLoudTTF.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

const ButtonInnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 6px;
  background-color: #eeeeee;
  &:hover {
    background-color: #add8e6;
  }
`;

function CarouselPage() {
  const navigate = useNavigate();

  const havingHere = () => {
    navigate('/kiosk/menu', { state: { where: 'having here' } });
  };

  const takeAway = () => {
    navigate('/kiosk/menu', { state: { where: 'take away' } });
  };

  return (
    <CarouselPageStyle>
      <ButtonContainer>
        <StyledButton>
          <ButtonFrontBox onClick={havingHere}>
            <ButtonInnerBox>매장</ButtonInnerBox>
          </ButtonFrontBox>
          <ButtonBackBox />
        </StyledButton>
        <StyledButton>
          <ButtonFrontBox onClick={takeAway}>
            <ButtonInnerBox>포장</ButtonInnerBox>
          </ButtonFrontBox>
          <ButtonBackBox />
        </StyledButton>
      </ButtonContainer>
    </CarouselPageStyle>
  );
}

export default CarouselPage;
