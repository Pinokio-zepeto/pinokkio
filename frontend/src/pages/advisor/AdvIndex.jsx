<<<<<<< HEAD
import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdvNowPage from "./AdvNowPage";
import AdvLoadingPage from "./AdvLoadingPage";
=======
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdvNowPage from './AdvNowPage';
import AdvLoadingPage from './AdvLoadingPage';
>>>>>>> 86d398387384d8b184f5bd9ac224e8f32c1af46c

function AdvIndex() {
  return (
    <div className="Adv-index">
      <Routes>
        <Route path="/" element={<AdvLoadingPage />} />
        <Route path="advisor-now" element={<AdvNowPage />} />
      </Routes>
    </div>
  );
}

export default AdvIndex;
