import { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { ordersMock } from "../data/adminMock";
import AdminTopHeader from "../components/AdminTopHeader";

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [orders] = useState(ordersMock);

  const filteredOrders = orders.filter(
    (o) =>
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen font-admin">
      <AdminTopHeader title="Đơn hàng"/>
      
      {/* ===== CARD WRAPPER ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between mb-6">
          {/* SEARCH */}
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm đơn hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">Mã đơn</th>
                <th className="text-left px-6 py-3">Khách hàng</th>
                <th className="text-right px-6 py-3">Tổng tiền</th>
                <th className="text-center px-6 py-3">Trạng thái</th>
                <th className="text-center px-6 py-3">Ngày tạo</th>
                <th className="text-right px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    #{order.code}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    {order.total.toLocaleString()} ₫
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-gray-500">
                    {order.createdAt}
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                        <FiEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Không tìm thấy đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
