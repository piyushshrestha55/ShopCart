"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const OrdersPreview = ({ orders = [] }) => {
  const [lastOrders, setLastOrders] = useState([]);
  useEffect(() => {
    if (!orders.length) return;

    // Sort by createdAt descending (latest first)
    const sorted = [...orders].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setLastOrders(sorted.slice(0, 5)); // take the latest 5
  }, [orders]);

  return (
    <div className="bg-white shadow rounded p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
      <table className="min-w-full border border-gray-300 px-2">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Product</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {lastOrders.map((o) => (
            <tr key={o._id}>
              <td className="border border-gray-300 px-4 py-2">
                {o.customer_id?.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {o.product_id?.product_name}
              </td>
              <td className="border border-gray-300 px-4 py-2">${o.total}</td>
              <td className="border border-gray-300 px-4 py-2">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        href="/orders"
        className="mt-4 inline-block text-blue-500 underline"
      >
        View All Orders
      </Link>
    </div>
  );
};

export default OrdersPreview;
