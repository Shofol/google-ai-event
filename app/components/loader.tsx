import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="flex min-h-40 w-full items-center justify-center">
      <p className="mr-1 text-2xl">Loading</p>
      <Image src="/loader.svg" width={50} height={50} alt="loader" />
    </div>
  );
};

export default Loader;
