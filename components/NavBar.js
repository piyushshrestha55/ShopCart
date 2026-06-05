import React from "react";
import Link from "next/link";
const NavBar = () => {
  return (
    <nav className="shadow-lg sticky top-0 z-10 bg-white  flex justify-between py-4 px-8 ">
      <Link href={"/"} className="font-bold cursor-pointer">
        Shop<span className="text-blue-500 ">Cart</span>
      </Link>
      <div className="flex space-x-4">
        <Link
          href="/register"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded-xl"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-xl"
        >
          Log in
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
