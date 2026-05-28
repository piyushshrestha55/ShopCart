"use client";
import Marketplace from "@/components/Customer/Marketplace";
import React from "react";
import { useSession } from "next-auth/react";
import AdminDashboard from "@/components/Vendor/AdminDashboard";

const dashboard = () => {
  const { data: session } = useSession();
  return (
    <>
      {session?.user?.role === "Vendor" ? <AdminDashboard /> : <Marketplace />}
    </>
  );
};

export default dashboard;
