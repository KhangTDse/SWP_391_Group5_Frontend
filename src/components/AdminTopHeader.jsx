import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiMenu } from "react-icons/fi";
import { adminMock } from "../data/adminMock";

function AdminTopHeader({ onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const admin = adminMock;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FiMenu size={18} />
          </button>

          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-52 pl-9 pr-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div
          ref={menuRef}
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <img
            src={admin.img}
            alt={admin.name}
            className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition"
          />

          <div className="hidden sm:block text-xs">
            <p className="font-medium text-gray-800">{admin.name}</p>
          </div>

          <motion.div
            initial={false}
            animate={
              open
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: -4 }
            }
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <div className="px-4 py-3">
              <p className="text-sm">{admin.email}</p>
            </div>

            <div className="h-px bg-gray-200 mx-4" />

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Hồ sơ
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
            >
              Đăng xuất
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminTopHeader;
