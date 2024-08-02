import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import coffeeimage from '../../../assets/images/coffee_image.png';

const ModalBg = styled.div`
  /* display: none; */
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  top: 1rem;
  width: 27rem;
  height: 47rem;
`;
const Modal = styled.div`
  background: white;
  border-radius: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 54%;
  height: 50%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  overflow: hidden;
  font-family: 'CafeOhsquareAir';
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 60%;
`;
const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const MenuTitleKo = styled.div``;

const MenuTitleEn = styled.div``;

const PriceAndButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuPrice = styled.div``;

const UpDownButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DownButton = styled.div``;

const MenuCount = styled.div``;

const UpButton = styled.div``;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div``;

const PutButton = styled.div``;

function MenuModal({ item, cartItems, setCartItems, setModal }) {
  const [count, setCount] = useState(1);

  const addCart = () => {
    console.log(item.itemName);
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].itemName === item.itemName) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[i].itemCount += count;
        setCartItems(updatedCartItems);
        setModal(false);
        return;
      }
    }

    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    setModal(false);

    return;
  };

  return (
    <ModalBg>
      <Modal>
        <ImageContainer>
          <ModalImage src={coffeeimage} />
        </ImageContainer>
        <MenuTitleKo>{item.itemName}</MenuTitleKo>
        <MenuTitleEn></MenuTitleEn>
        <PriceAndButtons>
          <MenuPrice>{item.itemPrice}</MenuPrice>
          <UpDownButtons>
            <UpButton onClick={() => setCount(count + 1)}>+</UpButton>
            <MenuCount>{count}</MenuCount>
            <DownButton onClick={() => (count > 0 ? setCount(count - 1) : null)}>-</DownButton>
          </UpDownButtons>
        </PriceAndButtons>
        <ModalFooter>
          <PutButton onClick={addCart} disabled={!(count > 0)}>
            담기
          </PutButton>
          <CancelButton onClick={() => setModal(false)}>취소</CancelButton>
        </ModalFooter>
      </Modal>
    </ModalBg>
  );
}

export default MenuModal;
