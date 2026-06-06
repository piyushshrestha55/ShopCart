"use client";
import React from "react";
// []  is so that if parent doesn't pass props the props will be an empty array
const StatsCards = ({ products = [], orders = [] }) => {
  // Separate cancelled vs active
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled");
  const activeOrders = orders.filter((o) => o.status !== "Cancelled");

  // Compute totals
  const revenue = activeOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="grid grid-cols-4 gap-3 mt-6 p-6">
      <div className="border border-blue-100 bg-white shadow p-4 rounded flex flex-col gap-2">
        <span className="text-xl font-semibold">Total Products</span>
        <span>{products.length}</span>
      </div>
      <div className="border border-blue-100 bg-white shadow p-4 rounded flex flex-col gap-2">
        <span className="text-xl font-semibold">Active Orders</span>
        <span>{activeOrders.length}</span>
      </div>
      <div className="border border-blue-100 bg-white shadow p-4 rounded flex flex-col gap-2">
        <span className="text-xl font-semibold">Cancelled Orders</span>
        <span>{cancelledOrders.length}</span>
      </div>
      <div className="border border-blue-100 bg-white shadow p-4 rounded flex flex-col gap-2">
        <span className="text-xl font-semibold">Revenue</span>
        <span>${revenue}</span>
      </div>
    </div>
  );
};

export default StatsCards;
