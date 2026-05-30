"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/product", { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    loadProducts();
  }, []);

  const handleStockChange = (productId, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.product_id === productId ? { ...p, stock: value } : p))
    );
  };

  const saveStock = async (productId, stock) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock })
      });
      if (!res.ok) throw new Error("Failed to update stock");
      const updated = await res.json();

      // update local state with saved stock
      setProducts((prev) =>
        prev.map((p) =>
          p.product_id === productId ? { ...p, stock: updated.stock } : p
        )
      );
      alert("Stock updated successfully!");
    } catch (err) {
      console.error("Error updating stock:", err);
      alert("Failed to update stock");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Inventory</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="bg-white p-4 border rounded shadow flex flex-col gap-3"
            >
              {product.product_image && (
                <div className="relative w-full h-40">
                  <Image
                    src={product.product_image}
                    alt={product.product_name}
                    fill
                    sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw"
                    className="object-cover rounded"
                  />
                </div>
              )}
              <h2 className="font-semibold text-lg">{product.product_name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-700">{product.product_des}</p>

              {/* Stock input */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  value={product.stock ?? 0}
                  onChange={(e) =>
                    handleStockChange(
                      product.product_id,
                      Number(e.target.value)
                    )
                  }
                  className="w-24 p-2 border rounded"
                  placeholder="Stock"
                />

                <button
                  onClick={() =>
                    saveStock(product.product_id, Number(product.stock))
                  }
                  disabled={loading}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stock;
