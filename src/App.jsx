import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <--- 1. Import trang mới
import FrameSelectionPage from './pages/FrameSelectionPage';
import PrescriptionPage from './pages/PrescriptionPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <div className="pt-20">
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} /> {/* <--- 2. Thêm đường dẫn này */}
                <Route path="/frames" element={<FrameSelectionPage />} />
                <Route path="/prescription" element={<PrescriptionPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;