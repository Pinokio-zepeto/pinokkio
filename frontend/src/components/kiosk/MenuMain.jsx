import React, { useEffect, useState } from 'react';
import MenuMainCard from './MenuMainCard';
import styled from 'styled-components';
import ja from 'date-fns/esm/locale/ja/index.js';

const MM = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function MenuMain({ selectedCategory, setSelectedMenu, setModal }) {
  const [nowPage, setNowPage] = useState();
  const [showSize, setShowSize] = useState(3);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    /* 처움 렌더링할 때랑 카테고리 선택할 때마다 getMenu 실행 */
    getMenu();
    console.log('change menus');
  }, [selectedCategory]);

  const makeList = () => {};

  const getMenu = () => {
    /* selectedCategory를 이용하여 해당되는 메뉴 가져오기 */

    /* 아래는 임시 코드(추후 axios로 변경 예정) */
    const list = [];
    for (var i = 0; i < 10; i++) {
      list.push(selectedCategory + (i + 1));
    }

    const pagesLength = list.length / (showSize * showSize);
    for (let i = 0; i < pagesLength; i++) {
      pages.push([]);
    }

    for (let i = 0; i < showSize; i++) {
      for (let j = 0; j < showSize; j++) {}
    }
  };

  return (
    <MM>
      {menus.map((menu, index) => (
        <MenuMainCard
          key={index}
          menu={menu}
          setSelectedMenu={setSelectedMenu}
          setModal={setModal}
        />
      ))}
    </MM>
  );
}

export default MenuMain;
