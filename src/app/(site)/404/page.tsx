import { ChevronLeft } from "lucide-react";
import { Nunito_Sans } from "next/font/google";


import Link from "next/link";
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "900"] });

export default function Custom404() {
  return (
    <div
      className={`${nunito.className} flex flex-col w-full h-dvh justify-center items-center`}
    >
      <h1 className="text-white text-[70px] font-black">404</h1>
      <h2 className="text-white text-[20px] mb-20">Page not found</h2>
      <Link className=" flex text-lg items-center justify-center text-[#27DE55]" href="/">
        <ChevronLeft />
        Back to home
      </Link>
    </div>
  );
}
