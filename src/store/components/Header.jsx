import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaCopyright } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

  // Đã xóa "Đơn Hàng" ra khỏi menu
  const MENU_ITEMS = [
    { label: "Cửa Hàng", path: "/shop" },
    { label: "Về chúng tôi", path: "/about" },
    { label: "Liên hệ", path: "/contact" },
  ];

  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser")),
  );
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const userRef = useRef(null);

  // Vẫn giữ lại biến tính tổng số lượng để hiện thị bong bóng đỏ trên túi xách
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  /* sync storage events */
  useEffect(() => {
    const onStorage = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("storage", onStorage);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* close dropdowns on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (userRef.current && !userRef.current.contains(e.target))
        setShowUserMenu(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .dropdown { animation: slideDown .2s cubic-bezier(.22,1,.36,1); }
      `}</style>

      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-stone-100"
            : "bg-white border-b border-stone-100"
        }`}
        style={{
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-end text-2xl font-extrabold tracking-widest"
          >
            <span className="text-stone-900 group-hover:text-amber-500 transition-colors duration-300">
              FALCON
            </span>
            <span className="text-amber-500 text-3xl ml-0.5 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <FaCopyright size={14}/>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-semibold text-stone-600">
            {MENU_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative pb-1.5 transition-all duration-300 ${isActive ? "text-amber-500" : "hover:text-amber-500"}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-0 h-[2px] bg-amber-500 rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0"}`}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {/* ── CART BUTTON ── */}
            <div className="relative">
              <button
                onClick={() => {
                  navigate("/checkout"); // Bay thẳng sang trang thanh toán
                  setShowUserMenu(false);
                }}
                className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
              >
                <FiShoppingBag size={18} className="text-stone-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* USER */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => {
                    setShowUserMenu((p) => !p);
                  }}
                  className="flex items-center gap-2"
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${currentUser.name || currentUser.email}&background=1c1917&color=fff&bold=true`}
                    alt="User"
                    className="w-9 h-9 rounded-full border-2 border-stone-200 hover:border-amber-400 transition"
                  />
                </button>

                {showUserMenu && (
                  <div className="dropdown absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs font-medium text-stone-700 truncate">
                        {currentUser.name || "Người dùng"}
                      </p>
                      <p className="text-[11px] text-stone-400 truncate mt-0.5">
                        {currentUser.email}
                      </p>
                    </div>
                    {/* Bạn có thể thêm link Lịch sử đơn hàng vào đây nếu muốn */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-stone-50 transition-colors"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-stone-900 text-white px-5 py-2 rounded-full text-xs font-semibold tracking-wider hover:bg-amber-500 transition-all duration-300"
              >
                Đăng nhập
              </button>
            )}
          </nav>

          {/* MOBILE NAV*/}
          <button 
            onClick={() => navigate("/checkout")} 
            className="md:hidden text-stone-700 p-2 relative"
          >
            <FiShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 min-w-[16px] min-h-[16px] flex items-center justify-center rounded-full shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}

export default Header;