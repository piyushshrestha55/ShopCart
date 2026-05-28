import React from "react";
import Link from "next/link";
import Image from "next/image";
const GitHub = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h2 className="text-lg font-semibold text-gray-700">Or</h2>
      <Link
        href="/login/github"
        className="bg-violet-100 shadow-lg text-black border-blue-300  border px-4 py-2 rounded-lg hover:bg-violet-200 font-semibold transition w-full flex items-center justify-center"
      >
        <Image
          src="/github-icon.webp"
          alt="GitHub"
          width={23}
          height={23}
          loading="eager"
          className="mr-2"
        />
        <span>Login with GitHub</span>
      </Link>
    </div>
  );
};

export default GitHub;
