import React, { useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { makeOrder } from '../../../apis/Order';
import OpenViduVideoComponent from '../../../components/kiosk/OpenViduComponent';

const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  min-width: 27rem;
`;
const Logo = styled.div`
  font-size: 3vh;
  color: ${(props) => (props.isElder ? '#EC7348' : '#7392ff')};
  font-family: 'Alfa Slab One', serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 1vw;
  padding-top: 1vh;
  cursor: pointer;
`;

const KioskLeftHeader = styled.div`
  width: 30%;
  height: 100%;
`;

const KioskRightHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`;

const ScreenStyle = styled.div`
  background-color: #222222;
  width: 90%;
  height: 90%;
  color: white;
  text-align: center;
  line-height: 10rem;
  font-family: 'CafeOhsquareAir';
`;

const BackButton = styled.div`
  font-family: 'CafeOhsquareAir';
  display: flex;
  text-align: center;
`;

const Arrow = styled.div`
  text-align: center;
  font-size: 1rem;
  color: #cfcfcf;
  line-height: 2rem;
  margin: 0 0.5rem;
`;

const BackButtonText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #414141;
  line-height: 2rem;
`;

const KioskHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px #d9d9d9 solid;
  background-color: white;
  width: 100%;
  height: 13rem;
`;

const KioskBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const KioskCenterCard = styled.div`
  width: 70%;
  height: 40%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 2px 1px rgb(0 0 0 / 25%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KioskCenterCardTitle = styled.div`
  font-family: 'CafeOhsquareAir';
  margin: 12% 0;
`;

const KioskCenterCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  height: 50%;
`;
const KioskCenterCardButton = styled.div`
  box-shadow: inset 1px 2px 1px rgb(0 0 0 / 25%);
  width: 47%;
  height: 100%;
  background-color: #fffdfd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const KioskInnerCardTitle = styled.div`
  font-family: 'CafeOhsquareAir';
  font-size: 1em;
  margin-bottom: 0.2rem;
`;

const KioskInnerCardSubTitle = styled.div`
  font-family: 'CafeOhsquareAir';
  color: ${(props) => (props.isElder ? '#EC7348' : '#7392ff')};
  font-size: 0.5em;
  margin-bottom: 1rem;
`;
const KioskInnerCardImage = styled.img``;

function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [subscribers, setSubscribers] = useState([]);
  const [cameraSession, setCameraSession] = useState(null);
  const [screenSession, setScreenSession] = useState(null);

  const goReceipt = async () => {
    const orderList = state.cartItems.map((item) => {
      return { itemId: item.itemId, quantity: item.count };
    });
    await makeOrder(state.customer.customerId, orderList);

    navigate('/kiosk/receipt', { state: state });
  };

  const goBack = () => {
    // 장바구니에 담아둔 주문 목록 등을 가지고 있어야 한다.
    if (state.isElder) {
      navigate('/kiosk/elder-menu', { state: state });
    } else {
      navigate('/kiosk/menu', { state: state });
    }
  };

  return (
    <PageStyle>
      <KioskHeader>
        <KioskLeftHeader>
          <Logo isElder={state.isElder}>Pinokio</Logo>
          <BackButton>
            <Arrow>{'<'}</Arrow>
            <BackButtonText onClick={goBack}>뒤로가기</BackButtonText>
          </BackButton>{' '}
        </KioskLeftHeader>
        <KioskRightHeader>
          <ScreenStyle>
            {/* {subscribers.length > 0 && <OpenViduVideoComponent streamManager={subscribers[0]} />} */}
          </ScreenStyle>
          {/* {(cameraSession || screenSession) && <Button onClick={handleLeaveRoom}>상담 종료</Button>} */}
        </KioskRightHeader>
      </KioskHeader>
      <KioskBody>
        <KioskCenterCard>
          <KioskCenterCardTitle>결제 수단을 선택해주세요.</KioskCenterCardTitle>
          <KioskCenterCardContainer>
            <KioskCenterCardButton onClick={goReceipt}>
              <KioskInnerCardTitle>신용카드</KioskInnerCardTitle>
              <KioskInnerCardSubTitle isElder={state.isElder}>
                체크카드 / 삼성페이
              </KioskInnerCardSubTitle>
              <KioskInnerCardImage src="/CreditCard.svg" width="80rem"></KioskInnerCardImage>
            </KioskCenterCardButton>
            <KioskCenterCardButton onClick={goReceipt}>
              <KioskInnerCardTitle>카카오페이</KioskInnerCardTitle>
              <KioskInnerCardSubTitle isElder={state.isElder}>앱 전용</KioskInnerCardSubTitle>
              <KioskInnerCardImage src="/KakaoTalk_logo.svg" width="60rem"></KioskInnerCardImage>
            </KioskCenterCardButton>
          </KioskCenterCardContainer>
        </KioskCenterCard>
      </KioskBody>
    </PageStyle>
  );
}

export default PaymentPage;
