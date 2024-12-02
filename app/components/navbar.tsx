import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="mx-auto flex max-w-[80vw] items-center justify-between pt-10">
      <p className="font-poppins text-4xl font-extrabold">
        N<span className="-ml-3">B</span>
      </p>
      <Link
        href={"https://github.com/Shofol/google-ai-event"}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:opacity-80"
      >
        <Image
          src={"/icons/github.svg"}
          width={35}
          height={20}
          alt="github link"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
