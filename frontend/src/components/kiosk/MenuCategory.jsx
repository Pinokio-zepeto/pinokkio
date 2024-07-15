import React from "react";
import MenuCategoryCard from "./MenuCategoryCard";

const MccList = () => {
  const mccData = [1, 2, 3, 4, 5];

  return (
    <ul>
      {mccData.map((mcc, index) => (
        <MenuCategoryCard key={index}>{mcc}</MenuCategoryCard>
      ))}
    </ul>
  );
};

function MenuCategory() {
  return (
    <div className="MenuCategory">
      <h1>menu category list</h1>
      <MccList />
    </div>
  );
}

export default MenuCategory;
