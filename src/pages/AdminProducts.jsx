import { useMemo, useState } from "react";
import { productsMock } from "../data/adminMock";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [products] = useState(productsMock);

  /* =========================
     CATEGORY LIST
  ========================= */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  /* =========================
     FILTER
  ========================= */
  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || p.category === category;
    return matchName && matchCategory;
  });

  /* =========================
     STOCK UI
  ========================= */
  const renderStock = (stock) => {
    if (stock === 0) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          Hết hàng
        </span>
      );
    }

    if (stock <= 10) {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          Sắp hết ({stock})
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
        Còn hàng ({stock})
      </span>
    );
  };

  return (
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      {/* =========================
         PAGE HEADER
      ========================= */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <p className="text-sm text-gray-500">
          Theo dõi và quản lý toàn bộ sản phẩm trong hệ thống
        </p>
      </div>

      {/* =========================
         MAIN CARD
      ========================= */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* =========================
           TOOLBAR
        ========================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH */}
            <div className="relative w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Tất cả danh mục" : c}
                </option>
              ))}
            </select>
          </div>

          {/* ADD BUTTON */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
            <FiPlus />
            Thêm sản phẩm
          </button>
        </div>

        {/* =========================
           TABLE
        ========================= */}
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
              <tr>
                <th className="text-left px-6 py-3">Sản phẩm</th>
                <th className="text-left px-6 py-3">Danh mục</th>
                <th className="text-right px-6 py-3">Giá</th>
                <th className="text-center px-6 py-3">Tồn kho</th>
                <th className="text-right px-6 py-3">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* PRODUCT INFO */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://picsum.photos/seed/${product.id}/50`}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 text-right font-semibold">
                    {product.price.toLocaleString()} ₫
                  </td>

                  {/* STOCK */}
                  <td className="px-6 py-4 text-center">
                    {renderStock(product.stock)}
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

              {/* EMPTY STATE */}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3 text-gray-400">
                      <FiPackage className="text-4xl" />
                      <p className="text-sm">Không tìm thấy sản phẩm phù hợp</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-4 text-sm text-gray-500">
          Hiển thị {filteredProducts.length} / {products.length} sản phẩm
        </div>
      </div>
    </div>
  );
}

export default AdminProducts;
