import React, { useEffect, useState } from 'react';
import MenuCategoryCard from './MenuCategoryCard';
import styled from 'styled-components';
import rightArrow from '../../assets/images/icons8-원-셰브론-오른쪽-80.png';
import leftArrow from '../../assets/images/icons8-원-셰브론-왼쪽-80.png';

const MC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-left: 1px solid;
  width: 20%;
`;

const Arrow = styled.img`
  width: 2em;
  height: 2em;
`;

function MenuCategory({ categories, selectedCategory, setSelectedCategory }) {
  const [nowFirst, setNowFirst] = useState(0);
  const showSize = 5;

  return (
    <MC>
      {nowFirst === 0 ? null : <Arrow src={leftArrow} onClick={() => setNowFirst(nowFirst - 1)} />}
      {categories.slice(nowFirst, nowFirst + showSize).map((cat, index) => (
        <MenuCategoryCard
          key={index}
          cat={cat}
          setselectedcat={setSelectedCategory}
          selectedcat={selectedCategory}
        />
      ))}{' '}
      {nowFirst === categories.length - showSize ? null : (
        <Arrow src={rightArrow} onClick={() => setNowFirst(nowFirst + 1)} />
      )}
    </MC>
  );
}

export default MenuCategory;
