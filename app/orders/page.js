import SideBar from "@/components/SideBar";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import OrderPlaced from "@/components/Vendor/OrderPlaced";
import { redirect } from "next/navigation";
import OrderStatus from "@/components/Customer/OrderStatus";
const Order = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row items-start relative">
      <SideBar />
      {session.user.role === "Vendor" ? <OrderPlaced /> : <OrderStatus />}
    </div>
  );
};

export default Order;
