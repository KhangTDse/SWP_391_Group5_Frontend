import { useState } from 'react';
import { Link } from 'react-router-dom';

function ShopPage() {
    // Mock data danh sách sản phẩm (Nhiều hơn trang chủ để nhìn cho đã)
    const allProducts = [
        { id: 1, name: "Classic Ray-Ban Aviator", price: "3.500.000₫", category: "Men", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80" },
        { id: 2, name: "Matte Black Wayfarer", price: "3.200.000₫", category: "Unisex", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" },
        { id: 3, name: "Round Metal Gold", price: "4.500.000₫", category: "Women", img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80" },
        { id: 4, name: "Clubmaster Classic", price: "3.800.000₫", category: "Men", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80" },
        { id: 5, name: "Square 1971 Classic", price: "4.100.000₫", category: "Women", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80" },
        { id: 6, name: "Hexagonal Flat Lenses", price: "3.600.000₫", category: "Unisex", img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80" },
    ];

    const [filter, setFilter] = useState("All");

    // Logic lọc sản phẩm giả (Sau này Backend làm)
    const filteredProducts = filter === "All"
        ? allProducts
        : allProducts.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* HEADER CỦA SHOP */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">Cửa Hàng</h1>

                    {/* Thanh tìm kiếm & Bộ lọc */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Tìm kiếm kính..."
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:outline-none focus:border-amber-500"
                        />
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="All">Tất cả</option>
                            <option value="Men">Nam</option>
                            <option value="Women">Nữ</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                </div>

                {/* DANH SÁCH SẢN PHẨM (GRID) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group">
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                                <div className="h-64 overflow-hidden bg-gray-100 relative">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-white text-sm font-bold">Xem chi tiết</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                                    <p className="text-amber-600 font-bold mt-2">{product.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* NẾU KHÔNG TÌM THẤY SẢN PHẨM */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Không tìm thấy sản phẩm nào thuộc mục này.
                    </div>
                )}

            </div>
        </div>
    );
}

export default ShopPage;