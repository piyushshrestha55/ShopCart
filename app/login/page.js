import LoginForm from "@/components/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return <LoginForm />;
};

export default Login;
