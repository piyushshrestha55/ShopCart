"use client";
import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import StatsCards from "./Dashboard/StatsCard";
import RevenueChart from "./Dashboard/RevenueChart";
import TopProducts from "./Dashboard/TopProducts";
import OrdersPreview from "./Dashboard/OrdersPreview";

const AdminDashboard = ({ name }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await fetch("/api/vendor/product");
      const productsData = prodRes.ok ? await prodRes.json() : [];
      setProducts(productsData);

      const orderRes = await fetch("/api/vendor/orders");
      const { orders: ordersData } = orderRes.ok
        ? await orderRes.json()
        : { orders: [] };
      setOrders(ordersData);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-start relative">
      <SideBar />
      <div className="w-full md:flex-1 md:min-w-0 min-h-screen flex flex-col overflow-x-hidden">
        <h1 className="bg-blue-500 text-2xl font-bold px-4 py-2 text-white">
          Welcome to Dashboard, {name}
        </h1>

        <StatsCards className="w-full" products={products} orders={orders} />
        <RevenueChart className="w-full" orders={orders} />
        <TopProducts className="w-full" orders={orders} />
        <OrdersPreview orders={orders} />
      </div>
    </div>
  );
};

export default AdminDashboard;
