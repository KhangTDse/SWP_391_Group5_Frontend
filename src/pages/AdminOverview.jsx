import StatCard from "../components/StatCard";
import AdminTopHeader from "../components/AdminTopHeader";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

import {
  revenueData,
  orderStatusData,
  overviewStats,
  recentOrders,
} from "../data/adminMock";

/* ===== STATUS UI MAP (FRONTEND QUYẾT ĐỊNH) ===== */
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

function AdminOverview() {
  return (
    <div className="ml-64 px-8 pt-6 pb-12 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <AdminTopHeader
        title="Tổng quan"
        subtitle="Tình hình kinh doanh & hoạt động cửa hàng"
        breadcrumb={["Dashboard", "Tổng quan"]}
      />

      {/* ===== STATS ===== */}
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {overviewStats.map((item, index) => (
          <StatCard key={index} title={item.title} value={item.value} />
        ))}
      </section>

      {/* ===== CHARTS ===== */}
      <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Doanh thu theo tuần
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Tổng doanh thu 7 ngày gần nhất
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Trạng thái đơn hàng
          </h2>
          <p className="text-xs text-gray-500 mb-4">Phân bổ theo trạng thái</p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* ===== RECENT ORDERS ===== */}
      <section className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Đơn hàng gần đây
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                <th className="py-3 text-left">Mã đơn</th>
                <th className="text-left">Khách hàng</th>
                <th className="text-left">Trạng thái</th>
                <th className="text-right">Tổng tiền</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {
                const status = statusMap[order.status] || {
                  label: order.status,
                  className: "bg-gray-50 text-gray-700 border-gray-200",
                };

                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50"
                  >
                    <td className="py-3 font-medium">{order.id}</td>
                    <td>{order.customer}</td>
                    <td>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="text-right font-semibold">{order.total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminOverview;
