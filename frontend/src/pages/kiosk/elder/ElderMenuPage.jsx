import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Router, Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from '../../../apis/Category';
import { getItemsByCategoryId } from '../../../apis/Item';
import ElderMenuCategory from '../../../components/kiosk/ElderMenuCategory';
import MenuMain from '../../../components/kiosk/MenuMain';
import Cart from '../../../components/kiosk/Cart';
import MenuModal from '../../../components/kiosk/modal/MenuModal';

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
`;

const KioskBody = styled.div`
  display: flex;
  flex-direction: row;
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
  &::-webkit-scrollbar {
    display: none;
  }
`;

function ElderMenuPage() {
  const [categories, setCategories] = useState([]);
  const categoriesMounted = useRef(false);

  const [menus, setMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const selectedCategoryMounted = useRef(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const [cartItems, setCartItems] = useState([]);

  const userData = useSelector((store) => store.user);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    console.log('first rendering');
    getCategory();

    // 처음 렌더링 했을 때 순서 getCategory ->  useEffect(categories) -> useEffect(selectedCategory)
  }, []);

  const getCategory = async () => {
    /* axios를 이용하여 category를 가져온다. */
    const category_data = await getCategories(userData.typeInfo.posId);
    console.log('received categories datas : ', category_data);
    setCategories(category_data.responseList);
  };

  useEffect(() => {
    if (!categoriesMounted.current) {
      console.log('categories mounted : ');
      categoriesMounted.current = true;
    } else {
      console.log('categories updated');
      console.log(categories);
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (!selectedCategoryMounted.current) {
      console.log('selectedCategory mounted : ');
      selectedCategoryMounted.current = true;
    } else {
      console.log('selectedCategory updated');
      console.log(selectedCategory);
      getMenu();
    }
  }, [selectedCategory]);

  const getMenu = async () => {
    if (selectedCategory && userData) {
      const menu_data = await getItemsByCategoryId(userData.typeInfo.posId, selectedCategory.id);
      console.log('received menus datas : ', menu_data);
      menu_data.responseList.map((menu) => {
        menu['count'] = 0;
      });
      setMenus(menu_data.responseList);
    }
  };

  return (
    <ElderMenuPageStyle>
      <KioskHeader>
        <KioskLeftHeader>
          <Logo>Pinokio</Logo>
        </KioskLeftHeader>
        <KioskRightHeader>
          <ScreenStyle>Screen for advisor</ScreenStyle>
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
        ></MenuModal>
      )}
    </ElderMenuPageStyle>
  );
}

export default ElderMenuPage;
