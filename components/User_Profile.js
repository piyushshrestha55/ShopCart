"use client";
import React from "react";
import { useSession } from "next-auth/react";

const User_Profile = () => {
  const { data: session } = useSession();

  if (!session) return <div>Please log in</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
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
