import { NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
  `block px-3 py-2 rounded transition ${
    isActive ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
  }`;

function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r fixed h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <nav className="space-y-2 text-gray-700">
        <NavLink to="/dashboard" end className={menuClass}>
          Overview
        </NavLink>
        <NavLink to="/dashboard/products" className={menuClass}>
          Products
        </NavLink>
        <NavLink to="/dashboard/orders" className={menuClass}>
          Orders
        </NavLink>
      </nav>
    </div>
  );
}

export default AdminSidebar;
