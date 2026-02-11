import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiEye, FiShoppingBag } from "react-icons/fi";
import { ordersMock } from "../data/adminMock";

const statusMap = {
  completed: {
    label: "Hoàn thành",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  pending: {
    label: "Chờ xử lý",
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  },
  cancelled: {
    label: "Đã huỷ",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
};

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  const filteredOrders = useMemo(() => {
    return ordersMock.filter((o) => {
      const matchText =
        o.code.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || o.status === status;

      return matchText && matchStatus;
    });
  }, [search, status]);

  return (
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý đơn hàng</h1>
        <p className="text-sm text-gray-500">
          Theo dõi và quản lý toàn bộ đơn hàng trong hệ thống
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH */}
            <div className="relative w-72 max-w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm mã đơn hoặc khách hàng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending">Chờ xử lý</option>
              <option value="cancelled">Đã huỷ</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-200">
                  <th className="text-left px-6 py-3 font-medium">Mã đơn</th>
                  <th className="text-left px-6 py-3 font-medium">
                    Khách hàng
                  </th>
                  <th className="text-right px-6 py-3 font-medium">
                    Tổng tiền
                  </th>
                  <th className="text-center px-6 py-3 font-medium">
                    Trạng thái
                  </th>
                  <th className="text-center px-6 py-3 font-medium">
                    Ngày tạo
                  </th>
                  <th className="text-right px-6 py-3 font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => {
                  const statusUI = statusMap[order.status];

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                    >
                      {/* ORDER CODE */}
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {order.code}
                      </td>

                      {/* CUSTOMER */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.avatar}
                            alt={order.customer}
                            className="w-9 h-9 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-medium text-gray-800">
                              {order.customer}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* TOTAL */}
                      <td className="px-6 py-4 text-right font-semibold text-gray-800">
                        {order.total.toLocaleString()} ₫
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusUI.className}`}
                        >
                          {statusUI.label}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4 text-center text-gray-500">
                        {order.createdAt}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              navigate(`/dashboard/orders/${order.id}`)
                            }
                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                          >
                            <FiEye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {/* EMPTY STATE */}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-gray-400">
                        <FiShoppingBag className="text-4xl" />
                        <p className="text-sm">
                          Không tìm thấy đơn hàng phù hợp
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
