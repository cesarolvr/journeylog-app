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
      <header className="flex w-[800px] rounded-3xl m-auto justify-between max-w-[90%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-3">
        <Image src={Logo} width={150} alt="Logo" className="ml-4" />
        <ul className="flex">
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">What is it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">Why use it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
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
          className="h-[70vh] justify-center px-2 text-center flex flex-col items-center my-20"
        >
          <h1 className="text-[40px] max-w-[90%] leading-[40px] md:leading-[65px] md:text-[65px] mb-4 font-black text-white mt-[120px]">
            Build good habits as a diary
          </h1>
          <h2 className="text-[18px] md:text-[25px] text-white mb-[150px]">
            Consistently instead streak.
          </h2>
          <ChevronsDown size="50" className="mt-[100px]" />
        </section>
        <section
          id="log"
          className="items-center justify-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Log your activities through simple notes
          </h3>
          <Image
            src={PlaceholderImage}
            className="mx-12"
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="check"
          className="justify-center items-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row-reverse"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Or even through to-do and check lists
          </h3>
          <Image
            className="mx-12"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="moving"
          className="justify-center items-center inline-flex w-full my-4 md:my-20 flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Track the quality of the day's logs and keep moving
          </h3>
          <Image
            className="mx-12"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="fall"
          className="inline-flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row-reverse"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Fail some day? Don't worry. Consistency is the key.
          </h3>
          <Image
            className="mx-12"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="day-by-day"
          className="flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Day by day... Baby steps... Small wins... Slow and steady...
          </h3>
          <Image
            className="mx-12"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="personalize"
          className="inline-flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row-reverse"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Personalize your experience and create multiple goals journeys
          </h3>
          <Image
            className="mx-12"
            src={PlaceholderImage}
            width={358}
            alt="Logo"
          />
        </section>
        <section
          id="insights"
          className="inline-flex flex-col justify-center items-center text-center w-full my-12 md:my-20"
        >
          <h3 className="mb-4 md:mb-16 text-[25px] md:text-[30px] mx-12">And get insights about it</h3>
          <Image
            className="max-w-[85%]"
            src={PlaceholderImageLandscape}
            width={747}
            alt="Logo"
          />
        </section>

        <section id="testimonials" className="text-center my-6 md:my-20 w-[100%]">
          <h3 className="md:text-[35px] mb-8 md:mb-16 text-[25px]">
            These people are also creating <br /> different new habits
          </h3>
          <div className="flex w-[100%] px-20 flex-col md:flex-row">
            <Image
              className="md:mx-4 mb-12 md:mb-0 max-w-[70%] m-auto"
              src={PlaceholderImage}
              width={401}
              height={615}
              alt="Logo"
            />
            <Image
              className="md:mx-4 mb-12 md:mb-0 max-w-[70%] m-auto"
              src={PlaceholderImage}
              width={401}
              height={615}
              alt="Logo"
            />
            <Image
              className="md:mx-4 mb-12 md:mb-0 max-w-[70%] m-auto"
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
          <h3 className="text-[40px] font-black mb-8">FAQ</h3>
          <div className="w-[85%] flex items-center justify-center m-auto">
            <Accordion
              showDivider={false}
              selectionMode="multiple"
              itemClasses={{ title: "text-[25px] text-left", content: "text-left text-[20px] py-4 pb-8 text-[#595959]" }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Accordion 1"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="Accordion 2"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Accordion 3"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        <section
          id="download"
          className="flex justify-center items-center text-center w-full my-20 md:flex-row flex-col"
        >
          <div className="bg-[#363636] h-[400px] md:h-[500px] w-full py-10 md:py-16 px-6 md:px-24 text-center md:text-left flex flex-col justify-center md:justify-between items-center md:items-start">
            <h4 className="text-[40px] md:text-[50px] w-[320px] leading-[40px] md:leading-[60px] mb-10 font-black">
              Download the App
            </h4>
            <div>
              <Button
                className="text-white border-white text-[18px] font-black mr-4"
                variant="bordered"
                disabled={true}
                onClick={(f) => f}
              >
                For Android
              </Button>
              <Button
                className="text-white border-white text-[18px] font-black"
                variant="bordered"
                disabled={true}
                onClick={(f) => f}
              >
                For iOS
              </Button>
            </div>
          </div>
          <div className="bg-[#39D353] h-[400px] md:h-[500px] w-full py-10 md:py-16 px-6 md:px-24 text-center md:text-left flex flex-col justify-center md:justify-between items-center md:items-start">
            <h4 className="text-[40px] md:text-[50px] text-black w-[320px] leading-[40px] md:leading-[60px] mb-10 font-black">
              Or try on the Browser
            </h4>
            <Button
              className="text-black border-black text-[18px] font-black"
              variant="bordered"
              onClick={(f) => f}
            >
              Try now (for free)
            </Button>
          </div>
        </section>
        <section id="suggestions" className="text-center my-28">
          <h3 className="text-[40px] font-black mb-4 max-w-[85%] m-auto leading-[40px]">Some suggestion?</h3>
          <h4 className="text-[#7F7F7F] text-[20px] mb-10 max-w-[80%] m-auto">
            New features? UX/UI ideas? iOS version? Just send below
          </h4>
          <div className="flex flex-col justify-center items-center">
            <Textarea
              className="textarea w-[500px] max-w-[80%] m-auto mb-12 bg-[#1D1D1D] border-1 border-[#757575] rounded-[30px]"
              size="lg"
            />
            <Button
              className="bg-white text-[20px] px-16 text-black font-black"
              variant="solid"
              size="lg"
              onClick={(f) => f}
            >
              Send
            </Button>
          </div>
        </section>
        <footer className="text-center w-full flex flex-col justify-center items-center px-4 text-[#595959]">
          <ul className="w-full text-center mb-5 text-[18px] justify-center flex">
            <li className="mx-3 text-center">
              <Link href={""}>Terms of use</Link>
            </li>
            <li className="mx-3 text-center">
              <Link href={""}>Privacy Policy</Link>
            </li>
          </ul>
          <p className="mb-24 text-[18px]">
            © Journeylog 2024. All Rights Reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
