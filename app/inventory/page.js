import SideBar from "@/components/SideBar";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Stock from "@/components/Vendor/Stock";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  if (session.user.role !== "Vendor") {
    redirect("/"); // block non-vendors
  }
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start relative">
      <SideBar />
      <Stock />
    </div>
  );
};

export default page;
