"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SideBar from "../SideBar";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

// This function is used for tracking the click events in the product cards
const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);
  return ref;
};

const Marketplace = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [current, setCurrent] = useState(null);
  const ref = useOutsideClick(() => setCurrent(null));
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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
      transition: { duration: 0.5 }
    }
  };
  //for loading all the products cards in the database while rendering
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/customer/marketplace", { method: "GET" });
        if (!res.ok) {
          console.log("Error fetching the products");
        }
        const { products } = await res.json();
        setProducts(products);
        console.log("Product Fetched Successfully");
      } catch (err) {
        console.log("Error fetching the products");
      }
    };
    loadProducts();
  }, []);

  // This function handles the order of the customer
  const handleOrder = async (product, location, quantity) => {
    try {
      if (!location) {
        alert("Please enter your delivery address");
        return;
      }
      if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity");
        return;
      }

      const res = await fetch("/api/customer/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product._id,
          location: location,
          quantity: quantity
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setProducts((prev) =>
          prev.map((p) =>
            p._id === product._id ? { ...p, stock: p.stock - quantity } : p
          )
        );
        setLocation("");
        setQuantity(0);
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative items-start">
      {current && (
        <div className="fixed z-10 w-full h-full inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <SideBar />
      <div className="w-full min-h-screen flex flex-col">
        <AnimatePresence>
          {current && (
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{ opacity: 1 }}
              layoutId={`card-${current._id}`}
              ref={ref}
              className="fixed inset-0 z-20 h-[620px] bg-white m-auto w-100 rounded-2xl border border-neutral-200  px-4 py-8   "
            >
              <button
                onClick={() => setCurrent(null)}
                className="absolute top-1 right-1 z-13 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
              {current.product_image && (
                <motion.div
                  layoutId={`image-${current._id}`}
                  className="relative w-full aspect-[4/3]" // consistent aspect ratio
                >
                  <Image
                    src={current.product_image}
                    alt={current.product_name}
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                            33vw"
                    className="object-cover rounded"
                  />
                </motion.div>
              )}
              <div className="flex flex-col bg-gray-50 rounded-lg p-2 gap-1">
                <h2 className="font-semibold text-lg">
                  {current.product_name}
                </h2>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-green-500">${current.price}</p>
                  <p className="text-sm text-gray-700">{current.product_des}</p>
                  <p className="text-sm text-gray-700">
                    Stock:{current.stock > 0 ? current.stock : "Out of stock"}
                  </p>
                </div>
                <p className="flex gap-1 items-center">Place an Order Today</p>
                <input
                  type="text"
                  placeholder="Enter your address to be delivered"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
                <input
                  type="number"
                  min="1"
                  max={current.stock}
                  value={quantity}
                  placeholder="Quantity"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />

                <button
                  disabled={!location || !quantity || quantity <= 0}
                  onClick={() => {
                    handleOrder(current, location, quantity);
                  }}
                  className="bg-green-500 hover:bg-green-700 py-1 px-4 text-white rounded-xl"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <h1 className="font-bold text-2xl w-full bg-blue-600 text-white py-3 px-2">
          Welcome to Marketplace, {session?.user?.name}
        </h1>
        <div className="shadow-lg w-full min-h-screen p-6 mx-1 bg-zinc-300/10 flex flex-col gap-4 ">
          <h2 className="font-bold text-xl">Explore the Market,</h2>
          {products.length > 0 ? (
            <motion.div
              key={products.length}
              variants={parentVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product) => (
                <motion.button
                  key={product._id}
                  layoutId={`card-${product._id}`}
                  variants={childrenVariants}
                  className="bg-white-100 p-4  rounded-lg shadow-lg border border-blue-100 shadow-gray-100 flex flex-col gap-3 cursor-pointer"
                  onClick={() => setCurrent(product)}
                >
                  {product.product_image && (
                    <motion.div
                      layoutId={`image-${product._id}`}
                      className="relative w-full aspect-[4/3]" // instead of h-100
                    >
                      <Image
                        src={product.product_image}
                        alt={product.product_name}
                        loading="eager"
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                        className="object-cover rounded"
                      />
                    </motion.div>
                  )}
                  <div className="flex flex-col items-start bg-gray-50 rounded-lg p-2">
                    <h2 className="font-semibold text-lg">
                      {product.product_name}
                    </h2>
                    <p className="text-green-500">${product.price}</p>
                    <p className="text-sm text-gray-700">
                      {product.product_des}
                    </p>
                    <p className="text-sm text-gray-700">
                      Stock:{" "}
                      {product.stock > 0 ? product.stock : "Out of stock"}
                    </p>
                    <p className="bg-green-400 hover:bg-green-500 text-white py-1 px-4 flex gap-2 rounded-xl">
                      Purchase Now
                      <IconArrowRight />
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="">No product to show...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
