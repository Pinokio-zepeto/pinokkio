import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuCategory from '../../../components/kiosk/MenuCategory';
import MenuMain from '../../../components/kiosk/MenuMain';
import Cart from '../../../components/kiosk/Cart';
import MenuModal from '../../../components/kiosk/modal/MenuModal';
import MenuData from '../../../data/MenuData.json';

const KioskHeader = styled.div`
  border-bottom: 1px #d9d9d9 solid;
  background-color: white;
  width: 100%;
  height: 5rem;
`;

const Logo = styled.div`
  font-size: 3vh;
  color: #7392ff;
  font-family: 'Alfa Slab One', serif;
  font-weight: 400;
  font-style: normal;
  padding-left: 1vw;
  padding-top: 1vh;
`;

const MenuPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #efefef;
  /* align-items: center; */
`;

const KioskBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: calc(30rem - 2px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [cartItems, setCartItems] = useState([]);

  const [modal, setModal] = useState(false);

  const getSelectedMenuData = () => {};

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [categories]);

  const getCategory = () => {
    setCategories(Object.keys(MenuData));

    /* axios를 이용하여 category를 가져온다. */
  };

  return (
    <MenuPageStyle>
      <KioskHeader>
        <Logo>Pinokio</Logo>
        <MenuCategory
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </KioskHeader>
      <KioskBody>
        <MenuMain
          selectedCategory={selectedCategory}
          setSelectedMenu={setSelectedMenu}
          setModal={setModal}
        />
      </KioskBody>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />

      {modal && (
        <MenuModal
          selectedItem={selectedMenu}
          cartItems={cartItems}
          setCartItems={setCartItems}
          setModal={setModal}
        ></MenuModal>
      )}
    </MenuPageStyle>
  );
}

export default MenuPage;
