import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCategories } from '../../../apis/Category';
import { getItemsByCategoryId } from '../../../apis/Item';
import ElderMenuCategory from '../../../components/kiosk/ElderMenuCategory';
import MenuMain from '../../../components/kiosk/MenuMain';
import Cart from '../../../components/kiosk/Cart';
import MenuModal from '../../../components/kiosk/modal/MenuModal';
import { requestMeeting, enterRoom, leaveRoom } from '../../../apis/Room';
import useWebSocket from '../../../hooks/useWebSocket';
import { OpenVidu } from 'openvidu-browser';
import OpenViduVideoComponent from '../../../components/kiosk/OpenViduComponent';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const ElderMenuPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  min-width: 27rem;
`;

const KioskHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px #d9d9d9 solid;
  background-color: white;
  width: 100%;
  height: 13rem;
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

const Logo = styled.div`
  font-size: 3vh;
  color: #ec7348;
  font-family: 'Alfa Slab One', serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 1vw;
  padding-top: 1vh;
  cursor: pointer;
`;

const KioskBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const KioskMenusStyle = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: calc(22rem - 2px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const KioskCategoriesStyle = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: calc(22rem - 2px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

function ElderMenuPage() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [openViduConnection, setOpenViduConnection] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [OV, setOV] = useState(null);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const userData = useSelector((store) => store.user);
  const { sendMessage, lastMessage, isConnected, connect } = useWebSocket(userData.token);

  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  const initializeWebSocket = useCallback(() => {
    if (!isConnected) {
      connect();
    }
  }, [isConnected, connect]);

  useEffect(() => {
    initializeWebSocket();
    return () => {
      // Cleanup logic if needed
    };
  }, [initializeWebSocket]);

  useEffect(() => {
    if (isConnected) {
      console.log('WebSocket 연결됨');
      requestRoomEnter();
      getCategory();
      isFirstRender.current = false;
    }
  }, [isConnected]);

  useEffect(() => {
    if (lastMessage) {
      try {
        const data = JSON.parse(lastMessage.data);
        console.log('WebSocket 메시지 수신:', data);
        if (data.type === 'roomId') {
          console.log('상담요청 수락, roomId 수신:', data.roomId);
          setRoomId(data.roomId);
        }
      } catch (error) {
        console.error('WebSocket 메시지 파싱 오류:', error);
      }
    }
  }, [lastMessage]);

  const requestRoomEnter = useCallback(async () => {
    try {
      await requestMeeting();
      console.log('상담 요청 전송 완료');
    } catch (error) {
      console.error('상담 요청 실패:', error);
      // 여기에 사용자에게 오류를 표시하는 로직을 추가할 수 있습니다.
    }
  }, []);

  const getCategory = async () => {
    /* axios를 이용하여 category를 가져온다. */
    const category_data = await getCategories(userData.typeInfo.posId);
    console.log('received categories datas : ', category_data);
    setCategories(category_data.responseList);
  };

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      getMenu();
    }
  }, [selectedCategory]);

  const getMenu = async () => {
    if (selectedCategory && userData) {
      const menu_data = await getItemsByCategoryId(selectedCategory.id);
      console.log('received menus datas : ', menu_data);
      menu_data.responseList.map((menu) => {
        menu['count'] = 0;
      });
      setMenus(menu_data.responseList);
    }
  };

  const handleClick = () => {
    navigate('/elder-menu');
  };

  useEffect(() => {
    if (roomId && userData.typeInfo.kioskId && !openViduConnection) {
      console.log('enterRoom 호출:', roomId, userData.typeInfo.kioskId);
      enterRoom(roomId, userData.typeInfo.kioskId)
        .then((response) => {
          console.log('enterRoom 성공', response);
          initializeSession(response.token);
          setOpenViduConnection(true);
        })
        .catch((error) => {
          console.error('enterRoom 오류:', error);
        });
    }
  }, [roomId, userData.typeInfo.kioskId, openViduConnection]);

  const initializeSession = useCallback(
    async (token) => {
      const ov = new OpenVidu();
      setOV(ov);

      const session = ov.initSession();
      setSession(session);

      session.on('streamCreated', (event) => {
        const subscriber = session.subscribe(event.stream, undefined);
        setSubscriber(subscriber);
      });

      session.on('streamDestroyed', (event) => {
        setSubscriber(null);
      });

      try {
        await session.connect(token, { clientData: userData.typeInfo.kioskId });
        console.log('OpenVidu 세션 연결 성공');

        const publisher = await ov.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });

        await session.publish(publisher);
        setPublisher(publisher);
        console.log('키오스크 스트림 발행 성공');
      } catch (error) {
        console.error('세션 연결 또는 스트림 발행 오류:', error);
      }
    },
    [userData.typeInfo.kioskId]
  );

  const handleLeaveRoom = async () => {
    try {
      setRoomId(null);
      session.disconnect();
      leaveRoom(roomId);
      setOpenViduConnection(false);
      console.log('상담 종료 성공');
    } catch (error) {
      console.error('상담 종료 오류:', error);
    }
  };

  return (
    <ElderMenuPageStyle>
      <KioskHeader>
        <KioskLeftHeader>
          <Logo
            onClick={() => {
              handleClick();
            }}
          >
            Pinokio
          </Logo>
        </KioskLeftHeader>
        <KioskRightHeader>
          <ScreenStyle>
            {subscriber && <OpenViduVideoComponent streamManager={subscriber} />}
          </ScreenStyle>
          {session && <Button onClick={handleLeaveRoom}>상담 종료</Button>}
        </KioskRightHeader>
      </KioskHeader>
      <KioskBody>
        <KioskCategoriesStyle>
          {categories.length > 0 && selectedCategory && (
            <ElderMenuCategory
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </KioskCategoriesStyle>
        <KioskMenusStyle>
          {menus.length > 0 && selectedCategory && (
            <MenuMain
              selectedCategory={selectedCategory}
              setSelectedMenu={setSelectedMenu}
              setModal={setModal}
              menus={menus}
            />
          )}
        </KioskMenusStyle>
      </KioskBody>
      <Cart cartItems={cartItems} setCartItems={setCartItems} isElder={true} />

      {modal && (
        <MenuModal
          item={selectedMenu}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setModal={setModal}
          isElder={true}
        ></MenuModal>
      )}
    </ElderMenuPageStyle>
  );
}

export default ElderMenuPage;
