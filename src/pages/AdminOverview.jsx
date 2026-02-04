import StatCard from "../components/StatCard";
import AdminTopHeader from "../components/AdminTopHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import {
  revenueData,
  orderStatusData,
  overviewStats,
  recentOrders,
} from "../data/adminMock";

function AdminOverview() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <AdminTopHeader title="Tổng quan" />

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {overviewStats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
          />
        ))}
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Doanh thu theo tuần */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">
            Doanh thu theo tuần
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trạng thái đơn hàng */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Trạng thái đơn hàng
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStatusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== ĐƠN HÀNG GẦN ĐÂY ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Đơn hàng gần đây
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Mã đơn</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.id}</td>
                <td>{order.customer}</td>
                <td className={`${order.statusColor} font-medium`}>
                  {order.status}
                </td>
                <td>{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOverview;
