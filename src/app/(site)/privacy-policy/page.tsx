"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import LOGO from "../../../images/logoFull.svg";

// Styles
import "./privacy-policy.scss";

import { Reenie_Beanie } from "next/font/google";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

const Purpose = () => {
  const router = useRouter();
  return (
    <div className="p-6 flex flex-col w-[100svw] h-[100svh] bg-[#171717]">
      <header className="flex w-[850px] rounded-2xl m-auto justify-between max-w-[90%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-2 md:px-2 mb-20">
        <Image
          src={LOGO}
          width={150}
          alt="Logo"
          className="md:ml-4 ml-2 w-[130px] md:w-[150px]"
        />
        <ul className="flex">
          <li className="md:flex items-center mx-3 hidden">
            <Link className="flex" href="/">
              <ChevronLeft />
              Back to home
            </Link>
          </li>
        </ul>
      </header>
      <div className="w-full max-w-[100%] flex-col auth flex items-center justify-center">
        {/* <p
          className={`text-white ${reenie.className} text-[50px] mt-24 mb-8 flex`}
        >
          Journeylog
          <Image src={LOGO} alt="" className="mt-[-25px] w-[40px] ml-3" />
        </p> */}
        <div className="w-[600px] max-w-[95%] text-center mt-5 md:mt-0">
          <h1 className="md:text-[65px] text-[30px] leading-[40px] font-bold mb-5 md:mb-10 text-[white]">
            Privacy Policy
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
          <br />
          <br />
          <br />
          <Footer />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
