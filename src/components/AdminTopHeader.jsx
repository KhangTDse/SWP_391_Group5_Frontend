import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminTopHeader({ title }) {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center mb-8 relative">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-800">{title}</h1>

      {/* Avatar + Info */}
      <div
        ref={menuRef}
        className="relative flex items-center gap-3 cursor-pointer select-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src="https://www.shutterstock.com/image-photo/create-imageiphone-memoji-avatar-style-600nw-2683889647.jpg"
          alt="admin"
          className="rounded-full w-10 h-10 ring-2 ring-transparent hover:ring-blue-500 transition"
        />

        <div className="text-sm text-left hidden sm:block">
          <p className="font-medium text-gray-800">Hoang Vo</p>
          <p className="text-gray-500">admin@eyewear.com</p>
        </div>

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50
            origin-top-right transition-all duration-200 ease-out
            ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* User info */}
          <div className="px-4 py-3">
            <p className="font-medium text-sm text-gray-800">Hoang Vo</p>
            <p className="text-xs text-gray-500">admin@eyewear.com</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mx-4" />

          {/* Actions */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600
                       hover:bg-red-50 transition rounded-b-xl"
          >
            🚪
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminTopHeader;
