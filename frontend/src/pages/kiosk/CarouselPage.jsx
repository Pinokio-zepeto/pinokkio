import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import carouselimage from '../../assets/images/carouselimage.jpg';
const CarouselPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  position: relative;

  /* display: flex; */
  width: 100%;
  justify-content: center;
  margin-bottom: 100%;
`;

const CarouselWindow = styled.div`
  position: relative;
  width: 100%;
  justify-content: center;
  margin-bottom: 100%;
`;

const CarouselButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  height: 12vh;
  width: 8vw;
  margin: 0 0.5vw;
  font-weight: Bold;
  font-size: 3vh;
`;

const CarouselImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

function CarouselPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  // useEffect(() => {
  //   /* 여기서부터 SSE 관련 코드 */
  //   // SSE 연결 생성
  //   const eventSource = new EventSource('http://localhost:8080/api/face-recognition-events');

  //   // 서버로부터 메시지를 받았을 때 실행될 핸들러
  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log('Received SSE data:', data);
  //     // 받은 데이터로 상태 업데이트
  //     setResult(data);
  //   };

  //   // 에러 발생 시 실행될 핸들러
  //   eventSource.onerror = (error) => {
  //     console.error('SSE error:', error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     // 컴포넌트 언마운트 시 SSE 연결 종료
  //     eventSource.close();
  //   };
  // });

  // 결과가 없을 때 표시할 내용

  const havingHere = () => {
    navigate('/kiosk/menu', { state: { where: 'having here' } });
  };

  const takeAway = () => {
    navigate('/kiosk/menu', { state: { where: 'take away' } });
  };

  return (
    <CarouselPageStyle>
      <CarouselImage src={carouselimage} alt="" />
      <CarouselWindow>
        {result ? (
          <div>
            <h2>얼굴 인식 결과:</h2>
            <p>회원 여부: {result.is_member ? '회원' : '비회원'}</p>
            <p>나이: {result.age}</p>
            <p>성별: {result.gender}</p>
            {result.is_member && result.member_info && (
              <div>
                <h3>회원 정보:</h3>
                <p>ID: {result.member_info.id}</p>
                <p>등록된 나이: {result.member_info.age}</p>
                <p>등록된 성별: {result.member_info.gender}</p>
              </div>
            )}
          </div>
        ) : (
          <div>얼굴 인식 결과를 기다리는 중...</div>
        )}
        <ButtonContainer>
          <CarouselButton onClick={havingHere}>
            <img src="" alt="" />
            매장
          </CarouselButton>
          <CarouselButton onClick={takeAway}>
            <img src="" alt="" />
            포장
          </CarouselButton>
        </ButtonContainer>
      </CarouselWindow>
    </CarouselPageStyle>
  );
}

export default CarouselPage;
