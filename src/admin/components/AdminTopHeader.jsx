import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiMenu,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { adminMock } from "../data/adminMock";

function AdminTopHeader({ onToggleSidebar, collapsed }) {
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
    <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="h-20 px-6 flex justify-between items-center">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="flex items-center px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition"
          >
            <motion.div
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiChevronLeft size={16} />
            </motion.div>
          </button>

          <div className="relative hidden md:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-56 pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div
          ref={menuRef}
          className="relative flex items-center gap-3 px-3 py-2 rounded-xl 
  hover:bg-slate-100 transition-all duration-200 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="relative group">
            <img
              src={admin.img}
              alt={admin.name}
              className="
      w-10 h-10 rounded-full object-cover
      shadow-md
      transition-all duration-300
      group-hover:scale-105
      group-hover:ring-2 group-hover:ring-blue-500
    "
            />

            {/* Online status */}
            <span
              className="
      absolute bottom-0 right-0
      w-3 h-3
      bg-green-500
      border-2 border-white
      rounded-full
      shadow-sm
    "
            />
          </div>

          <div className="hidden sm:block text-sm">
            <p className="font-medium text-slate-800 leading-tight">
              {admin.name}
            </p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>

          <motion.div
            initial={false}
            animate={
              open
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.96, y: -6 }
            }
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-14 w-60 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
            style={{ pointerEvents: open ? "auto" : "none" }}
          >
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-slate-800">{admin.name}</p>
              <p className="text-xs text-slate-400 mt-1">{admin.email}</p>
            </div>

            <div className="h-px bg-slate-200" />

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition"
            >
              Hồ sơ
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition"
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
