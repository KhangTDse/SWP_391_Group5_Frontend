function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin & Staff Dashboard</h1>
      <p className="text-gray-500 mb-8">System overview</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400">Products</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400">Frames</p>
          <h2 className="text-3xl font-bold mt-2">65</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400">Lenses</p>
          <h2 className="text-3xl font-bold mt-2">40</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-400">Orders Today</p>
          <h2 className="text-3xl font-bold mt-2">18</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
