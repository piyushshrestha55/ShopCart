"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
const OrderStatus = () => {
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
  //Loading the orders placed by the customers
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/customer/orders");
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

  //Cancelling the orders
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/customer/orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(
          "Failed to update status:",
          errorData.error || res.statusText
        );
        alert(errorData.error || "Failed to update status");
        return;
      }

      const data = await res.json();
      const updatedOrder = data.order; // depending on backend response key

      if (!updatedOrder) {
        console.error("No updated order returned from API");
        return;
      }

      setOrders((prev) =>
        prev.map((o) =>
          o._id === updatedOrder._id ? { ...o, status: updatedOrder.status } : o
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
      alert("Something went wrong while updating the order.");
    }
  };

  return (
    <div className="w-full flex flex-col relative">
      <h2 className="font-bold text-2xl px-4 py-2 bg-blue-600 text-white">
        Manage Orders
      </h2>
      <div className="w-full min-h-screen flex flex-col bg-gray-100 rounded-xl md:mx-2 my-2  gap-5">
        <motion.div
          key={orders.length}
          variants={parentVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 px-3 py-2 md:grid-cols-2 lg:grid-cols-3"
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <motion.div
                key={order._id}
                className="bg-white shadow rounded-lg p-4 flex flex-col gap-3"
                variants={childrenVariants}
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
                  <button
                    onClick={() => updateStatus(order._id, "Cancelled")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Cancel Order
                  </button>
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

export default OrderStatus;
