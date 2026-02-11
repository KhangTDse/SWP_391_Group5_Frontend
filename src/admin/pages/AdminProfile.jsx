import { useState } from "react";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiUser,
  FiShield,
  FiMapPin,
  FiX,
  FiGithub,
  FiFacebook,
  FiGlobe,
} from "react-icons/fi";
import { adminMock } from "../data/adminMock";

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
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      <div className="bg-white rounded-2xl border border-gray-200">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={admin.img}
              alt={admin.name}
              className="w-16 h-16 rounded-full object-cover border"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {admin.name}
              </h2>

              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                {admin.role}
              </span>

              <p className="text-xs text-gray-400 mt-1">ID: #{admin.id}</p>
            </div>
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FiEdit size={14} />
              Chỉnh sửa
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                <FiX size={14} />
                Huỷ
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Lưu
              </button>
            </div>
          )}
        </div>

        {/* ===== BODY ===== */}
        <div className="p-6 space-y-8">
          <Section title="Thông tin cá nhân">
            <ProfileField
              icon={<FiUser size={14} />}
              label="Họ và tên"
              value={admin.name}
              editing={editing}
              name="name"
              draftValue={draft.name}
              onChange={handleChange}
            />

            <ProfileField
              icon={<FiMail size={14} />}
              label="Email"
              value={admin.email}
              editing={editing}
              name="email"
              draftValue={draft.email}
              onChange={handleChange}
            />
          </Section>

          <Section title="Thông tin liên hệ">
            <ProfileField
              icon={<FiPhone size={14} />}
              label="Số điện thoại"
              value={admin.phone}
              editing={editing}
              name="phone"
              draftValue={draft.phone}
              onChange={handleChange}
            />

            <ProfileField
              icon={<FiMapPin size={14} />}
              label="Địa chỉ"
              value={admin.address}
              editing={editing}
              name="address"
              draftValue={draft.address}
              onChange={handleChange}
              textarea
            />
          </Section>

          <Section title="Liên kết">
            <ProfileDisplay icon={<FiGithub size={14} />} label="GitHub">
              github.com/admin-demo
            </ProfileDisplay>

            <ProfileDisplay icon={<FiFacebook size={14} />} label="Facebook">
              facebook.com/admin-demo
            </ProfileDisplay>

            <ProfileDisplay icon={<FiGlobe size={14} />} label="Website">
              www.admin-demo.com
            </ProfileDisplay>
          </Section>

          <Section title="Hệ thống">
            <ProfileDisplay icon={<FiShield size={14} />} label="Vai trò">
              {admin.role}
            </ProfileDisplay>

            <ProfileDisplay label="Role (EN)">{admin.role_EN}</ProfileDisplay>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ============================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
  editing,
  name,
  draftValue,
  onChange,
  textarea,
}) {
  if (!editing) {
    return (
      <ProfileDisplay icon={icon} label={label}>
        {value}
      </ProfileDisplay>
    );
  }

  return (
    <div>
      <label className="text-xs text-gray-500 flex items-center gap-2 mb-1">
        {icon} {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={draftValue}
          onChange={onChange}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 resize-none"
        />
      ) : (
        <input
          name={name}
          value={draftValue}
          onChange={onChange}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}

function ProfileDisplay({ icon, label, children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <div className="text-xs text-gray-500 flex items-center gap-2 mb-1">
        {icon}
        {label}
      </div>
      <div className="text-sm font-medium text-gray-900 break-words">
        {children}
      </div>
    </div>
  );
}

export default AdminProfile;
