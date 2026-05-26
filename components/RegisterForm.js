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
  const router = useRouter();
  const validate = () => {
    if (name.length < 3) return "Name must be at least 2 characters";
    if (!email.endsWith(".com")) return "Email must end with .com";
    if (password.length < 8) return "Password must be at least 8 characters";
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !email) {
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
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        const data = await response.json();
        const form = e.target;
        setName("");
        setEmail("");
        setPassword("");
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
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-100 p-8 bg-white rounded-lg shadow-lg border-blue-500 border-t-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register to Shop<span className="text-blue-500">Cart</span>
        </h2>
        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Register</button>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
          <GitHub />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
