import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-200 w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/" className="flex justify-center items-center gap-2">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="max-sm:hidden font-satoshi font-semibold text-lg text-black tracking-wide">
              Promptopia
            </p>
          </Link>

          <p className="mt-4 text-center text-sm text-black lg:mt-0 lg:text-right">
            Copyright &copy; 2023. All rights reserved.
            <br />
            Designed and Developed with ❤️ by Prince Jain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
