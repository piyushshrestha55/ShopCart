"use client";
import React, { useState } from "react";
import Link from "next/link";
import GitHub from "./GitHub";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false
      });
      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-gray-50">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-lg border-t-4 border-blue-500">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Login to Shop<span className="text-blue-500">Cart</span>
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {error && <div className="text-red-600">{error}</div>}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              Log In
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
