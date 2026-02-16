import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBox,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMoreHorizontal,
} from "react-icons/fi";

const navItem =
  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200";

function AdminSidebar({ collapsed }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const renderItem = (to, icon, label, end = false) => (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `${navItem} px-3 ${
          isActive
            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layout
              layoutId="active-pill"
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 40,
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1.5 rounded-full bg-blue-500"
            />
          )}

          <div className="w-6 flex justify-center items-center text-base flex-shrink-0">
            {icon}
          </div>

          <motion.div
            initial={false}
            animate={{
              width: collapsed ? 0 : "auto",
              opacity: collapsed ? 0 : 1,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            <span className="truncate">{label}</span>
          </motion.div>

          {collapsed && (
            <span
              className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2
               rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium
               text-white shadow-lg whitespace-nowrap z-50
               opacity-0 group-hover:opacity-100
               transition-opacity duration-150"
            >
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <motion.aside
      layout
      role="navigation"
      aria-label="Admin sidebar"
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 32,
        mass: 0.9,
      }}
      className="h-screen bg-white border-r border-slate-200 shadow-sm flex flex-col overflow-visible"
    >
      {/* ===== BRAND ===== */}
      <div className="h-20 flex items-center border-b border-slate-200 px-4 bg-white">
        <motion.div layout className="flex items-center gap-3 w-full">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.VNNzIRDW9nZsWGt1vmCCXwHaFL?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Falcon"
            className="w-9 h-9 object-contain"
          />
          <motion.div
            initial={false}
            animate={{
              width: collapsed ? 0 : "auto",
              opacity: collapsed ? 0 : 1,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-slate-900 tracking-tight leading-tight">
                Falcon Eyewear
              </h1>
              <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Admin Dashboard
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== MENU ===== */}
      <div className="flex-1 pt-5 pb-4 px-3 space-y-3">
        <div className="h-5 flex items-center px-1 text-slate-400">
          {collapsed ? (
            <FiMoreHorizontal size={16} className="mx-auto opacity-70" />
          ) : (
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Quản lý
            </p>
          )}
        </div>

        <div className="space-y-1.5 mt-1">
          <div className="relative">
            {renderItem("/dashboard", <FiGrid size={18} />, "Tổng quan", true)}
          </div>

          <div className="relative">
            {renderItem("/dashboard/products", <FiBox size={18} />, "Sản phẩm")}
          </div>

          <div className="relative">
            {renderItem(
              "/dashboard/orders",
              <FiShoppingCart size={18} />,
              "Đơn hàng",
            )}
          </div>

          <div className="relative">
            {renderItem("/dashboard/profile", <FiUser size={18} />, "Hồ sơ")}
          </div>
        </div>
      </div>

      {/* ===== FOOTER LOGOUT ===== */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={handleLogout}
          className={`${navItem} w-full text-red-600 hover:bg-red-50 hover:text-red-700`}
        >
          <div className="w-6 flex justify-center items-center text-base flex-shrink-0">
            <FiLogOut size={18} />
          </div>

          <motion.div
            initial={false}
            animate={{
              width: collapsed ? 0 : "auto",
              opacity: collapsed ? 0 : 1,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            <span className="truncate">Đăng xuất</span>
          </motion.div>

          {collapsed && (
            <span
              className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2
               rounded-md bg-gray-900 px-2.5 py-1 text-xs font-medium
               text-white shadow-lg whitespace-nowrap z-50
               opacity-0 group-hover:opacity-100
               transition-opacity duration-150"
            >
              Đăng xuất
            </span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}

export default AdminSidebar;
