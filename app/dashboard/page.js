"use client";
import Marketplace from "@/components/Customer/Marketplace";
import React from "react";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/Vendor/AdminDashboard";
import LoadingDots from "@/components/LoadingDots";
const dashboard = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex  justify-center items-center">
        <div className="shadow-lg flex gap-2 items-center shadow-gray-300 p-10 rounded-2xl">
          <p className="font-semibold text-2xl">Loading</p>
          <LoadingDots />
        </div>
      </div>
    );
  }

  if (session?.user?.role === "Vendor") {
    return <AdminDashboard />;
  }

  return <Marketplace />;
};

export default dashboard;
