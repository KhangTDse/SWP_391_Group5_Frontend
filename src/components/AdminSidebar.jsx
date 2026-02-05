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

const baseItem =
  "relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all";

function AdminSidebar() {
  const location = useLocation();
  const [openProduct, setOpenProduct] = useState(true);

  // Kiểm tra đang ở route con của quản lý cửa hàng không
  const isProductActive =
    location.pathname.startsWith("/dashboard/products") ||
    location.pathname.startsWith("/dashboard/orders");

  useEffect(() => {
    if (isProductActive) setOpenProduct(true);
  }, [isProductActive]);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r px-5 py-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Falcon Eyewear
      </h1>

      {/* Divider */}
      <div className="h-px bg-gray-200 mb-6" />

      {/* Menu label */}
      <p className="text-xs text-gray-400 uppercase mb-3 tracking-wider">
        Menu
      </p>

      <nav className="space-y-1.5">
        {/* Tổng quan */}
        <NavLink to="/dashboard" end className={({ isActive }) =>
          `${baseItem} ${
            isActive
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`
        }>
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-blue-600"
                />
              )}
              <FiGrid size={18} />
              Tổng quan
            </>
          )}
        </NavLink>

        {/* Quản lý cửa hàng */}
        <div>
          <button
            onClick={() => setOpenProduct(!openProduct)}
            className={`${baseItem} w-full justify-between ${
              isProductActive
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isProductActive && (
              <motion.span
                layoutId="active-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-blue-600"
              />
            )}

            <div className="flex items-center gap-3">
              <FiBox size={18} />
              Quản lý cửa hàng
            </div>

            <motion.span
              animate={{ rotate: openProduct ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown />
            </motion.span>
          </button>

          {/* Sub menu */}
          <AnimatePresence>
            {openProduct && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative ml-6 mt-2 pl-4 space-y-1 overflow-hidden border-l border-gray-200"
              >
                <NavLink
                  to="/dashboard/products"
                  className={({ isActive }) =>
                    `${baseItem} ${
                      isActive
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <FiBox size={16} />
                  Sản phẩm
                </NavLink>

                <NavLink
                  to="/dashboard/orders"
                  className={({ isActive }) =>
                    `${baseItem} ${
                      isActive
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <FiShoppingCart size={16} />
                  Đơn hàng
                </NavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hồ sơ */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `${baseItem} ${
              isActive
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-blue-600"
                />
              )}
              <FiUser size={18} />
              Hồ sơ
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
