"use client";
import React, { useEffect, useState } from "react";

const TopProducts = ({ orders = [] }) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (!orders.length) return;

    // Counts the  sales per product
    const salesMap = {};
    orders
      .filter((o) => o.status !== "Cancelled")
      .forEach((o) => {
        const id = o.product_id._id;
        if (!salesMap[id]) {
          salesMap[id] = { ...o.product_id, sales: 0 };
        }
        salesMap[id].sales += o.quantity;
      });

    // Sort by sales
    const sorted = Object.values(salesMap).sort((a, b) => b.sales - a.sales);
    setTopProducts(sorted.slice(0, 5)); // top 5
  }, [orders]);

  return (
    <div className=" bg-neutral-100 shadow rounded p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>
      <ul>
        {topProducts.map((p) => (
          <li key={p._id} className="flex items-center gap-4 mb-2">
            <img
              src={p.product_image}
              alt={p.product_name}
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <span className="font-semibold">{p.product_name}</span>
              <p className="text-sm text-gray-500">Sales: {p.sales}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
