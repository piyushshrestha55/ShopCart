import SideBar from "@/components/SideBar";
import User_Profile from "@/components/User_Profile";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  return (
    <div className="w-screen min-h-screen flex">
      <SideBar />
      <User_Profile />
    </div>
  );
};

export default profile;
