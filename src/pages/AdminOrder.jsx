import { useMemo, useState } from "react";
import { FiSearch, FiEye, FiShoppingBag } from "react-icons/fi";
import { ordersMock } from "../data/adminMock";
import AdminTopHeader from "../components/AdminTopHeader";

/* ===== STATUS UI MAP (FRONTEND TỰ MAP) ===== */
const statusMap = {
  completed: {
    label: "Hoàn thành",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  pending: {
    label: "Chờ xử lý",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  cancelled: {
    label: "Đã huỷ",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [orders] = useState(ordersMock);

  /* ===== FILTER ===== */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchText =
        o.code.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "all" || o.status === status;

      return matchText && matchStatus;
    });
  }, [orders, search, status]);

  return (
    <div className="ml-64 px-8 pt-6 pb-12 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <AdminTopHeader
        title="Đơn hàng"
        subtitle="Quản lý và theo dõi đơn hàng của khách"
        breadcrumb={["Dashboard", "Đơn hàng"]}
      />

      {/* ===== CARD ===== */}
      <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
        {/* ===== TOOLBAR ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div className="relative w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm mã đơn hoặc khách hàng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending">Chờ xử lý</option>
              <option value="cancelled">Đã huỷ</option>
            </select>
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
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
              {filteredOrders.map((order) => {
                const statusUI =
                  statusMap[order.status] ||
                  {
                    label: order.status,
                    className:
                      "bg-gray-50 text-gray-700 border-gray-200",
                  };

                return (
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

                    <td className="px-6 py-4 text-right font-semibold">
                      {order.total.toLocaleString()} ₫
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusUI.className}`}
                      >
                        {statusUI.label}
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
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-14 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FiShoppingBag className="text-3xl" />
                      <p>Không tìm thấy đơn hàng phù hợp</p>
                    </div>
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
