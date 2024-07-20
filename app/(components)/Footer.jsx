"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full p-4 bg-[navy] flex justify-between items-center">
      <p className="text-center text-white">
        &copy; Sold.co.zw. All rights reserved.
      </p>
      <span className="text-white w-[20%] flex justify-between items-center">
        <Link href="/" className="hover:underline">Privacy Policy</Link>
        <Link href="/" className="hover:underline">Terms of Service</Link>
      </span>
    </footer>
  );
};

export default Footer;
