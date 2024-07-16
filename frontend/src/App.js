import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import Login from "./pages/loginsignup/Login";
import SignUp from "./pages/loginsignup/SignUp";
import FindPassword1 from "./pages/loginsignup/FindPassword1";
import FindPassword2 from "./pages/loginsignup/FindPassword2";

import CarouselPage from "./pages/kiosk/CarouselPage";
import MenuPage from "./pages/kiosk/younger/MenuPage";
import PaymentPage from "./pages/kiosk/younger/PaymentPage";
import ReceiptPage from "./pages/kiosk/younger/ReceiptPage";
import ElderMenuPage from "./pages/kiosk/elder/ElderMenuPage";
import ElderPaymentPage from "./pages/kiosk/elder/ElderPaymentPage";
import ElderReceiptPage from "./pages/kiosk/elder/ElderReceiptPage";
import LoadingPage from "./pages/kiosk/elder/LoadingPage";

import KioskManagementPage from "./pages/pos/KioskManagementPage";
import OrderListPage from "./pages/pos/OrderListPage";
import PosMainPage from "./pages/pos/PosMainPage";
import ProductManagementPage from "./pages/pos/ProductManagementPage";
import ProductCategoryPage from "./pages/pos/ProductCategoryPage";
import SalesReportPage from "./pages/pos/SalesReportPage";

import AdvLoadingPage from "./pages/advisor/AdvLoadingPage";
import AdvNowPage from "./pages/advisor/AdvNowPage";

function App() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(localStorage.getItem("id"));
    console.log(userId);
  });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="findpassword1" element={<FindPassword1 />} />
            <Route path="findpassword2" element={<FindPassword2 />} />
          </Route>
          <Route path="/kiosk" element={<CarouselPage />}>
            <Route path="menu" element={<MenuPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="receipt" element={<ReceiptPage />} />
            <Route path="eldermenu" element={<ElderMenuPage />} />
            <Route path="elderpayment" element={<ElderPaymentPage />} />
            <Route path="elderreceipt" element={<ElderReceiptPage />} />
            <Route path="loading" element={<LoadingPage />} />
          </Route>
          <Route path="/pos" element={<PosMainPage />}>
            <Route path="orderlist" element={<OrderListPage />} />
            <Route path="kioskmanagement" element={<KioskManagementPage />} />
            <Route path="productcat" element={<ProductCategoryPage />} />
            <Route
              path="productmanagement"
              element={<ProductManagementPage />}
            />
            <Route path="salesreport" element={<SalesReportPage />} />
          </Route>
          <Route path="/advisor" element={<AdvLoadingPage />}>
            <Route path="now" element={<AdvNowPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
