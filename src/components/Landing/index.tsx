"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../images/logoFull.png";
import PlaceholderImage from "../../images/placeholder.png";
import { Accordion, AccordionItem, Button, Textarea } from "@nextui-org/react";
import { ChevronsDown } from "lucide-react";

const Landing = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="dark text-foreground landing">
      <header>
        <Image src={Logo} width={215} height={50} alt="Logo" />
        <ul>
          <li>
            <Link href="">What is it?</Link>
          </li>
          <li>
            <Link href="">Why use it?</Link>
          </li>
          <li>
            <Link href="">FAQ</Link>
          </li>
          <li>
            <Button className="" variant="solid" onClick={(f) => f}>
              Try free
            </Button>
          </li>
        </ul>
      </header>
      <main>
        <section id="hero">
          <h1>Build good habits as a diary</h1>
          <h2>Consistently instead streak.</h2>
          <ChevronsDown />
        </section>
        <section id="log" className="flex justify-center items-center">
          <h3>Build good habits as a diary</h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section
          id="check"
          className="flex flex-row-reverse justify-center items-center"
        >
          <h3>Or even through to-do and check lists</h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section id="moving" className="flex justify-center items-center">
          <h3>Track the quality of the day's logs and keep moving</h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section
          id="fall"
          className="flex flex-row-reverse justify-center items-center"
        >
          <h3>Fail some day? Don't worry. Consistency is the key.</h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section id="day-by-day" className="flex justify-center items-center">
          <h3>Day by day... Baby steps... Small wins... Slow and steady...</h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section
          id="personalize"
          className="flex flex-row-reverse justify-center items-center"
        >
          <h3>
            Personalize your experience and create multiple goals journeys
          </h3>
          <Image src={PlaceholderImage} width={558} height={695} alt="Logo" />
        </section>
        <section
          id="insights"
          className="justify-center items-center text-center"
        >
          <h3>And get insights about it</h3>
          <Image src={PlaceholderImage} width={1347} height={695} alt="Logo" />
        </section>

        <section id="testimonials" className="text-center">
          <h3>These people are also creating different new habits</h3>
          <div className="flex">
            <Image src={PlaceholderImage} width={401} height={615} alt="Logo" />
            <Image src={PlaceholderImage} width={401} height={615} alt="Logo" />
            <Image src={PlaceholderImage} width={401} height={615} alt="Logo" />
          </div>
        </section>
        <section id="faq" className="justify-center items-center text-center">
          <h3>FAQ</h3>
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </section>
        <section
          id="download"
          className="flex justify-center items-center text-center"
        >
          <div className="bg-[#363636]">
            <h4>Download the App</h4>
            <Button className="" variant="bordered" onClick={(f) => f}>
              For Android
            </Button>
            <Button className="" variant="bordered" onClick={(f) => f}>
              For iOS
            </Button>
          </div>
          <div className="bg-[#39D353]">
            <h4>Or try on the Browser</h4>
            <Button className="" variant="bordered" onClick={(f) => f}>
              Try now (for free)
            </Button>
          </div>
        </section>
        <section id="suggestions" className="text-center">
          <h3>Some suggestion?</h3>
          <h4>New features? UX/UI ideas? iOS version? Just send below</h4>
          <div className="flex flex-col justify-center items-center">
            <Textarea
              placeholder="Enter your description"
              className="max-w-xs"
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
