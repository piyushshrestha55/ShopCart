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
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-100 p-8 bg-white rounded-lg shadow-lg border-blue-500 border-t-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Shop<span className="text-blue-500">Cart</span>
        </h2>
        <form
          onSubmit={() => handleSubmit(e)}
          className="flex flex-col space-y-2"
        >
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-600">{error}</div>}
          <button type="submit">Log In</button>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 hover:underline "
            >
              Register
            </Link>
          </p>
          <GitHub />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
