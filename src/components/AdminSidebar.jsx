import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiChevronDown,
  FiBox,
  FiPlusSquare,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
   ${
     isActive
       ? "bg-blue-50 text-blue-600 font-medium"
       : "text-gray-700 hover:bg-gray-100"
   }`;

function AdminSidebar() {
  const [openProduct, setOpenProduct] = useState(true);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r px-6 py-6 font-admin">
      {/* Tên shop */}
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Glasses Admin
      </h1>

      {/* Menu label */}
      <p className="text-xs text-gray-400 uppercase mb-3 tracking-wider">
        Menu
      </p>

      {/* Tổng quan */}
      <NavLink
        to="/dashboard"
        className={linkClass}
        end
      >
        <FiGrid size={18} />
        Tổng quan
      </NavLink>

      {/* Quản lý cửa hàng - CÓ sổ */}
      <div className="mt-2">
        <button
          onClick={() => setOpenProduct(!openProduct)}
          className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          <div className="flex items-center gap-3">
            <FiBox size={18} />
            <span className="text-sm font-medium">
              Quản lý cửa hàng
            </span>
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
              className="ml-9 mt-2 space-y-1 overflow-hidden"
            >
              <NavLink
                to="/dashboard/products"
                className={linkClass}
              >
                <FiBox size={16} />
                Sản phẩm
              </NavLink>

              

              <NavLink
                to="/dashboard/orders"
                className={linkClass}
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
        className={linkClass}
      >
        <FiUser size={18} />
        Hồ sơ
      </NavLink>
    </aside>
  );
}

export default AdminSidebar;
