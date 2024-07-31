import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MCC = styled.div`
  background-color: ${(props) => (props.cat === props.selectedcat ? 'blue' : null)};
  color: ${(props) => (props.cat === props.selectedcat ? 'white' : null)};
  width: ${(props) => `${100 / props.showSize}%`};
  border-radius: ${(props) => props.borderRadius};

  font-size: 15px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

function MenuCategoryCard({ cat, setselectedcat, selectedcat, showSize }) {
  const [borderRadius, setBorderRadius] = useState('0px');
  const mccRef = useRef(null);

  useEffect(() => {
    const updateBorderRadius = () => {
      if (mccRef.current) {
        const height = mccRef.current.offsetHeight;
        setBorderRadius(`${height / 2}px`);
      }
    };

    // Update the border-radius when the component mounts or updates
    updateBorderRadius();

    // Optionally, add event listener for window resize to handle dynamic height changes
    window.addEventListener('resize', updateBorderRadius);
    return () => window.removeEventListener('resize', updateBorderRadius);
  }, [showSize]);

  const handleClick = () => {
    setselectedcat(cat);
  };

  console.log(showSize);
  return (
    <MCC
      ref={mccRef}
      onClick={handleClick}
      selectedcat={selectedcat}
      cat={cat}
      showSize={showSize}
      borderRadius={borderRadius}
    >
      {cat}
    </MCC>
  );
}

export default MenuCategoryCard;
