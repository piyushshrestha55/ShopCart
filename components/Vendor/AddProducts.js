"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const AddProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
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

  //fetching the products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/vendor/product", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData
    });

    const data = await res.json();
    setFormData((prev) => ({ ...prev, image: data.url })); // keep other fields intact
    setImagePreview(data.url);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.image) {
      setLoading(true);
      try {
        const res = await fetch("/api/vendor/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_name: formData.name,
            price: parseFloat(formData.price),
            product_des: formData.description,
            product_image: formData.image
          })
        });

        if (!res.ok) {
          throw new Error("Failed to save product");
        }

        const savedProduct = await res.json();

        setProducts([...products, savedProduct]);
        // Reset form
        setFormData({ name: "", price: "", description: "", image: "" });
        const form = e.target;
        form.reset();
        setImagePreview(null);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill in all fields including image");
    }
  };

  return (
    <div className="w-full min-h-screen ">
      <h1 className="text-2xl text-white font-bold mb-6 bg-blue-600 px-3 py-2">
        Manage Products
      </h1>
      <div className="bg-gray-100 mx-4 p-4 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border rounded"
          />

          {/* Image Upload Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full mb-2 p-2 border rounded"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded mb-2"
              />
            )}
          </div>

          <button
            value={"Submit"}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>

      <motion.div initial="hidden" animate="show" className="mx-4 p-4">
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>
        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          <motion.div
            key={products.length}
            variants={parentVariants}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <motion.div
                variants={childrenVariants}
                key={product._id}
                className="bg-white flex flex-col gap-4 min-h-40 p-4 border rounded shadow "
              >
                {product.product_image && (
                  <div className="relative w-full aspect-[4/3] sm:aspect-[3/2]">
                    <Image
                      src={product.product_image}
                      alt={product.product_name}
                      loading="eager"
                      fill
                      sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           33vw"
                      className="object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-start">
                  <h3 className="font-semibold">{product.product_name}</h3>
                  <p className="text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-700">{product.product_des}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AddProducts;
