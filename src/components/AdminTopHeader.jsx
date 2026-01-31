import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminTopHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // 🔒 Click ra ngoài thì đóng menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTitle = () => {
    if (location.pathname.includes("/dashboard/products")) {
      return "Products";
    }
    if (location.pathname.includes("/dashboard/orders")) {
      return "Orders";
    }
    if (location.pathname.includes("/dashboard")) {
      return "Overview";
    }
    return "Admin Dashboard";
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // clear mock login
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-8 relative">
      <h1 className="text-3xl font-semibold text-gray-800">{getTitle()}</h1>

      {/* Avatar */}
      <div
        ref={menuRef}
        className="relative flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="rounded-full w-10 h-10"
        />

        <div className="text-sm text-left">
          <p className="font-medium">Admin</p>
          <p className="text-gray-500">admin@eyewear.com</p>
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-14 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
            <div className="px-4 py-3 border-b">
              <p className="font-medium text-sm">Admin</p>
              <p className="text-xs text-gray-500">admin@eyewear.com</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              🚪 Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminTopHeader;
