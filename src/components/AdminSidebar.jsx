import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
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
          {/* Active Indicator */}
          {isActive && (
            <motion.span
              layoutId="active-pill"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-blue-600"
            />
          )}

          {/* Icon box cố định để không nhảy */}
          <div className="w-6 flex justify-center items-center">{icon}</div>

          {/* Label */}
          {!collapsed && <span>{label}</span>}

          {/* Tooltip khi collapsed */}
          {collapsed && (
            <div className="absolute left-16 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.25 }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col"
    >
      {/* ===== BRAND ===== */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100">
        {collapsed ? (
          // Logo khi thu nhỏ
          <motion.img
            key="logo"
            src="https://tse1.mm.bing.net/th/id/OIP.VNNzIRDW9nZsWGt1vmCCXwHaFL?rs=1&pid=ImgDetMain&o=7&rm=3" // 👈 đổi path logo của bạn
            alt="Falcon"
            className="w-8 h-8 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          // Text khi mở rộng
          <motion.h1
            key="text"
            className="text-lg font-semibold text-gray-900 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Falcon Eyewear
          </motion.h1>
        )}
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
