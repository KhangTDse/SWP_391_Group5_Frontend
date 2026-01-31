import StatCard from "../components/StatCard";

function AdminOverview() {
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-semibold mb-6">Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Orders" value="320" />
        <StatCard title="Completed" value="280" />
        <StatCard title="Pending" value="25" />
        <StatCard title="Revenue" value="$18,200" />
      </div>

      {/* Chart placeholder */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Chart will be here (API later)
        </div>
      </div>
    </div>
  );
}

export default AdminOverview;
