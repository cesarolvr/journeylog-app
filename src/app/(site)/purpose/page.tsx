"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import LOGO from "../../../images/logo.svg";

// Styles
import "./purpose.scss";

import { Reenie_Beanie } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

const Purpose = () => {
  return (
    <div className="p-6 flex justify-center items-start w-[100svw] h-[100svh] bg-[#171717]">
      <Link className="fixed top-[30px] left-[20px] flex" href="/">
        <ChevronLeft />
        Back to home
      </Link>
      <div className="w-full max-w-[100%] flex-col auth flex items-center justify-center">
        <p
          className={`text-white ${reenie.className} text-[50px] mt-24 mb-8 flex`}
        >
          Journeylog
          <Image src={LOGO} alt="" className="mt-[-25px] w-[40px] ml-3" />
        </p>
        <div className="w-[600px] max-w-[95%] text-center mt-5 md:mt-0">
          <h1 className="md:text-[65px] text-[40px] leading-[40px] font-bold mb-5 md:mb-10 text-[white]">
            Our purpose
          </h1>
          <p className="text-[16px] md:text-[24px] leading-[25px] md:leading-[35px] mb-7 text-[#909090]">
            "I was having a lot of difficulty maintaining consistency at the
            gym. I started logging the times I went, and the frequency view in
            Journeylog became a motivator. Amazing app!" "I was having a lot of
            difficulty maintaining consistency at the gym. I started logging the
            times I went, and the frequency view in Journeylog became a
            motivator Amazing app!"
          </p>
          <p className="text-[16px] md:text-[24px] leading-[25px] md:leading-[35px] mb-7 text-[#909090]">
            {" "}
            Amazing app!""I was having a lot of difficulty maintaining
            consistency at the gym. I started logging the times I went, and the
            frequency view in Journeylog became a motivator. Amazing app!""I was
            having a lot of difficulty maintaining consistency at the gym. I
            started logging the times I went, and the frequency view in
            Journeylog became a motivator. Amazing app!"
          </p>
          <p className="text-[16px] md:text-[24px] leading-[25px] md:leading-[35px] mb-12 text-[#909090]">
            I was having a lot of difficulty maintaining consistency at the gym.
            I started logging the times I went, and the frequency view in
            Journeylog became a motivator.
          </p>
          <Link className="flex mb-28 text-center w-full items-center justify-center text-[#b7b7b7]" href="/">
            <ChevronLeft />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Purpose;
