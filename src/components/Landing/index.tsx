"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../images/logoFull.svg";
import Illustration1 from "../../images/illustrations/1.svg";
import Illustration2 from "../../images/illustrations/2.svg";
import Illustration3 from "../../images/illustrations/3.svg";
import Illustration4 from "../../images/illustrations/4.svg";
import Illustration5 from "../../images/illustrations/5.svg";
import Illustration6 from "../../images/illustrations/6.svg";

import Bruno from "../../images/bruno.png";
import Bia from "../../images/bia.png";
import Andre from "../../images/andre.png";

import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
} from "@nextui-org/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Landing = ({ user }: any) => {
  const router = useRouter();
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="dark text-foreground landing w-[100vw] overflow-hidden">
      <header className="flex w-[800px] rounded-3xl m-auto justify-between max-w-[90%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-2 md:px-2">
        <Image
          src={Logo}
          width={150}
          alt="Logo"
          className="ml-4 w-[130px] md:w-[150px]"
        />
        <ul className="flex">
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">What is it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">Why use it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">Pricing</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="">FAQ</Link>
          </li>
          <li className="flex items-center mx-3">
            {!!user ? (
              <>
                <Button
                  className={`border-[#39D353] text-[#39D353] font-black pr-2 md:max-w-[150px] max-w-[130px]`}
                  variant="bordered"
                  onClick={(f) => {
                    router.push("/app");
                  }}
                >
                  Go to the app
                  <ChevronRight />
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  className={`bg-[#39D353] font-black`}
                  variant="solid"
                  onClick={(f) => {
                    router.push("/sign-in");
                  }}
                >
                  Try free
                </Button>
              </>
            )}
          </li>
        </ul>
      </header>
      <main>
        <section
          id="hero"
          className="h-[70vh] justify-center px-2 text-center flex flex-col items-center my-20"
        >
          <h1 className="text-[40px] max-w-[90%] leading-[40px] md:leading-[65px] md:text-[65px] mb-6 font-black text-white mt-[100px]">
            Build good habits as a diary
          </h1>
          <h2 className="text-[18px] md:text-[24px] mb-10 text-white max-w-[700px] font-thin">
            Log your routine until become automatic and effortless.
            <br />
            Consistently instead a perfect streak.
          </h2>
          <div className="mb-[150px]">
            <Button
              className="border-[#39D353] text-[#39D353] font-black"
              variant="bordered"
              size="lg"
              onClick={(f) => f}
            >
              Know more
            </Button>
            <Button
              className=" ml-7 bg-[#39D353] text-black font-black"
              variant="solid"
              size="lg"
              onClick={(f) => f}
            >
              Try now
              <ChevronRight />
            </Button>
          </div>
          <ChevronDown size="50" className="mt-[10px]" />
        </section>
        <section
          id="log"
          className="items-center justify-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[280px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Log your activities through simple notes
          </h3>
          <Image src={Illustration1} className="mx-12" width={358} alt="Logo" />
        </section>
        <section
          id="check"
          className="justify-center items-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row-reverse"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Or even through to-do and check lists
          </h3>
          <Image className="mx-12" src={Illustration2} width={358} alt="Logo" />
        </section>
        <section
          id="moving"
          className="justify-center items-center inline-flex w-full my-4 md:my-20 flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Track the quality of the day's logs and keep moving
          </h3>
          <Image className="mx-12" src={Illustration3} width={358} alt="Logo" />
        </section>
        <section
          id="fall"
          className="inline-flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row-reverse"
        >
          <div className="md:w-[280px] md:mx-12 p-6 max-w-[70%] md:max-w-none">
            <h3 className="text-[25px] md:text-[30px] mb-10  text-center md:text-left">
              Fail some day? Don't worry. Consistency is the key.
            </h3>
            <span className="text-[#787878]">
              To know more about the Journeylog's purpose, read our{" "}
              <Link className="text-[#27DE55]" href="">
                manifesto
              </Link>
              .
            </span>
          </div>
          <Image className="mx-12" src={Illustration4} width={358} alt="Logo" />
        </section>
        <section
          id="day-by-day"
          className="flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[320px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Day by day... <br />
            Baby steps... <br />
            Small wins... <br />
            Slow and steady...
          </h3>
          <Image
            className="mx-12 mr-[-200px]"
            src={Illustration5}
            width={800}
            alt="Logo"
          />
        </section>
        <section
          id="personalize"
          className="inline-flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row-reverse"
        >
          <h3 className="text-[25px] md:text-[30px] md:w-[270px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left">
            Personalize your experience and create multiple{" "}
            <span className="text-[#383838] line-through">goals</span> journeys
          </h3>
          <Image
            className="mx-12 ml-[-150px]"
            src={Illustration6}
            width={800}
            alt="Logo"
          />
        </section>
        <section
          id="insights"
          className="inline-flex justify-center items-center text-center w-full my-12 md:my-20"
        >
          <h3 className="text-[25px] md:text-[30px] mx-12 max-w-[300px] text-left">
            And get insights about your journey:
          </h3>
          <div className="flex justify-center items-center">
            <span className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 pl-0 text-[#fff] ml-7 mr-2">
              <div className="text-[80px] leading-[80px] font-bold text-[#27DE55]">
                12
              </div>
              <span className="text-[20px]">Days in a row</span>
            </span>
            <span className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-[80px] leading-[80px] font-bold">16</div>
              <span className="text-[20px]">Days with logs</span>
            </span>
            <span className="flex justify-center items-center flex-shrink-0 flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-[80px] leading-[80px] font-bold">360</div>
              <span className="text-[20px]">Days since it started</span>
            </span>
          </div>
        </section>

        <section
          id="testimonials"
          className="text-center my-6 md:my-20 w-[100%]"
        >
          <h3 className="md:text-[35px] mb-10 md:mb-20 text-[25px]">
            These people are also creating <br /> different new habits
          </h3>
          <div className="flex w-[100%] px-20 flex-col md:flex-row justify-center">
            {[
              {
                image: Bia,
                nome: "Beatriz",
                rate: 5,
                occupation: "Communications Analyst",
                text: "I was having a lot of difficulty maintaining consistency at the gym. I started logging the times I went, and the frequency view in Journeylog became a motivator. Amazing app!",
              },
              {
                image: Bruno,
                nome: "Bruno",
                rate: 5,
                occupation: "Software Engineer",
                text: "The app's UI is very simple. It allowed me to take notes during work meetings. I subscribed to the paid version to better organize by themes. Totally worth it!",
              },
              {
                image: Andre,
                nome: "Andre",
                rate: 4,
                occupation: "Game Developer",
                text: "Using it to log all the times I drink water. I've tried several apps, but this is the only one that really helped me focus on what I needed. Super easy to use!",
              },
            ].map(({ image, nome, rate, occupation, text }) => {
              return (
                <Card className="py-8 px-6 w-[370px] rounded-[60px] bg-[#2C2C2C] mx-6 overflow-visible">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center ">
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt={nome}
                      className="mb-4 mt-[-70px]"
                    />
                    <p className="text-[20px]">{nome}</p>
                    <p className="text-default-500 mb-2">{occupation}</p>
                    <svg
                      width="145"
                      height="26"
                      viewBox="0 0 145 26"
                      className="mb-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M42.9315 2.94922L46.1585 9.50223L53.3749 10.5595L48.1532 15.6575L49.3855 22.8595L42.9315 19.4574L36.4774 22.8595L37.7098 15.6575L32.488 10.5595L39.7045 9.50223L42.9315 2.94922Z"
                        fill="#F6D31E"
                        stroke="#F6D31E"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.3099 2.94922L16.5369 9.50223L23.7534 10.5595L18.5316 15.6575L19.764 22.8595L13.3099 19.4574L6.85585 22.8595L8.08818 15.6575L2.86646 10.5595L10.0829 9.50223L13.3099 2.94922Z"
                        fill="#F6D31E"
                        stroke="#F6D31E"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M72.5528 2.94922L75.7799 9.50223L82.9963 10.5595L77.7746 15.6575L79.0069 22.8595L72.5528 19.4574L66.0988 22.8595L67.3311 15.6575L62.1094 10.5595L69.3258 9.50223L72.5528 2.94922Z"
                        fill="#F6D31E"
                        stroke="#F6D31E"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M102.174 2.94922L105.401 9.50223L112.618 10.5595L107.396 15.6575L108.628 22.8595L102.174 19.4574L95.7204 22.8595L96.9527 15.6575L91.731 10.5595L98.9474 9.50223L102.174 2.94922Z"
                        fill="#F6D31E"
                        stroke="#F6D31E"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M131.796 2.94922L135.023 9.50223L142.239 10.5595L137.017 15.6575L138.25 22.8595L131.796 19.4574L125.342 22.8595L126.574 15.6575L121.352 10.5595L128.569 9.50223L131.796 2.94922Z"
                        fill="#F6D31E"
                        stroke="#F6D31E"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <p className="text-center text-[18px] leading-7">
                      "{text}"
                    </p>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </section>
        <section
          id="faq"
          className="justify-center items-center text-center my-[150px] w-[100%]"
        >
          <h3 className="text-[40px] font-black mb-8">FAQ</h3>
          <div className="w-[85%] flex items-center justify-center m-auto">
            <Accordion
              showDivider={false}
              selectionMode="multiple"
              itemClasses={{
                title: "text-[25px] text-left",
                content: "text-left text-[20px] py-4 pb-8 text-[#595959]",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Why would I use it?"
                title="Why would I use it?"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="It's possible to create a habit using this app?"
                title="It's possible to create a habit using this app?"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Where and how can I use Journeylog?"
                title="Where and how can I use Journeylog?"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="It's an app for iOS or Android?"
                title="It's an app for iOS or Android?"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="It's free?"
                title="It's free?"
                className="border-1 border-[#303030] rounded-lg px-8 py-4 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                {defaultContent}
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="suggestions" className="text-center my-28">
          <h3 className="text-[40px] font-black mb-4 max-w-[85%] m-auto leading-[40px]">
            Some suggestion?
          </h3>
          <h4 className="text-[#7F7F7F] text-[20px] mb-10 max-w-[80%] m-auto">
            New features? UX/UI ideas? iOS version? Just send below
          </h4>
          <div className="flex flex-col justify-center items-center">
            <Textarea
              className="textarea w-[500px] max-w-[80%] m-auto mb-12 bg-[#1D1D1D] rounded-[30px]"
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
