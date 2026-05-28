"use client";
import React from "react";
import { useSession } from "next-auth/react";
import SideBar from "../SideBar";
const Marketplace = () => {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen w-full flex">
      <SideBar />
      <div className="w-full h-screen flex justify-center items-center">
        <div className="shadow-lg  p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name:<span className="font-bold">{session?.user?.name}</span>
          </div>
          <div>
            Email:<span className="font-bold">{session?.user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
