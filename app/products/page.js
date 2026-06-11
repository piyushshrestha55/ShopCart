import SideBar from "@/components/SideBar";
import AddProducts from "@/components/Vendor/AddProducts";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  if (session.user.role !== "Vendor") {
    redirect("/"); // block non-vendors
  }
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start relative">
      <SideBar />
      <AddProducts />
    </div>
  );
};

export default page;
