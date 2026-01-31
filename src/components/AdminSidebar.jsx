function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r shadow-sm fixed h-screen">
      <div className="p-6 text-2xl font-bold tracking-wide">Dashboard</div>

      <ul className="px-4 space-y-3 text-gray-700">
        <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
          Overview
        </li>
        <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
          Products
        </li>
        <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
          Orders
        </li>
        <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
          Customers
        </li>
        <li className="hover:bg-gray-100 px-3 py-2 rounded cursor-pointer">
          Messages
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
