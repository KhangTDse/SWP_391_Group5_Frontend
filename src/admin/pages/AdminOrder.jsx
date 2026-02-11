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
  const [sortOrder, setSortOrder] = useState("default"); // default | asc | desc
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const navigate = useNavigate();

  /* ================= FILTER + SORT ================= */
  const filteredOrders = useMemo(() => {
    let result = ordersMock.filter((o) => {
      const matchText =
        o.code.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || o.status === status;

      return matchText && matchStatus;
    });

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.total - b.total);
    }

    if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.total - a.total);
    }

    return result;
  }, [search, status, sortOrder]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const safeCurrentPage =
    totalPages === 0 ? 1 : currentPage > totalPages ? totalPages : currentPage;

  const paginatedOrders = filteredOrders.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  /* ================= SMART PAGINATION ================= */
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (safeCurrentPage > 4) pages.push("...");

      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (safeCurrentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý đơn hàng</h1>
        <p className="text-sm text-gray-500">
          Theo dõi và quản lý toàn bộ đơn hàng trong hệ thống
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* TOOLBAR */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex gap-3">
            <div className="relative w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm mã đơn hoặc khách hàng..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="completed">Hoàn thành</option>
              <option value="pending">Chờ xử lý</option>
              <option value="cancelled">Đã huỷ</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-gray-50">
                <tr className="text-xs uppercase text-gray-500 border-b">
                  <th className="w-[15%] text-left px-6 py-3">Mã đơn</th>
                  <th className="w-[30%] text-left px-6 py-3">Khách hàng</th>

                  {/* SORT TOTAL */}
                  <th className="w-[15%] text-right px-6 py-3">
                    <span
                      onClick={() =>
                        setSortOrder((prev) =>
                          prev === "asc"
                            ? "desc"
                            : prev === "desc"
                              ? "default"
                              : "asc",
                        )
                      }
                      className="cursor-pointer select-none text-sm font-medium text-gray-700 hover:text-black transition-colors normal-case"
                    >
                      {sortOrder === "default" && "Tổng tiền"}
                      {sortOrder === "asc" && "Tổng tiền ↑"}
                      {sortOrder === "desc" && "Tổng tiền ↓"}
                    </span>
                  </th>

                  <th className="w-[15%] text-center px-6 py-3">Trạng thái</th>
                  <th className="w-[15%] text-center px-6 py-3">Ngày tạo</th>
                  <th className="w-[10%] text-right px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order) => {
                  const statusUI = statusMap[order.status];

                  return (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {order.code}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.avatar}
                            alt=""
                            className="w-9 h-9 rounded-full object-cover border"
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

                      <td className="px-6 py-4 text-right font-semibold">
                        {order.total.toLocaleString()} ₫
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${statusUI.className}`}
                        >
                          {statusUI.label}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center text-gray-500">
                        {order.createdAt}
                      </td>

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

                {paginatedOrders.length === 0 && (
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

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 items-center gap-2 select-none">
            <button
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition disabled:opacity-30"
            >
              ←
            </button>

            {getPagination().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm transition
                    ${
                      safeCurrentPage === page
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 rounded-lg text-gray-500 hover:text-black hover:bg-gray-100 transition disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
