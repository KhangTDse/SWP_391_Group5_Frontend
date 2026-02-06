import { useState } from "react";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiUser,
  FiShield,
  FiMapPin,
  FiX,
} from "react-icons/fi";
import { adminMock } from "../data/adminMock";
import AdminTopHeader from "../components/AdminTopHeader";

function AdminProfile() {
  const [admin, setAdmin] = useState(adminMock);
  const [draft, setDraft] = useState(adminMock);
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setAdmin(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(admin);
    setEditing(false);
  };

  return (
    <div className="ml-64 px-8 pt-6 pb-12 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <AdminTopHeader
        title="Hồ sơ"
        subtitle="Thông tin tài khoản quản trị viên"
        breadcrumb={["Dashboard", "Hồ sơ"]}
      />

      {/* ===== CARD ===== */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 max-w-5xl">
        {/* ===== TOP ===== */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-5">
            {/* AVATAR */}
            {admin.img ? (
              <img
                src={admin.img}
                alt={admin.name}
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
                {admin.name.charAt(0)}
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {admin.name}
              </h2>
              <p className="text-sm text-gray-500">{admin.role}</p>
            </div>
          </div>

          {/* ACTION */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiEdit />
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                <FiX />
                Huỷ
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Lưu thay đổi
              </button>
            </div>
          )}
        </div>

        {/* ===== FORM ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiUser /> Họ tên
            </label>
            <input
              name="name"
              disabled={!editing}
              value={draft.name}
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
              value={draft.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-sm ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiPhone /> Số điện thoại
            </label>
            <input
              name="phone"
              disabled={!editing}
              value={draft.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg text-sm ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiShield /> Vai trò
            </label>
            <input
              disabled
              value={admin.role}
              className="w-full px-4 py-2 border rounded-lg text-sm bg-gray-100"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-500 flex items-center gap-2 mb-1">
              <FiMapPin /> Địa chỉ
            </label>
            <textarea
              name="address"
              disabled={!editing}
              value={draft.address}
              onChange={handleChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg text-sm resize-none ${
                editing ? "focus:ring-2 focus:ring-blue-500" : "bg-gray-100"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
