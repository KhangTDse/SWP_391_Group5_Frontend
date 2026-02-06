import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx"; // <--- 1. Import trang mới
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AdminOverview from "./pages/AdminOverview";
import StoreLayout from "./layout/StoreLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminOrders from "./pages/AdminOrder.jsx";
import FrameSelectionPage from "./pages/FrameSelectionPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import AdminProfile from "./pages/AdminProfile.jsx";
function App() {
  return (
    <div>
      <ScrollToTop />

      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/frames" element={<FrameSelectionPage />} />
          <Route path="/prescription" element={<PrescriptionPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/" element={<AdminOverview />} />
          <Route path="/dashboard/profile" element={<AdminProfile />} />
          <Route path="/dashboard/products" element={<AdminProducts />} />
          <Route path="/dashboard/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
