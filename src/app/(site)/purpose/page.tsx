import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import LOGO from "../../../images/logoFull.svg";

// Styles
import "./purpose.scss";

export const metadata = {
  title: "Journeylog | Purpose",
  description:
    "Here is our mission and what we aim to achieve with Journeylog.",
};

const Purpose = () => {
  return (
    <div className="p-6 flex flex-col w-[100svw] h-[100svh] bg-[#171717]">
      <header className="flex w-[850px] rounded-2xl m-auto justify-between max-w-[90%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-2 md:px-2 mb-10 md:mb-20">
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
        <div className="w-[600px] max-w-[95%] md:text-left md:mt-6 text-[#909090]">
          <h1 className="md:text-[65px] text-center text-[40px] leading-[40px] font-bold mb-10 md:mb-24 text-[white]">
            Our purpose
          </h1>
          <p className="text-[18px] md:text-[24px]  md:leading-[40px] mb-7">
            Journeylog is a steady ally for building better habits and making
            consistent choices. We believe that the real power
            comes from you showing up for yourself every single day.
          </p>
          <br />
          <p className="text-[18px] md:text-[24px] md:leading-[40px] mb-7">
            Self-control isn’t just something you’re born with,
            it’s shaped by your environment too. By making small tweaks, like
            setting up a routine or tracking progress, you create a space where
            healthy choices come naturally, breaking out of autopilot and
            overcoming the inertia of sticking to what’s comfortable.
          </p>
          <br />
          <p className="text-[18px] md:text-[24px] md:leading-[40px] mb-12">
            Think about this: Going for a quick walk after lunch can lead to
            better energy levels, which makes it easier to focus in the
            afternoon. Or cooking a healthy meal one night might inspire you to
            plan your meals for the week. Small actions like these don’t just
            make you feel good in the moment. They spark a domino effect of
            healthier, happier choices.{" "}
            <strong className="text-[#fff] font-normal underline">
              Journeylog try to help you keep track of these wins so you can
              build on them day after day. We strongly believe in consistency
              instead streak.
            </strong>
          </p>
          <br />

          <p className="text-[18px] md:text-[24px] md:leading-[40px] mb-12">
            We are here to remind you that meaningful change comes from
            the small, intentional steps you take every day. Growth isn’t about
            perfection. It’s about progress, and that starts with you deciding
            to take consistent action.
          </p>
          <br />

          <p className="text-[16px] md:text-[20px] md:leading-[40px] mb-6">
            We have built Journeylog based on these references:
          </p>

          <ul className="text-[16px] break-words md:text-[20px] md:leading-[35px] mb-12 list-decimal text-left pl-5 md:pl-8 text-[#909090]">
            <li className="mb-8">
              Genetic and Environmental Influences on Self-Control: Assessing
              Self-Control with the ASEBA Self-Control Scale
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5846837/"
              >
                https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5846837/
              </a>
            </li>
            <li className="mb-8">
              Overcoming status quo bias in the human brain <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.pnas.org/doi/10.1073/pnas.0910380107"
              >
                https://www.pnas.org/doi/10.1073/pnas.0910380107
              </a>
            </li>
            <li className="mb-8">
              Do Defaults Save Lives?
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.science.org/doi/abs/10.1126/science.1091721"
              >
                https://www.science.org/doi/abs/10.1126/science.1091721
              </a>
            </li>
            <li className="mb-8">
              The meaning of default options for potential organ donors
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3458339/"
              >
                https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3458339/
              </a>
            </li>
            <li className="mb-8">
              Heads or Tails: The Impact of a Coin Toss on Major Life Decisions
              and Subsequent Happiness
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://academic.oup.com/restud/article-abstract/88/1/378/5834495?redirectedFrom=fulltext&login=false"
              >
                https://academic.oup.com/restud/article-abstract/88/1/378/5834495?redirectedFrom=fulltext&login=false
              </a>
            </li>
            <li className="mb-8">
              Assessing Global Organ Donation Policies: Opt-In vs Opt-Out
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8128443/"
              >
                https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8128443/
              </a>
            </li>
            <li className="mb-8">
              This feels like the right choice: how decision aids may facilitate
              affect-based valuation
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://www.tandfonline.com/doi/full/10.1080/02699931.2022.2084041"
              >
                https://www.tandfonline.com/doi/full/10.1080/02699931.2022.2084041
              </a>
            </li>
            <li className="mb-8">
              A million reasons or just one? How coin flips impact the number of
              relevant reasons for decisions
              <br />
              <a
                className="font-normal underline text-[#39D353]"
                href="https://onlinelibrary.wiley.com/doi/full/10.1002/ejsp.2941"
              >
                https://onlinelibrary.wiley.com/doi/full/10.1002/ejsp.2941
              </a>
            </li>
          </ul>
          <br />
          <div className="flex justify-center items-center">
            <Link
              className={`font-black inline-flex rounded-3xl justify-center bg-[#ffffff] text-black py-5 px-8`}
              href="/sign-in"
            >
              Try free
              {/* /sign-in */}
              <ChevronRight className="mr-[-8px]" />
            </Link>
          </div>

          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
