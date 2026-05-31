"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandGoogleAnalytics,
  IconBuildingStore,
  IconDashboard,
  IconListDetailsFilled,
  IconSettings,
  IconShoppingBag,
  IconShoppingCart,
  IconShoppingCartPlus,
  IconUser
} from "@tabler/icons-react";
const SideBar = () => {
  const { data: session } = useSession();
  const isVendor = session?.user?.role === "Vendor";
  const [isOpen, setIsOpen] = useState(true);
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
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={containerVariant}
      className={`h-screen flex flex-col shadow-lg shadow-neutral-300  px-4 py-3 gap-8 sticky top-0 `}
    >
      <div className="flex justify-between items-center ">
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
              {isOpen && <span className="text-neutral-600">Marketplace</span>}
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
            <Link href={"/analytics"} className="flex gap-1 items-center ">
              <IconBrandGoogleAnalytics />
              {isOpen && <span className="text-neutral-600">Analytics</span>}
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
        <motion.li variants={childrenVariant}>
          <Link href={"settings"} className="flex gap-1 items-center ">
            <IconSettings />
            {isOpen && <span className="text-neutral-600">Settings</span>}
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
  );
};

export default SideBar;
