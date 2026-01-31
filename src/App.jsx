import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"; // <--- 1. Import trang mới
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopPage from "./pages/ShopPage";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StoreLayout from "./layout/StoreLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminOrders from "./pages/AdminOrder.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/dashboard/products" element={<AdminProducts />} />
          <Route path="/dashboard/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
