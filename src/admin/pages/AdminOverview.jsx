import StatCard from "../components/StatCard";
import { Link } from "react-router-dom";
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

import {
  revenueData,
  orderStatusData,
  overviewStats,
  recentOrders,
} from "../data/adminMock";

/* =========================
   PIE COLORS
========================= */
const pieColors = ["#2563eb", "#22c55e", "#facc15", "#ef4444"];



function AdminOverview() {
  return (
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      {/* =========================
         PAGE TITLE
      ========================= */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Tổng quan hệ thống</h1>
        <p className="text-sm text-gray-500">
          Theo dõi hiệu suất kinh doanh và đơn hàng
        </p>
      </div>

      {/* =========================
         STATS
      ========================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Tổng doanh thu"
          value={overviewStats[0].value}
          icon={<FiDollarSign />}
          color="blue"
        />
        <StatCard
          title="Đơn hàng"
          value={overviewStats[1].value}
          icon={<FiShoppingCart />}
          color="green"
        />
        <StatCard
          title="Khách hàng"
          value={overviewStats[2].value}
          icon={<FiUsers />}
          color="yellow"
        />
        <StatCard
          title="Tăng trưởng"
          value={overviewStats[3].value}
          icon={<FiTrendingUp />}
          color="purple"
        />
      </section>

      {/* =========================
         CHARTS ROW 1
      ========================= */}
      <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AREA CHART */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Doanh thu 7 ngày
          </h2>

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

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Tỷ lệ trạng thái
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* =========================
         CHARTS ROW 2
      ========================= */}
      <section className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* LINE CHART */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Xu hướng tăng trưởng
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Số lượng đơn hàng
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={orderStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* =========================
   RECENT ORDERS
========================= */}
      <section className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-800">
            Đơn hàng gần đây
          </h2>

          <Link
            to="/dashboard/orders"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase text-gray-500 border-b border-gray-200">
                <th className="py-3 text-left">Mã đơn</th>
                <th className="text-left">Khách hàng</th>
                <th className="text-left">Ngày</th>
                <th className="text-left">Trạng thái</th>
                <th className="text-right">Tổng tiền</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {
                const statusMap = {
                  completed: "bg-green-50 text-green-700 border-green-200",
                  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
                  cancelled: "bg-red-50 text-red-700 border-red-200",
                };

                return (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
                  >
                    {/* ORDER ID */}
                    <td className="py-4 font-medium text-gray-800">
                      {order.id}
                    </td>

                    {/* CUSTOMER WITH AVATAR */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.avatar}
                          alt={order.customer}
                          className="w-10 h-10 rounded-full object-cover border"
                        />

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {order.customer}
                          </p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="text-sm text-gray-600">{order.createdAt}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                          statusMap[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* TOTAL */}
                    <td className="text-right font-semibold text-gray-800">
                      {order.total}
                    </td>
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
