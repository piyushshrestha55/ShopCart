"use client";
import React from "react";
import { useSession } from "next-auth/react";

const User_Profile = () => {
  const { data: session } = useSession();

  if (!session) return <div>Please log in</div>;

  return (
    <div className="w-full md:flex-1 md:min-w-0 min-h-screen flex flex-col overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4 w-ful py-2 px-3w-full md:flex-1 md:min-w-0 min-h-screen flex flex-col overflow-x-hidden bg-blue-600 text-white">
        Profile
      </h1>
      <div className="bg-white rounded-lg shadow mx-2 p-4">
        <p className="text-lg">
          <strong>Name:</strong> {session.user?.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {session.user?.email}
        </p>
        <p className="text-lg">
          <strong>Role:</strong> {session.user?.role}
        </p>
      </div>
    </div>
  );
};

export default User_Profile;
