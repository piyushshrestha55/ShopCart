import SideBar from "@/components/SideBar";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
const Order = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-screen min-h-screen flex">
      <SideBar />
      {session?.user?.role === "Vendor" ? (
        <div>Vendor</div>
      ) : (
        <div>Customer</div>
      )}
    </div>
  );
};

export default Order;
