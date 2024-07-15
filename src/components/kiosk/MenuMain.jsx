import React from "react";
import MenuMainCard from "./MenuMainCard";

const MmcList = () => {
  const mmcData = [1, 2, 3, 4, 5];

  return (
    <ul>
      {mmcData.map((mcc, index) => (
        <MenuMainCard key={index}>{mcc}</MenuMainCard>
      ))}
    </ul>
  );
};

function MenuMain() {
  return (
    <div className="MenuMain">
      this is menumain
      <MmcList />
    </div>
  );
}

export default MenuMain;
