import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiChevronDown,
  FiBox,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const navItem =
  "relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition";

function AdminSidebar() {
  const [openStore, setOpenStore] = useState(true);
  const location = useLocation();

  // tự mở submenu nếu đang ở route con
  useEffect(() => {
    if (location.pathname.includes("/dashboard/products") ||
        location.pathname.includes("/dashboard/orders")) {
      setOpenStore(true);
    }
  }, [location.pathname]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-50 border-r border-gray-200 px-5 py-6">
      {/* LOGO */}
      <h1 className="text-xl font-semibold tracking-tight text-gray-900">
        Falcon Eyewear
      </h1>

      {/* Divider */}
      <div className="my-5 h-px bg-gray-200" />

      {/* MENU */}
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
        Menu
      </p>

      {/* Tổng quan */}
      <NavLink to="/dashboard" end className={({ isActive }) =>
        `${navItem} ${isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
      }>
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600"
              />
            )}
            <FiGrid size={18} />
            Tổng quan
          </>
        )}
      </NavLink>

      {/* Quản lý cửa hàng */}
      <div className="mt-1">
        <button
          onClick={() => setOpenStore(!openStore)}
          className="relative flex w-full items-center justify-between px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <FiBox size={18} />
            <span className="text-sm font-medium">Quản lý cửa hàng</span>
          </div>

          <motion.span
            animate={{ rotate: openStore ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown />
          </motion.span>

          {(location.pathname.includes("/products") ||
            location.pathname.includes("/orders")) && (
            <motion.span
              layoutId="active-pill"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600"
            />
          )}
        </button>

        <AnimatePresence>
          {openStore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="ml-6 mt-1 space-y-1 overflow-hidden"
            >
              <NavLink to="/dashboard/products" className={({ isActive }) =>
                `${navItem} pl-6 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }>
                <FiBox size={16} />
                Sản phẩm
              </NavLink>

              <NavLink to="/dashboard/orders" className={({ isActive }) =>
                `${navItem} pl-6 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }>
                <FiShoppingCart size={16} />
                Đơn hàng
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hồ sơ */}
      <NavLink to="/dashboard/profile" className={({ isActive }) =>
        `${navItem} mt-2 ${
          isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
        }`
      }>
        {({ isActive }) => (
          <>
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600"
              />
            )}
            <FiUser size={18} />
            Hồ sơ
          </>
        )}
      </NavLink>
    </aside>
  );
}

export default AdminSidebar;
