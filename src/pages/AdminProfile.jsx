import { useState } from "react";
import { FiEdit, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { adminMock } from "../data/adminMock";
import AdminTopHeader from "../components/AdminTopHeader";

function AdminProfile() {
  const [admin, setAdmin] = useState(adminMock);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen font-admin">
      {/* ===== CARD WRAPPER ===== */}
      <AdminTopHeader title="Hồ sơ" />

      <div className="bg-white rounded-xl shadow p-6 max-w-3xl">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-800">
            Thông tin quản trị viên
          </h1>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiEdit />
            {editing ? "Lưu thay đổi" : "Chỉnh sửa"}
          </button>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TÊN */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiUser /> Họ tên
            </label>
            <input
              name="name"
              disabled={!editing}
              value={admin.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-sm ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiMail /> Email
            </label>
            <input
              name="email"
              disabled={!editing}
              value={admin.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-sm ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          {/* SỐ ĐIỆN THOẠI */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiPhone /> Số điện thoại
            </label>
            <input
              name="phone"
              disabled={!editing}
              value={admin.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-sm ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          {/* VAI TRÒ */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Vai trò</label>
            <input
              disabled
              value={admin.role}
              className="w-full px-4 py-2 border rounded-lg text-sm bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
