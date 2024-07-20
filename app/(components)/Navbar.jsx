"use client";
import Link from "next/link";
import { faChevronDown, faCircleUser, faBarsStaggered, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Navbar = () => {
  const [openAuthOptions, setOpenAuthOptions] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className={`flex flex-col md:flex-row justify-between items-center gap-[4rem] md:gap-0 bg-white py-4 px-[4rem] w-full relative ${openMenu ? "h-[100vh]" : ""}`}>
      <Link href="/" className={`md:block text-2xl ${openMenu ? "block" : "hidden"}`}>
        LOGO
      </Link>
      <div className={`md:flex flex-col md:flex-row justify-center items-center gap-[2rem] text-[#444] ${openMenu ? "flex" : "hidden"}`}>
        <Link href="/properties/listings" className="hover:underline">
          For Sale <FontAwesomeIcon icon={faChevronDown} />
        </Link>
        <Link href="/properties/listings" className="hover:underline">
          To Rent <FontAwesomeIcon icon={faChevronDown} />
        </Link>
        <Link href="/" className="hover:underline">
          New Developments
        </Link>
        <Link href="/" className="hover:underline">
          Showdays
        </Link>
        <Link href="/" className="hover:underline">
          Agencies
        </Link>
        <Link href="/" className="hover:underline">
          Blog
        </Link>
      </div>
      <button onClick={() => setOpenAuthOptions(!openAuthOptions)} className={`md:block border border-[navy] rounded-3xl py-[0.5rem] px-[2rem] ${openMenu ? "block" : "hidden"}`}>
        Login <FontAwesomeIcon icon={faCircleUser} className="text-[navy]" />
      </button>
      {openAuthOptions && (
        <div className={`bg-page text-white absolute translate-y-[70%] transition-all w-[30vh] rounded-md right-0 flex flex-col items-start p-[1rem] gap-[2rem] ${openMenu ? "hidden" : "block"}`}>
          <Link href="/">Signup</Link>
          <Link href="/">Login</Link>
        </div>
      )}
      <button className={`absolute top-0 right-2 text-[navy] text-2xl ${openMenu ? "hidden" : "block"} md:hidden`} onClick={() => setOpenMenu(!openMenu)}><FontAwesomeIcon icon={faBarsStaggered}/></button>
      <button className={`absolute top-0 right-2 text-[navy] text-2xl ${!openMenu ? "hidden" : "block"} md:hidden`} onClick={() => setOpenMenu(!openMenu)}><FontAwesomeIcon icon={faTimes}/></button>
    </nav>
  );
};

export default Navbar;
