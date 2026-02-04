import { useState } from "react";
import { productsMock } from "../data/adminMock";
import { FiPlus, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import AdminTopHeader from "../components/AdminTopHeader";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [products] = useState(productsMock);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-64 p-8 bg-gray-50 min-h-screen font-admin">
      <AdminTopHeader title="Sản phẩm"/>
      
      {/* ===== CARD WRAPPER ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between mb-6">
          {/* SEARCH */}
          <div className="relative w-72">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ADD BUTTON */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <FiPlus />
            Thêm sản phẩm
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="text-left px-6 py-3">Sản phẩm</th>
                <th className="text-left px-6 py-3">Danh mục</th>
                <th className="text-right px-6 py-3">Giá</th>
                <th className="text-center px-6 py-3">Tồn kho</th>
                <th className="text-right px-6 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-right font-medium">
                    {product.price.toLocaleString()} ₫
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                        <FiEdit2 />
                      </button>
                      <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">
                    Không tìm thấy sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
