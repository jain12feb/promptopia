"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname } from "next/navigation";

function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
      {children}
      <span className="lg:w-20 sm:w-10 absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}

const Nav = () => {
  const { data: session } = useSession();
  const [showPrompt, setShowPrompt] = useState(true);

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/create-prompt") {
      setShowPrompt(false);
    } else {
      setShowPrompt(true);
    }
  }, [pathname]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
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

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {showPrompt && (
              <Link
                href="/create-prompt"
                className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
              >
                Create Post
              </Link>
            )}

            <button
              type="button"
              onClick={signOut}
              className="rounded-full border border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
            >
              Sign Out
            </button>
            <Tooltip message={session?.user.name}>
              <Link href={"/profile"}>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile"
                />
              </Link>
            </Tooltip>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="rounded-full py-1.5 px-5 text-black border border-black text-center text-sm font-inter flex items-center justify-center"
                >
                  <img
                    loading="lazy"
                    height="24"
                    width="24"
                    className="mr-2"
                    id="provider-logo"
                    src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                  />
                  Sign in with {provider.name}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Tooltip message={session?.user.name}>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
            </Tooltip>

            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href="/profile"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="rounded-full border border-black py-1.5 px-5 text-black  text-center text-sm font-inter flex items-center justify-center"
                >
                  Sign in with{" "}
                  <img
                    loading="lazy"
                    height="24"
                    width="24"
                    className="ml-2"
                    id="provider-logo"
                    src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                  />
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;
