import { adminInfo } from "../data/adminMock";

function ProfileCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-xl">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={adminInfo.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-xl font-semibold">{adminInfo.name}</h2>
          <p className="text-gray-500">{adminInfo.role}</p>
        </div>
      </div>

      {/* Form chỉnh sửa */}
      <div className="space-y-4">
        <input
          className="w-full border rounded px-4 py-2"
          defaultValue={adminInfo.email}
          placeholder="Email"
        />
        <input
          className="w-full border rounded px-4 py-2"
          defaultValue={adminInfo.phone}
          placeholder="Số điện thoại"
        />

        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
