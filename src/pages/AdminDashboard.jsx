import StatCard from "../components/StatCard";
import AdminTopHeader from "../components/AdminTopHeader";

function AdminDashboard() {
  return (
    <div className="ml-64 p-8">
      {/* Header */}
      <AdminTopHeader />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Products" value="128" />
        <StatCard title="Orders Today" value="32" />
        <StatCard title="Customers" value="540" />
        <StatCard title="Revenue" value="$12,400" />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
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
              <td className="text-green-600">Completed</td>
              <td>$120</td>
            </tr>
            <tr>
              <td className="py-2">#002</td>
              <td>Tran Thi B</td>
              <td className="text-yellow-600">Pending</td>
              <td>$80</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
