"use client";
import React, { useState } from "react";
import Link from "next/link";
import GitHub from "./GitHub";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  const router = useRouter();
  const validate = () => {
    if (name.length < 3) return "Name must be at least 2 characters";
    if (!email.endsWith(".com")) return "Email must end with .com";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!role) return "Please select an account type";

    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !email || !role) {
      setError("All fields are required");
      return;
    }
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await fetch("/api/userexists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const { user } = await res.json();
      if (user) {
        setError("User already Exists!");
        return;
      }
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      if (response.ok) {
        const data = await response.json();
        const form = e.target;
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setError("");
        form.reset();
        console.log("Registration Successful!", data.message);
        router.push("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error occurred during registration");
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-blue-500">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Register to Shop<span className="text-blue-500">Cart</span>
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Select Account Type</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Register
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
