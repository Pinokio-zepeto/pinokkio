import React, { useEffect, useState } from 'react';
import MenuCategoryCard from './MenuCategoryCard';
import styled from 'styled-components';

const MC = styled.div`
  display: flex;
  flex-direction: row;
`;

function MenuCategory({ categories, selectedCategory, setSelectedCategory }) {
  const [nowFirst, setNowFirst] = useState(0);
  const showSize = 5;

  return (
    <MC>
      {nowFirst === 0 ? null : <button onClick={() => setNowFirst(nowFirst - 1)}> {'<'}</button>}
      {categories.slice(nowFirst, nowFirst + showSize + 1).map((cat, index) => (
        <MenuCategoryCard
          key={index}
          cat={cat}
          setselectedcat={setSelectedCategory}
          selectedcat={selectedCategory}
        />
      ))}{' '}
      {nowFirst === categories.length - showSize ? null : (
        <button onClick={() => setNowFirst(nowFirst + 1)}> {'>'}</button>
      )}
    </MC>
  );
}

export default MenuCategory;
