const mockProducts = [
  { id: 1, name: "Classic Glasses", price: 120, stock: 10 },
  { id: 2, name: "Modern Frame", price: 90, stock: 15 },
];

function AdminProducts() {
  return (
    <div className="ml-64 p-8">
      <h1 className="text-3xl font-semibold mb-6">Products</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
