"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../images/logoFull.svg";
import PlaceholderImage from "../../images/placeholder.png";
import PlaceholderImageLandscape from "../../images/placeholderLandscape.png";
import { Accordion, AccordionItem, Button, Textarea } from "@nextui-org/react";
import { ChevronsDown } from "lucide-react";

const Landing = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="dark text-foreground landing w-[100vw] overflow-hidden">
      <header className="flex w-[800px] rounded-3xl m-auto justify-between max-w-full mt-8 bg-[#1E1E1E] py-3 px-1">
        <Image src={Logo} width={150} alt="Logo" className="ml-4" />
        <ul className="flex">
          <li className="flex items-center mx-3">
            <Link href="">What is it?</Link>
          </li>
          <li className="flex items-center mx-3">
            <Link href="">Why use it?</Link>
          </li>
          <li className="flex items-center mx-3">
            <Link href="">FAQ</Link>
          </li>
          <li className="flex items-center mx-3">
            <Button
              className={`bg-[#39D353] font-black`}
              variant="solid"
              onClick={(f) => f}
            >
              Try free
            </Button>
          </li>
        </ul>
      </header>
      <main>
        <section
          id="hero"
          className="h-[70vh] justify-center px-2 text-center flex flex-col items-center"
        >
          <h1 className="text-[65px] font-black text-white mt-[130px]">
            Build good habits as a diary
          </h1>
          <h2 className="text-[25px] text-white mb-[150px]">
            Consistently instead streak.
          </h2>
          <ChevronsDown />
        </section>
        <section
          id="log"
          className="justify-center items-center my-20 inline-flex w-full"
        >
          <h3 className="text-[30px] w-[250px] mx-8">
            Log your activities through simple notes
          </h3>
          <Image
            src={PlaceholderImage}
            className="mx-8"
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="check"
          className="flex-row-reverse justify-center items-center my-20 inline-flex w-full"
        >
          <h3 className="text-[30px] w-[250px] mx-8">
            Or even through to-do and check lists
          </h3>
          <Image
            className="mx-8"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="moving"
          className="justify-center items-center inline-flex w-full my-20"
        >
          <h3 className="text-[30px] w-[250px] mx-8 text-left">
            Track the quality of the day's logs and keep moving
          </h3>
          <Image
            className="mx-8"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="fall"
          className="inline-flex flex-row-reverse justify-center items-center w-full my-20"
        >
          <h3 className="text-[30px] w-[250px] mx-8 text-left">
            Fail some day? Don't worry. Consistency is the key.
          </h3>
          <Image
            className="mx-8"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="day-by-day"
          className="flex justify-center items-center w-full my-20"
        >
          <h3 className="text-[30px] w-[250px] mx-8 text-left">
            Day by day... Baby steps... Small wins... Slow and steady...
          </h3>
          <Image src={PlaceholderImage} width={358} alt="Logo" />
        </section>
        <section
          id="personalize"
          className="inline-flex flex-row-reverse justify-center items-center w-full my-20"
        >
          <h3 className="text-[30px] w-[250px] mx-8 text-left">
            Personalize your experience and create multiple goals journeys
          </h3>
          <Image src={PlaceholderImage} width={358} alt="Logo" />
        </section>
        <section
          id="insights"
          className="inline-flex flex-col justify-center items-center text-center w-full my-20"
        >
          <h3 className="mb-16 text-[30px] mx-8">And get insights about it</h3>
          <Image
            className="max-w-[85%]"
            src={PlaceholderImageLandscape}
            width={747}
            alt="Logo"
          />
        </section>

        <section id="testimonials" className="text-center my-20 w-[100%]">
          <h3 className="text-[30px] mb-16">
            These people are also creating different new habits
          </h3>
          <div className="flex w-[100%] px-20">
            <Image
              className="mx-4"
              src={PlaceholderImage}
              width={401}
              height={615}
              alt="Logo"
            />
            <Image
              className="mx-4"
              src={PlaceholderImage}
              width={401}
              height={615}
              alt="Logo"
            />
            <Image
              className="mx-4"
              src={PlaceholderImage}
              width={401}
              height={615}
              alt="Logo"
            />
          </div>
        </section>
        <section
          id="faq"
          className="justify-center items-center text-center my-20 w-[100%]"
        >
          <h3 className="text-[30px] font-black">FAQ</h3>
          <div className="w-[80%] flex items-center justify-center m-auto">
            <Accordion>
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Accordion 1"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Accordion 2"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Accordion 3"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section
          id="download"
          className="flex justify-center items-center text-center w-full my-20"
        >
          <div className="bg-[#363636] w-full h-[400px] py-16 px-24 text-left flex flex-col justify-between items-start">
            <h4 className="text-[40px] w-[200px] leading-[40px] mb-10 font-black">
              Download the App
            </h4>
            <div>
              <Button className="text-white border-white text-[18px] font-black mr-4" variant="bordered" onClick={(f) => f}>
                For Android
              </Button>
              <Button className="text-white border-white text-[18px] font-black" variant="bordered" onClick={(f) => f}>
                For iOS
              </Button>
            </div>
          </div>
          <div className="bg-[#39D353] h-[400px] w-full py-16 px-24 text-left flex flex-col justify-between items-start">
            <h4 className="text-[40px] text-black w-[300px] leading-[40px] mb-10 font-black">
              Or try on the Browser
            </h4>
            <Button className="text-black border-black text-[18px] font-black" variant="bordered" onClick={(f) => f}>
              Try now (for free)
            </Button>
          </div>
        </section>
        <section id="suggestions" className="text-center my-20">
          <h3 className="text-[40px] font-black mb-2">Some suggestion?</h3>
          <h4 className="text-[#7F7F7F] mb-10">New features? UX/UI ideas? iOS version? Just send below</h4>
          <div className="flex flex-col justify-center items-center">
            <Textarea
              className="w-[500px] bg-[#1D1D1D] border-1 border-[#757575] rounded-xl p-5 text-[40px]"
            />
            <Button className="" variant="solid" onClick={(f) => f}>
              Send
            </Button>
          </div>
        </section>
        <footer>
          <ul>
            <li>
              <Link href={""}>Terms of use</Link>
              <Link href={""}>Privacy Policy</Link>
            </li>
          </ul>
          <p>© Journeylog 2024. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
