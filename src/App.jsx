import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <--- 1. Import trang mới
import Header from './components/Header';
import ProductDetailPage from './pages/ProductDetailPage';
import ShopPage from './pages/ShopPage';
function App() {
    return (
        <div className="pt-20">
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/shop" element={<ShopPage />} />
            </Routes>
        </div>
    );
}

export default App;