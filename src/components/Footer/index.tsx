"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-center w-full flex flex-col justify-center items-center px-4 text-[#595959]">
      <ul className="w-full text-center mb-5 text-[18px] justify-center flex-col">
        <li className="mx-3 text-center my-2">
          <Link
            target="_blank"
            className="hover:underline"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </li>
        <li className="mx-3 text-center  my-2">
          <Link
            target="_blank"
            className="hover:underline"
            href="/terms-of-use"
          >
            Terms of use
          </Link>
        </li>
      </ul>
      <p className="mb-24 text-[18px]">
        © Journeylog {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
