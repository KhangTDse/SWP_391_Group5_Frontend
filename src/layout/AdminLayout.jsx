import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin-font.css"
function AdminLayout() {
  return (
    <div className=" admin-root flex h-screen bg-gray-100">
      {/* Sidebar cố định */}
      <AdminSidebar />

      {/* Nội dung bên phải */}
      <div className="admin-root flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
