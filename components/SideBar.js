"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBuildingStore,
  IconDashboard,
  IconListDetailsFilled,
  IconShoppingBag,
  IconShoppingCartPlus,
  IconUser,
  IconMenu,
  IconX
} from "@tabler/icons-react";
const SideBar = () => {
  const { data: session } = useSession();
  const isVendor = session?.user?.role === "Vendor";
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerVariant = {
    open: {
      width: "14rem"
    },
    closed: {
      width: "4rem"
    }
  };
  const childrenVariant = {
    open: {
      opacity: 1,
      y: 0
    },
    closed: {
      opacity: 0,
      y: -10
    }
  };
  const parentVariant = {
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.03
      }
    },
    closed: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0
      }
    }
  };
  const buttonVariant = {
    open: {
      opacity: 1,
      transition: {
        ease: "easeIn"
      }
    },
    closed: {
      opacity: 0,
      transition: {
        ease: "easeIn"
      }
    }
  };
  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden flex items-center px-3 py-2">
        <button
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
          className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <IconMenu />
        </button>
        <Link href="/" className="ml-3 font-bold text-lg">
          Shop<span className="text-blue-500">Cart</span>
        </Link>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative bg-white w-64 h-full shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <Link href="/" className="font-bold text-lg">
                Shop<span className="text-blue-500">Cart</span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <IconX />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
              {!isVendor ? (
                <li>
                  <Link href="/dashboard" className="flex gap-2 items-center">
                    <IconBuildingStore />
                    <span className="text-neutral-600">Marketplace</span>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link href="/dashboard" className="flex gap-2 items-center">
                    <IconDashboard />
                    <span className="text-neutral-600">Dashboard</span>
                  </Link>
                </li>
              )}
              {isVendor && (
                <li>
                  <Link href="/products" className="flex gap-2 items-center">
                    <IconListDetailsFilled />
                    <span className="text-neutral-600">Products</span>
                  </Link>
                </li>
              )}
              {isVendor && (
                <li>
                  <Link href="/inventory" className="flex gap-2 items-center">
                    <IconShoppingCartPlus />
                    <span className="text-neutral-600">Inventory</span>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/orders" className="flex gap-2 items-center">
                  <IconShoppingBag />
                  <span className="text-neutral-600">Orders</span>
                </Link>
              </li>
              <li>
                <Link href="/profile" className="flex gap-2 items-center">
                  <IconUser />
                  <span className="text-neutral-600">Profile</span>
                </Link>
              </li>
            </ul>
            <div className="mt-auto pt-6">
              <button
                onClick={() => signOut()}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold"
              >
                Sign Out
              </button>
            </div>
          </motion.aside>
        </div>
      )}

      {/* Desktop / tablet sidebar */}
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={containerVariant}
        className="hidden md:flex h-screen flex-col shadow-lg px-4 py-3 gap-8 sticky top-0 flex-shrink-0"
      >
        <div className="flex justify-between items-center gap-2 ">
          {isOpen && (
            <Link href={"/"} className="font-bold cursor-pointer text-lg">
              Shop<span className="text-blue-500 ">Cart</span>
            </Link>
          )}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="w-8  h-8 rounded-full shadow-lg shadow-gray-300 hover:bg-gray-300"
          >
            {isOpen ? <IconArrowLeft /> : <IconArrowRight />}
          </button>
        </div>
        <motion.ul
          variants={parentVariant}
          className="flex flex-col cursor-pointer gap-6"
        >
          {!isVendor ? (
            <motion.li variants={childrenVariant}>
              <Link href={"/dashboard"} className="flex gap-1 items-center ">
                <IconBuildingStore />
                {isOpen && (
                  <span className="text-neutral-600">Marketplace</span>
                )}
              </Link>
            </motion.li>
          ) : (
            <motion.li variants={childrenVariant}>
              <Link href={"/dashboard"} className="flex gap-1 items-center ">
                <IconDashboard />
                {isOpen && <span className="text-neutral-600">Dashboard</span>}
              </Link>
            </motion.li>
          )}
          {isVendor && (
            <motion.li variants={childrenVariant}>
              <Link href={"/products"} className="flex gap-1 items-center ">
                <IconListDetailsFilled />
                {isOpen && <span className="text-neutral-600">Products</span>}
              </Link>
            </motion.li>
          )}
          {isVendor && (
            <motion.li variants={childrenVariant}>
              <Link href={"/inventory"} className="flex gap-1 items-center ">
                <IconShoppingCartPlus />
                {isOpen && <span className="text-neutral-600">Inventory</span>}
              </Link>
            </motion.li>
          )}
          <motion.li variants={childrenVariant}>
            <Link href={"/orders"} className="flex gap-1 items-center ">
              <IconShoppingBag />
              {isOpen && <span className="text-neutral-600">Orders</span>}
            </Link>
          </motion.li>
          <motion.li variants={childrenVariant}>
            <Link href={"/profile"} className="flex gap-1 items-center ">
              <IconUser />
              {isOpen && <span className="text-neutral-600">Profile</span>}
            </Link>
          </motion.li>
        </motion.ul>
        <div className="mt-auto">
          {isOpen && (
            <motion.button
              variants={buttonVariant}
              initial={{
                scale: 0.97
              }}
              whileHover={{ scale: 1 }}
              onClick={() => {
                signOut();
              }}
              className="bg-linear-to-r from-blue-400 via-violet-600 to-violet-700 py-2 px-4 w-full  rounded-lg text-white font-semibold"
            >
              Sign Out
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SideBar;
