import { useMemo, useState } from "react";
import { productsMock } from "../data/adminMock";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPackage,
  FiCheck,
} from "react-icons/fi";
import AddProductModal from "../modal/AddProductModal";
import { motion, AnimatePresence } from "framer-motion";

function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  // default | asc | desc

  const [products, setProducts] = useState(productsMock);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* ================= FILTER ================= */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || p.category === category;

      let matchPrice = true;

      switch (priceFilter) {
        case "under500":
          matchPrice = p.price < 500000;
          break;
        case "500to1m":
          matchPrice = p.price >= 500000 && p.price <= 1000000;
          break;
        case "1mto2m":
          matchPrice = p.price > 1000000 && p.price <= 2000000;
          break;
        case "over2m":
          matchPrice = p.price > 2000000;
          break;
        default:
          matchPrice = true;
      }

      return matchName && matchCategory && matchPrice;
    });

    // ===== SORT =====
    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, priceFilter, sortOrder]);

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const safeCurrentPage =
    totalPages === 0 ? 1 : currentPage > totalPages ? totalPages : currentPage;

  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );

  /* Fix page overflow khi xóa */
  // useEffect(() => {
  //   if (currentPage > totalPages && totalPages > 0) {
  //     setCurrentPage(totalPages);
  //   }
  // }, [totalPages, currentPage]);

  /* ================= SELECT ================= */
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    const pageIds = paginatedProducts.map((p) => p.id);
    const allSelected = pageIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = () => {
    if (confirmDelete === "bulk") {
      setProducts((prev) => prev.filter((p) => !selected.includes(p.id)));
      setSelected([]);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== confirmDelete));
      setSelected((prev) => prev.filter((id) => id !== confirmDelete));
    }
    setConfirmDelete(null);
  };

  const handleAddProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  /* ================= STOCK UI ================= */
  const renderStock = (stock) => {
    if (stock === 0)
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700 border border-red-300">
          Hết hàng
        </span>
      );

    if (stock <= 10)
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300">
          Sắp hết ({stock})
        </span>
      );

    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 border border-green-300">
        Còn hàng ({stock})
      </span>
    );
  };

  /* ================= SMART PAGINATION ================= */
  const getPagination = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const isEmpty = products.length === 0;
  const isFilteredEmpty = filteredProducts.length === 0;

  return (
    <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <p className="text-sm text-gray-500">
          Theo dõi và quản lý toàn bộ sản phẩm
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* TOOLBAR giữ nguyên UI */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex gap-3">
            <div className="relative w-72">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "Tất cả danh mục" : c}
                </option>
              ))}
            </select>

            <select
              value={priceFilter}
              onChange={(e) => {
                setPriceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under500">Dưới 500k</option>
              <option value="500to1m">500k - 1 triệu</option>
              <option value="1mto2m">1 - 2 triệu</option>
              <option value="over2m">Trên 2 triệu</option>
            </select>
          </div>

          <div className="flex gap-3">
            {selected.length > 0 && (
              <button
                onClick={() => setConfirmDelete("bulk")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Xoá ({selected.length})
              </button>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* TABLE giữ nguyên UI của bạn */}
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-gray-50">
                <tr className="text-xs uppercase text-gray-500 border-b">
                  <th className="w-[5%] px-4 py-3 text-center">
                    <div
                      onClick={toggleSelectAll}
                      className="w-5 h-5 border rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
                    >
                      {paginatedProducts.length > 0 &&
                        paginatedProducts.every((p) =>
                          selected.includes(p.id),
                        ) && <FiCheck size={14} />}
                    </div>
                  </th>
                  <th className="w-[30%] text-left px-6 py-3">Sản phẩm</th>
                  <th className="w-[20%] text-left px-6 py-3">Danh mục</th>
                  <th className="w-[15%] text-right px-6 py-3">
                    <span
                      onClick={() =>
                        setSortOrder((prev) =>
                          prev === "asc"
                            ? "desc"
                            : prev === "desc"
                              ? "default"
                              : "asc",
                        )
                      }
                      className="cursor-pointer select-none text-sm font-medium text-gray-700 hover:text-black transition-colors normal-case"
                    >
                      {sortOrder === "default" && "Giá"}
                      {sortOrder === "asc" && "Giá ↑"}
                      {sortOrder === "desc" && "Giá ↓"}
                    </span>
                  </th>

                  <th className="w-[15%] text-center px-6 py-3">Tồn kho</th>
                  <th className="w-[15%] text-right px-6 py-3">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {isFilteredEmpty && (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center text-gray-400 gap-3">
                        <FiPackage className="text-4xl" />
                        <p>
                          {isEmpty
                            ? "Không có sản phẩm nào trong hệ thống"
                            : "Không tìm thấy sản phẩm phù hợp"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}

                {!isFilteredEmpty &&
                  paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 text-center">
                        <div
                          onClick={() => toggleSelect(product.id)}
                          className="w-5 h-5 border rounded flex items-center justify-center cursor-pointer hover:border-blue-500"
                        >
                          {selected.includes(product.id) && (
                            <FiCheck size={14} />
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={product.img}
                          className="w-10 h-10 rounded-lg border object-cover"
                          alt=""
                        />
                        <span className="font-medium text-gray-800">
                          {product.name}
                        </span>
                      </td>

                      <td className="px-6 py-4">{product.category}</td>

                      <td className="px-6 py-4 text-right font-semibold">
                        {product.price.toLocaleString()} ₫
                      </td>

                      <td className="px-6 py-4 text-center">
                        {renderStock(product.stock)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-3">
                          <button className="p-2 rounded-lg text-blue-700 hover:bg-blue-200 hover:text-blue-900 transition">
                            <FiEdit2 />
                          </button>

                          <button
                            onClick={() => setConfirmDelete(product.id)}
                            className="p-2 rounded-lg text-red-700 hover:bg-red-200 hover:text-red-900 transition"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= PAGINATION NÂNG CẤP ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 items-center gap-2 select-none">
            {/* PREV */}
            <button
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-2 rounded-lg text-gray-500 
                         hover:text-black hover:bg-gray-100 
                         transition-all duration-200
                         disabled:opacity-30 disabled:hover:bg-transparent"
            >
              ←
            </button>

            {getPagination().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-200
                    ${
                      safeCurrentPage === page
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  {page}
                </button>
              ),
            )}

            {/* NEXT */}
            <button
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 rounded-lg text-gray-500 
                         hover:text-black hover:bg-gray-100 
                         transition-all duration-200
                         disabled:opacity-30 disabled:hover:bg-transparent"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* CONFIRM DELETE MODAL giữ nguyên */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="bg-white rounded-2xl p-6 w-96 shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-3">Xác nhận xoá</h3>
              <p className="text-sm text-gray-600 mb-6">
                Bạn có chắc muốn xoá mục đã chọn?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Huỷ
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Xoá
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* //ADD MODEL// */}
      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
}

export default AdminProducts;
