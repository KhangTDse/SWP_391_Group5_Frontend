import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Import công cụ cần thiết

function Header() {
  const navigate = useNavigate(); // <--- 2. Khai báo công cụ chuyển trang

  return (
      // Giữ nguyên style cũ của bạn cho đẹp
      <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo: Bấm vào thì VỀ TRANG CHỦ (Home) */}
          <Link to="/" className="text-xl font-bold tracking-wide text-gray-900">
            🦅 FALCON EYEWEAR
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest">

            {/* --- SỬA Ở ĐÂY: Bấm vào Shop thì sang trang /shop --- */}
            <Link to="/shop" className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
              Shop
            </Link>
            <Link to="/frames" className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
              Order
            </Link>
            <Link to="#" className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
              About
            </Link>
            <Link to="#" className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
              Contact
            </Link>

            {/* NÚT LOGIN */}
            <button
                onClick={() => navigate('/login')} // Bấm vào là nhảy sang trang Login
                className="bg-black text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-amber-600 transition-all shadow-md"
            >
              LOGIN
            </button>
          </nav>

          {/* Icon mobile */}
          <button className="md:hidden text-2xl text-gray-600">
            ☰
          </button>

        </div>
      </header>
  );
}

export default Header;