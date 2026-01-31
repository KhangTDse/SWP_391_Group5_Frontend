function AdminTopHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>

      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src="https://i.pravatar.cc/40"
          alt="admin"
          className="rounded-full"
        />
        <div className="text-sm">
          <p className="font-medium">Admin</p>
          <p className="text-gray-500">admin@eyewear.com</p>
        </div>
      </div>
    </div>
  );
}

export default AdminTopHeader;
