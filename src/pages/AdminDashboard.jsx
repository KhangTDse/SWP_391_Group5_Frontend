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

/* ===== MOCK DATA (sau này thay API) ===== */
const revenueData = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 2100 },
  { day: "Wed", revenue: 1800 },
  { day: "Thu", revenue: 2600 },
  { day: "Fri", revenue: 3200 },
  { day: "Sat", revenue: 2800 },
  { day: "Sun", revenue: 3500 },
];

const orderStatusData = [
  { name: "Completed", value: 68 },
  { name: "Pending", value: 32 },
  { name: "Shipping", value: 20 },
];

function AdminDashboard() {
  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <AdminTopHeader />

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Products" value="128" />
        <StatCard title="Orders Today" value="32" />
        <StatCard title="Customers" value="540" />
        <StatCard title="Revenue" value="$12,400" />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Weekly Revenue</h2>

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

        {/* Orders Status Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>

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

      {/* ===== RECENT ORDERS ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">#001</td>
              <td>Nguyen Van A</td>
              <td className="text-green-600 font-medium">Completed</td>
              <td>$120</td>
            </tr>
            <tr>
              <td className="py-2">#002</td>
              <td>Tran Thi B</td>
              <td className="text-yellow-600 font-medium">Pending</td>
              <td>$80</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
