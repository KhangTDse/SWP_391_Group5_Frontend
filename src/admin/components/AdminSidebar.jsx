import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiBox, FiShoppingCart, FiUser } from "react-icons/fi";

const navItem =
  "relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors duration-200";

function AdminSidebar({ collapsed }) {
  const renderItem = (to, icon, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${navItem} ${collapsed ? "justify-center px-0" : ""} ${
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="active-pill"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600"
            />
          )}

          <div className="w-6 flex justify-center items-center">{icon}</div>

          {/* Animate label thay vì render thẳng */}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </NavLink>
  );

  return (
    <motion.aside
      layout
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col overflow-hidden"
    >
      {/* ===== BRAND ===== */}
      <div className="h-20 flex items-center border-b border-gray-100 px-4">
        <motion.div
          layout
          className={`flex items-center gap-2 w-full ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.VNNzIRDW9nZsWGt1vmCCXwHaFL?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Falcon"
            className="w-8 h-8 object-contain"
          />

          <AnimatePresence>
            {!collapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold text-gray-900 tracking-tight whitespace-nowrap"
              >
                Falcon Eyewear
              </motion.h1>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ===== MENU ===== */}
      <div className="flex-1 pt-6 px-3 space-y-2">
        <div className="group relative">
          {renderItem("/dashboard", <FiGrid size={18} />, "Tổng quan", true)}
        </div>

        <div className="group relative">
          {renderItem("/dashboard/products", <FiBox size={18} />, "Sản phẩm")}
        </div>

        <div className="group relative">
          {renderItem(
            "/dashboard/orders",
            <FiShoppingCart size={18} />,
            "Đơn hàng",
          )}
        </div>

        <div className="group relative">
          {renderItem("/dashboard/profile", <FiUser size={18} />, "Hồ sơ")}
        </div>
      </div>
    </motion.aside>
  );
}

export default AdminSidebar;
