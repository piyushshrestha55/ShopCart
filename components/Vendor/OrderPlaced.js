"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

const OrderPlaced = () => {
  const [orders, setOrders] = useState([]);
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    }
  };
  const childrenVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  //Loading the orders placed by the customers to the vendor
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/vendor/orders");
        if (!response.ok) {
          console.error("Error fetching orders:", response.error);
          return;
        }
        const { orders } = await response.json();
        setOrders(orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    loadOrders();
  }, []);

  //updating the status of their ordered products
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/vendor/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        alert("Failed to update status");
        return;
      }
      const { order } = await res.json();
      setOrders((prev) =>
        prev.map((o) =>
          o._id === order._id ? { ...o, status: order.status } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="w-full flex flex-col  relative">
      <h2 className="font-bold text-2xl px-4 py-2  bg-blue-600 text-white">
        Manage Orders
      </h2>
      <div className="w-full min-h-screen flex flex-col bg-gray-100 rounded-xl mx-1 my-2 px-2 py-2 gap-4">
        <motion.div
          key={orders.length}
          variants={parentVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div
                key={order._id}
                variants={childrenVariants}
                className="bg-white shadow rounded-lg p-4 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  {order.product_id?.product_image && (
                    <div className="relative w-20 h-20">
                      <Image
                        src={order.product_id.product_image}
                        alt={order.product_id.product_name}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                         33vw"
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {order.product_id?.product_name}
                    </h3>
                    <p className="text-green-600">${order.product_id?.price}</p>
                    <p className="text-sm text-gray-600">
                      Customer: {order.customer_id?.name} (
                      {order.customer_id?.email})
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Quantity: {order.quantity} | Location: {order.location}
                </p>
                {/* Showing the current status of the order */}
                <p className="text-sm">
                  Current Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      order.status === "Pending"
                        ? "bg-yellow-500"
                        : order.status === "Confirmed"
                          ? "bg-purple-500"
                          : order.status === "Shipped"
                            ? "bg-blue-500"
                            : order.status === "Delivered"
                              ? "bg-green-600"
                              : "bg-red-600" // Cancelled
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <div className="mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm w-full md:w-auto"
                  >
                    {[
                      "Pending",
                      "Confirmed",
                      "Shipped",
                      "Delivered",
                      "Cancelled"
                    ].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600">No orders to show...</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPlaced;
