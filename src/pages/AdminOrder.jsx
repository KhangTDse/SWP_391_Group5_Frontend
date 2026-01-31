import { useState } from "react";

const ordersMock = [
  { id: 1, customer: "Nguyen Van A", status: "Completed", total: 120 },
  { id: 2, customer: "Tran Thi B", status: "Pending", total: 80 },
  { id: 3, customer: "Le Van C", status: "Shipping", total: 150 },
];

function AdminOrders() {
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All"
      ? ordersMock
      : ordersMock.filter((o) => o.status === filter);

  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>

      {/* Filter */}
      <div className="flex gap-3 mb-4">
        {["All", "Completed", "Pending", "Shipping"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded ${
              filter === s ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="bg-white rounded-xl shadow p-6">
        {filteredOrders.map((o) => (
          <div key={o.id} className="flex justify-between border-b py-2">
            <span>{o.customer}</span>
            <span>{o.status}</span>
            <span>${o.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
