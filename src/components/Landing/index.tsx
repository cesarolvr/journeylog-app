"use client";

import * as motion from "motion/react-client";
import Typed from "typed.js";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../images/logoFull.svg";
import Illustration4 from "../../images/illustrations/4.svg";
import Illustration5 from "../../images/illustrations/5.svg";
import Illustration6 from "../../images/illustrations/6.svg";

import PhoneMockup from "../../../src/images/illustrations/phone.svg";

import { useLottie } from "lottie-react";
import { useInView } from "react-intersection-observer";
import xmark from "../../images/illustrations/xmark.json";

import Bruno from "../../images/bruno.png";
import Bia from "../../images/bia.png";
import Andre from "../../images/andre.png";

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { subscribeAction, unsubscribeAction } from "@/services/stripe";
import Footer from "../Footer";
import { useEffect, useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AnimatePresence, useScroll, useTransform } from "framer-motion";
import FirstIllustration from "../Illustrations/FirstIllustration";
import SecondIllustration from "../Illustrations/SecondIllustration";
import ThirdIllustration from "../Illustrations/ThirdIllustration";
import RemindersCard from "../RemindersCard";
import { useTheme } from "next-themes";

const Landing = ({ user, subscriptionInfo }: any) => {
  const [formContent, setFormContent] = useState("");
  const [remindersTurnOn, setRemindersTurnOn] = useState(false);
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const [buttonFormText, setButtonFormText] = useState("Send");

  const supabaseClient = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);
  const { subscription, subscription_key } = subscriptionInfo;
  const router = useRouter();

  const handleChoosePlan = async (id: string, plan: string) => {
    const isPro = plan === "habit_creator";
    if (isPro) {
      const url = await subscribeAction({ userId: id });

      if (url) {
        router.push(url);
      } else {
        console.error("Failed to create subscription");
      }
    } else {
      const res = await unsubscribeAction({ userId: id, subscription_key });

      console.log(res);
    }
  };

  const handleSuggestionForm = (value: any) => {
    const max = 150;
    const currentLength = value?.length;
    if (currentLength <= max) {
      setFormContent(value);
    }
  };

  const submitForm = async () => {
    if (formContent && formContent?.length > 5) {
      setIsLoading(true);

      await supabaseClient.from("feedback").insert({
        content: formContent,
      });

      setIsLoading(false);
      setButtonFormText("Sent 👍🏾");
      setFormContent("");
    }
  };

  const isPro = subscription === "habit_creator";

  const casesRef = useRef(null);
  const { scrollYProgress, scrollY } = useScroll();
  const { theme, setTheme } = useTheme();

  const translateFirstLine = useTransform(scrollYProgress, [0, 1], [-800, 500]);
  const translateSecondLine = useTransform(
    scrollYProgress,
    [0, 1],
    [500, -100]
  );
  const translateThirdLine = useTransform(
    scrollYProgress,
    [0, 1],
    [-1000, 500]
  );

  const whereText = useRef(null);
  const personalizeText = useRef(null);

  useEffect(() => {
    const typedHero = new Typed(whereText.current, {
      strings: ["Whatsapp", "Email", "SMS"],
      typeSpeed: 50,
      loop: true,
      backDelay: 3000,
      backSpeed: 50,
      startDelay: 500,
    });

    const typedPersonalize = new Typed(personalizeText.current, {
      strings: [
        "journeys",
        "goals",
        "categories",
        "notes",
        `"folders"`,
        "records",
        "subjects",
        "objectives",
        "milestones",
        "plans",
        "schedules",
        "archives",
        "topics",
        "disciplines",
        "themes",
      ],
      typeSpeed: 50,
      loop: true,
      backDelay: 3000,
      backSpeed: 50,
      startDelay: 500,
    });

    return () => {
      typedHero.destroy();
      typedPersonalize.destroy();
    };
  }, []);

  useEffect(() => {
    setTheme("dark");
  }, []);

  const options = {
    animationData: xmark,
    loop: false,
    speed: 0.3,
    autoplay: false,
  };

  const { View, play } = useLottie(options);

  const { ref: XMarkRef, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        play();
      }, 500);
    }
  }, [inView]);

  const { ref: remindersRef, inView: remindersRefInView } = useInView({
    threshold: 1,
  });

  const [whatTimeOpened, setWhatTimeOpened] = useState(false);
  const [alertMeOnOpened, setAlertMeOnOpened] = useState(false);

  useEffect(() => {
    if (remindersRefInView) {
      setTimeout(() => {
        setRemindersTurnOn(true);
      }, 500);
      setTimeout(() => {
        setWhatTimeOpened(true);
      }, 2000);
      setTimeout(() => {
        setWhatTimeOpened(false);
      }, 4000);

      setTimeout(() => {
        setAlertMeOnOpened(true);
      }, 5000);
      setTimeout(() => {
        setAlertMeOnOpened(false);
      }, 6000);
    } else {
      setTimeout(() => {
        setRemindersTurnOn(false);
        setWhatTimeOpened(false);
        setAlertMeOnOpened(false);
      }, 500);
    }
  }, [remindersRefInView]);

  const playNotification = () => {
    let audio = new Audio("./sound.mp3");
    audio.volume = 0.2;
    audio.play();
  };

  return (
    <div className="dark text-foreground landing w-[100vw] overflow-hidden">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
        }}
        className="flex w-[850px] rounded-2xl m-auto justify-between max-w-[90%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-2 md:px-2"
      >
        <Image
          src={Logo}
          width={150}
          alt="Logo"
          className="md:ml-4 ml-2 w-[130px] md:w-[150px]"
        />
        <ul className="flex">
          <li className="md:flex items-center mx-3 hidden">
            <Link href="#the-product">What is it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="/purpose">Why use it?</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="#pricing">Pricing</Link>
          </li>
          <li className="md:flex items-center mx-3 hidden">
            <Link href="#faq">FAQ</Link>
          </li>
          <li className="flex items-center mx-3 mr-1">
            {!!user ? (
              <>
                <Button
                  className={`border-[#39D353] text-[#39D353] font-black pr-2 md:max-w-[150px] max-w-[140px]`}
                  variant="bordered"
                  onPress={(f) => {
                    router.push("/app");
                  }}
                >
                  Go to the app
                  <ChevronRight className="md:mr-[-5px] ml-[-5px] shrink-0" />
                </Button>
              </>
            ) : (
              <>
                {" "}
                <Button
                  className={`bg-[#39D353] font-black text-[black]`}
                  variant="solid"
                  onPress={(f) => {
                    router.push("/sign-in");
                  }}
                >
                  Try free
                  <ChevronRight className="mr-[-8px] ml-[-5px]" />
                </Button>
              </>
            )}
          </li>
        </ul>
      </motion.header>
      <main>
        <section
          id="hero"
          className="h-[70vh] justify-center px-2 text-center flex flex-col items-center my-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
            }}
            className="text-[40px] max-w-[90%] leading-[40px] md:leading-[65px] md:text-[65px] mb-6 font-black text-white md:mt-[100px] mt-[70px]"
          >
            Turn your habits into a diary!
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.1,
            }}
            className="text-[18px] md:text-[24px] leading-6 md:leading-10 mb-10 text-white max-w-[90%] md:max-w-[600px] font-thin"
          >
            Keep track of your routine until it’s second nature. And to keep you
            on track we’ll ping you through{" "}
            <strong
              className="font-bold text-[#39d353]"
              ref={whereText}
            ></strong>
          </motion.h2>
          <div className="mb-[150px] flex">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.3,
              }}
            >
              <Button
                className="border-[#39D353] text-[#39D353] font-black"
                variant="bordered"
                size="lg"
                onPress={(f) => {
                  router.push("/purpose");
                }}
              >
                Our purpose
              </Button>
            </motion.div>
            {!!user ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.4,
                }}
              >
                <Button
                  className=" ml-5 bg-[#39D353] text-black font-black"
                  variant="solid"
                  size="lg"
                  onPress={(f) => {
                    router.push("/app");
                  }}
                >
                  Go to the app
                  <ChevronRight className="mr-[-16px] ml-[-5px]" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: 0.4,
                }}
              >
                <Button
                  className=" ml-5 bg-[#39D353] text-black font-black"
                  variant="solid"
                  size="lg"
                  onPress={(f) => {
                    router.push("/sign-in");
                  }}
                >
                  Try free
                  <ChevronRight className="mr-[-10px] ml-[-5px]" />
                </Button>
              </motion.div>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.5,
              y: { type: "spring", visualDuration: 0.4, bounce: 0.9 },
            }}
          >
            <ChevronDown size="50" className="mt-[10px] flex-shrink-0" />
          </motion.div>
        </section>
        <section
          id="the-product"
          className="items-center justify-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
            className="text-[25px] md:text-[30px] md:w-[280px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left"
          >
            Log your activities through simple notes
          </motion.h3>
          <FirstIllustration />
        </section>
        <section
          id="check"
          className="justify-center items-center my-4 md:my-20 inline-flex w-full flex-col md:flex-row-reverse"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
            className="text-[25px] md:text-[30px] md:w-[250px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left"
          >
            Or even through to-do and check lists
          </motion.h3>
          <SecondIllustration />
          {/* <Image className="mx-12" src={Illustration2} width={358} alt="Logo" /> */}
        </section>
        <section
          id="moving"
          className="justify-center items-center inline-flex w-full my-4 md:my-20 flex-col md:flex-row"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
            className="text-[25px] md:text-[30px] md:w-[280px] md:mx-12 p-6 max-w-[70%] md:max-w-none text-center md:text-left"
          >
            Track the quality of the day's logs and keep moving
          </motion.h3>
          <ThirdIllustration />
          {/* <Image className="mx-12" src={Illustration3} width={358} alt="Logo" /> */}
        </section>
        <section
          id="fall"
          className="inline-flex justify-center items-center w-full my-4 md:my-20 flex-col md:flex-row-reverse"
        >
          <div className="md:w-[280px] md:mx-12 p-6 max-w-[70%] md:max-w-none">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 1, once: true }}
              className="text-[25px] md:text-[30px] mb-10  text-center md:text-left"
            >
              Fail some day? Don't worry. Consistency is the key.
            </motion.h3>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 1, once: true }}
              className="text-[#787878] text-center md:text-left inline-block"
            >
              To know more about the Journeylog's purpose,{" "}
              <Link className="text-[#27DE55] underline" href="/purpose">
                read our purpose
              </Link>
              .
            </motion.span>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
          >
            <div
              ref={XMarkRef}
              className="w-[258px] m-auto scale-y-75 top-0 right-0 left-0 absolute"
            >
              {View}
            </div>
            <Image
              className="max-w-[85%] m-auto"
              src={Illustration4}
              width={358}
              alt="Logo"
            />
          </motion.div>
        </section>
        <section
          id="day-by-day"
          className="flex justify-center items-center w-full my-4 sm:my-20 flex-col sm:flex-row"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className="text-[25px] sm:text-[30px] sm:w-[320px] sm:shrink-0 sm:ml-36 p-6 max-w-[70%] text-center sm:text-left"
          >
            Day by day... <br />
            Baby steps... <br />
            Small wins... <br />
            Slow and steady...
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.1, once: true }}
            className="sm:mx-12 sm:mr-[-200px] w-full sm:w-[50%] max-w-[85%] sm:max-w-none shrink-0"
          >
            <Image
              className="sm:max-w-none"
              src={Illustration5}
              width={800}
              alt="Logo"
            />
          </motion.div>
        </section>
        <section
          id="personalize"
          className="inline-flex justify-center items-center w-full my-4 sm:my-20 md:mb-5 flex-col sm:flex-row-reverse"
        >
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className="text-[25px] sm:text-[30px] sm:w-[30%] sm:mx-12 py-6 sm:p-6 max-w-[80%] sm:max-w-none text-center sm:text-left"
          >
            <div className="sm:max-w-[280px] mb-4 sm:mb-0">
              Personalize your experience and create multiple <br />
              <span ref={personalizeText} className="text-[#39d353]"></span>
            </div>
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.1, once: true }}
          >
            <Image
              className="sm:mx-12 sm:ml-[-150px] max-w-[85%] sm:max-w-none m-auto"
              src={Illustration6}
              width={800}
              alt="Logo"
            />
          </motion.div>
        </section>
        <section id="day-by-day">
          <RemindersCard />
        </section>
        <section
          id="cherry"
          className="inline-flex justify-center items-center w-full my-4 md:mb-48 md:mt-20 flex-col md:flex-row-reverse"
        >
          <div className="md:w-[330px] md:mx-12 p-3 md:p-6 max-w-[80%] md:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 1, once: true }}
              className="flex justify-center items-center flex-col md:items-start"
            >
              <Tabs
                classNames={{
                  tabList: "bg-[#2c2c2c]",
                  cursor: "!bg-[#565656]",
                  tabContent: "!font-black",
                }}
                aria-label="Tabs radius"
                size="lg"
                radius="full"
                className="mb-10"
                onSelectionChange={(e) => {
                  setIsWhatsapp(e === "Whatsapp");
                  playNotification();
                }}
              >
                <Tab key="Whatsapp" title="Whatsapp" />
                <Tab key="SMS" title="SMS" />
              </Tabs>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              viewport={{ amount: 1, once: true }}
              className="text-[25px] md:text-[30px] mb-5 md:mb-10 text-center md:text-left"
            >
              The cherry on top: reminders are sent straight to your{" "}
              <span className="font-black text-[#27DE55]">WhatsApp</span> or
              <strong className="font-black"> SMS</strong>
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, once: true }}
            className="relative"
          >
            <Image
              src={PhoneMockup}
              alt=""
              className="md:mr-7 mb-10 md:mb-0 px-14 md:px-8"
            />
            <AnimatePresence>
              {isWhatsapp && (
                <motion.div
                  key={"modal"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.1 },
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  // viewport={{ amount: 1, once: true }}
                  className="w-[230px] md:w-[270px] h-[120px] my-auto bg-black bg-opacity-50 top-[-50px] text-white rounded-2xl absolute inset-0 left-[80px] md:left-[60px]"
                >
                  <div className="py-4 px-5">
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#27DE55] rounded-full p-2">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 8.76845C18 13.6108 14.044 17.5363 9.16288 17.5363C7.61392 17.5363 6.15887 17.1401 4.89223 16.4463L0 18L1.59474 13.2944C0.790622 11.9738 0.327518 10.4231 0.327518 8.76786C0.328105 3.92552 4.28298 0 9.16405 0C14.0445 0.0011739 18 3.92611 18 8.76845ZM9.16229 1.39812C5.06597 1.39812 1.73385 4.70499 1.73385 8.77021C1.73385 10.3831 2.25976 11.8763 3.14899 13.0913L2.22161 15.8283L5.07536 14.9214C6.24926 15.6915 7.65383 16.14 9.16229 16.14C13.2586 16.14 16.5919 12.8337 16.5919 8.76845C16.5931 4.70499 13.2592 1.39812 9.16229 1.39812ZM13.6255 10.7881C13.5703 10.6995 13.4259 10.6455 13.2099 10.5375C12.9945 10.4295 11.928 9.91007 11.7302 9.83963C11.5306 9.76744 11.3862 9.73105 11.2419 9.94646C11.0992 10.1619 10.6837 10.6455 10.5563 10.7899C10.4301 10.9337 10.3039 10.9519 10.0873 10.8457C9.87074 10.7365 9.17227 10.5111 8.34467 9.77918C7.70079 9.20866 7.26586 8.50608 7.14025 8.29067C7.01288 8.07585 7.12734 7.95963 7.23475 7.85281C7.33159 7.75596 7.45133 7.60159 7.55992 7.4754C7.6685 7.35038 7.70431 7.26175 7.7765 7.11794C7.84752 6.97414 7.81172 6.84912 7.75831 6.74054C7.70431 6.63254 7.27173 5.57603 7.09036 5.14579C6.91016 4.71614 6.72997 4.78717 6.60319 4.78717C6.47699 4.78717 6.3326 4.76956 6.18822 4.76956C6.04383 4.76956 5.80905 4.82179 5.61124 5.03721C5.41344 5.25262 4.85349 5.77207 4.85349 6.82975C4.85349 7.88861 5.62885 8.90932 5.73744 9.05253C5.84661 9.19516 7.23651 11.4367 9.43816 12.2972C11.641 13.1571 11.641 12.8701 12.0378 12.8337C12.4357 12.7973 13.3197 12.3142 13.4993 11.813C13.68 11.3094 13.68 10.8779 13.6255 10.7881Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <h1 className="text-medium font-bold text-[#fff]">
                        Journeylog
                      </h1>
                    </div>
                    <div className="mt-3 text-sm">
                      <p className="flex items-center text-[12px] md:text-[16px]">
                        🚀 You have a habit to reinforce today: 🏋🏽 Workout on
                        weekdays
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!isWhatsapp && (
                <motion.div
                  key={"modal"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.1 },
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="w-[230px] md:w-[270px] h-[140px] my-auto bg-black bg-opacity-50 top-[-50px] text-white rounded-2xl absolute inset-0 left-[80px] md:left-[60px]"
                >
                  <div className="py-4 px-5">
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#128830] rounded-full p-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.00062 0.277832C3.58942 0.277832 0 3.11119 0 6.59338C0 8.55896 1.14849 10.3835 3.15039 11.5989C3.46104 11.7868 3.67455 12.0989 3.73888 12.4555C3.93632 13.5571 3.67085 14.7175 3.27493 15.7217C4.59573 15.0947 5.95677 14.1317 7.03708 13.207C7.30338 12.9795 7.65873 12.8843 8.00419 12.9081H8.00577C12.4126 12.9081 16 10.0756 16 6.59296C16 3.11119 12.4118 0.277832 8.00062 0.277832Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <h1 className="text-medium font-bold text-[#fff]">SMS</h1>
                    </div>
                    <div className="mt-3 text-sm">
                    <p className="flex items-center text-[12px] md:text-[16px]">
                        Journeylog: 🚀 You have a habit to reinforce today: 🏋🏽
                        Workout on weekdays
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
        <section
          id="insights"
          className="inline-flex flex-col md:flex-row justify-center items-center text-center w-full my-12 md:my-20 md:mt-0"
        >
          <motion.h3
            className="text-[25px] mb-10 md:mb-0 md:text-[30px] mx-12 max-w-[300px] md:text-left"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 1, once: true }}
          >
            And get insights about your journey:
          </motion.h3>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.span
              className="flex justify-center flex-shrink-0 items-center flex-col p-4 md:py-8 pl-0 text-[#fff] ml-7 mr-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
              viewport={{ amount: 1, once: true }}
            >
              <div className="text-[80px] leading-[80px] font-bold text-[#27DE55]">
                12
              </div>
              <span className="text-[20px]">Days in a row</span>
            </motion.span>
            <motion.span
              className="flex justify-center flex-shrink-0 items-center flex-col p-4 md:py-8 text-[#5C5C5C]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              viewport={{ amount: 1, once: true }}
            >
              <div className="text-[80px] leading-[80px] font-bold">16</div>
              <span className="text-[20px]">Days with logs</span>
            </motion.span>
            <motion.span
              className="flex justify-center items-center flex-shrink-0 flex-col p-4 md:py-8 text-[#5C5C5C]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              viewport={{ amount: 1, once: true }}
            >
              <div className="text-[80px] leading-[80px] font-bold">360</div>
              <span className="text-[20px]">Days since it started</span>
            </motion.span>
          </div>
        </section>

        <section
          id="testimonials"
          className="text-center my-6 md:my-16 w-[100%]"
        >
          <h3 className="md:text-[35px] mb-16 md:mb-20 text-[25px]">
            There are people <br />
            creating new habits
          </h3>
          <div className="m-auto flex w-[100%] md:max-w-[900px] md:px-0 flex-col md:flex-row justify-center items-center md:items-start">
            {[
              {
                image: Bia,
                nome: "Beatriz",
                rate: 5,
                occupation: "Business Analyst",
                text: "I was having a lot of difficulty maintaining consistency at the gym. I started logging the times I went, and the frequency view became a motivator. Amazing app!",
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
            ].map(({ image, nome, rate, occupation, text }, index) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5, once: true }}
                  transition={{
                    duration: 0.2,
                    delay: index / 6,
                  }}
                  className="w-[370px] max-w-[80%] md:max-w-none"
                  key={index}
                >
                  <Card
                    shadow="none"
                    className="py-8 px-2 rounded-[40px] bg-[#2C2C2C] md:mx-3 mb-20 overflow-visible"
                  >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-center justify-center ">
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt={nome}
                        className="mb-4 mt-[-70px]"
                      />
                      <p className="text-[18px]">{nome}</p>
                      <p className="text-default-500 text-[16px] mb-2">
                        {occupation}
                      </p>
                      <div className="mb-5 stars flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="29"
                            height="26"
                            viewBox="0 0 29 26"
                            fill={i < rate ? "#F6D31E" : "#171717"}
                            xmlns="http://www.w3.org/2000/svg"
                            className="px-1"
                          >
                            <path
                              d="M14.5 0L18.09 9.26H28.18L20.04 15.02L23.63 24.28L14.5 18.52L5.37 24.28L8.96 15.02L0.82 9.26H10.91L14.5 0Z"
                              stroke={i < rate ? "#F6D31E" : "#171717"}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ))}
                      </div>
                    </CardHeader>
                    <CardBody className="overflow-visible py-1">
                      <p className="text-center text-[16px] text-[#bdbdbd] leading-7">
                        "{text}"
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
        <section
          id="testimonials"
          ref={casesRef}
          className="text-center my-6 md:my-16 w-[100%] mb-14"
        >
          <h3 className="md:text-[35px] mb-16 md:mb-18 text-[25px]">
            And some are just exploring new vibes:
          </h3>
          <motion.div
            style={{ x: translateFirstLine }}
            className="m-auto flex items-center w-[100%] md:px-0 flex-row justify-center md:items-end"
          >
            {[
              {
                text: `“I'm using Journeylog to not forget to call my mom every day. It's just working 💚”`,
                author: "Jake from Colorado",
                color: `#397649`,
              },
              {
                text: `“I log every gym session, and seeing my streak grow has been a huge motivator. I’ve never been this consistent before! 💪🏽”`,
                author: "Mike from Atlanta",
                color: `#1F602F`,
              },
              {
                text: `“I use it to log every glass of water I drink, and it’s honestly helped me stay hydrated. Love the reminders too! 💦”`,
                author: "Cris from Rio",
                color: `#35A351`,
              },
            ].map(({ text, author, color }, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="py-6 px-6 md:w-[560px] w-[300px] flex-shrink-0 rounded-[20px] bg-[#20B545] mx-3 mb-6 text-left text-white"
                >
                  <p className="font-black text-[20px] md:text-[32px] max-w-[480px] mb-3 md:leading-10 leading-6">
                    {text}
                  </p>
                  <p className="text-[16px] mb-0 font-bold opacity-50">
                    {author}
                  </p>
                </div>
              );
            })}
          </motion.div>
          <motion.div
            style={{ x: translateSecondLine }}
            className="m-auto flex w-[100%] md:px-0 flex-row justify-end items-center md:items-center"
          >
            {[
              {
                text: `“JourneyLog keeps me on track with the important but small stuff, like remembering to call my Grandma every week. She loves it, and so do I! 🤰🏼”`,
                author: "Emma from Berlin",
                color: `#397649`,
              },
              {
                text: `“I use it to track my tasks and progress on projects. Like a brag document! It’s simple, effective, and has become my secret weapon at work! 🚀”`,
                author: "Alex from London",
                color: `#35A351`,
              },
              {
                text: `Tracking things like skincare routines and taking time to read before bed. It’s great for staying accountable to myself. 🧴”`,
                author: "Olivia from Budapest",
                color: `#1F602F`,
              },
            ].map(({ text, author, color }, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="py-6 px-6 md:w-[560px] w-[300px] flex-shrink-0 rounded-[20px] bg-[#20B545] mx-3 mb-6 text-left text-white"
                >
                  <p className="font-black text-[20px] md:text-[32px] max-w-[480px] mb-3 md:leading-10 leading-6">
                    {text}
                  </p>
                  <p className="text-[16px] mb-0 font-bold opacity-50">
                    {author}
                  </p>
                </div>
              );
            })}
          </motion.div>
          <motion.div
            style={{ x: translateThirdLine }}
            className="m-auto flex w-[100%] md:px-0 flex-row justify-center items-center md:items-start"
          >
            {[
              {
                text: `“I log every step of my freelance projects and deadlines. It keeps me on track and stress-free. 📆”`,
                author: "Mason from Vancouver",
                color: `#35A351`,
              },
              {
                text: `“Using it to plan my hiking trips and track my progress toward summiting all the local peaks. It’s my adventure buddy! ⛰️”`,
                author: "Ella from Seattle",
                color: `#397649`,
              },
              {
                text: `“Using Journeylog as a normal notes tool. I just don't use notifications, it's to much for me 📝”`,
                author: "Ethan from New York",
                color: `#1F602F`,
              },
            ].map(({ text, author, color }, index) => {
              return (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="py-6 px-6 md:w-[560px] w-[300px] flex-shrink-0 rounded-[20px] bg-[#20B545] mx-3 mb-6 text-left text-white"
                >
                  <p className="font-black text-[20px] md:text-[32px] max-w-[480px] mb-3 md:leading-10 leading-6">
                    {text}
                  </p>
                  <p className="text-[16px] mb-0 font-bold opacity-50">
                    {author}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </section>

        <section
          id="pricing"
          className="justify-center items-center text-center md:w-[80%] m-auto md:px-10"
        >
          <h3 className="text-[40px] font-black mb-6 md:mb-36">Pricing</h3>
          <div className="flex items-center justify-center w-full">
            <div className="cards flex md:bg-[#1B1B1B] rounded-3xl w-full max-w-[900px] p-10 md:pr-5 lg:flex-row flex-col-reverse">
              <div className="text-left p-10 pr-14 mb-10 md:mb-0">
                <div className="text-[45px] flex relative font-black items-end mb-6">
                  $0
                  <span className="text-[18px] bottom-[10px] absolute left-[60px] font-normal text-[#656565]">
                    /month
                  </span>
                </div>

                <p className="text-[40px] font-black">Free</p>
                <p className="mb-8 max-w-[90%]">
                  For most people who want to define a new routine and chase it
                  consistently
                </p>
                <ul className="mb-14">
                  <li className="flex items-center justify-start my-3">
                    <svg
                      width="29"
                      height="36"
                      className="flex-shrink-0"
                      viewBox="0 0 29 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                        fill="#555555"
                      />
                      <path
                        d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                        fill="white"
                        stroke="white"
                      />
                    </svg>
                    <p className="ml-4">1 Journey at a time</p>
                  </li>
                  <li className="flex items-center justify-start my-3">
                    <svg
                      width="29"
                      height="36"
                      className="flex-shrink-0"
                      viewBox="0 0 29 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                        fill="#555555"
                      />
                      <path
                        d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                        fill="white"
                        stroke="white"
                      />
                    </svg>
                    <p className="ml-4">Unlimited logs</p>
                  </li>
                  <li className="flex items-center justify-start my-3">
                    <svg
                      width="29"
                      height="36"
                      className="flex-shrink-0"
                      viewBox="0 0 29 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                        fill="#555555"
                      />
                      <path
                        d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                        fill="white"
                        stroke="white"
                      />
                    </svg>
                    <p className="ml-4">Access to partial habit insights</p>
                  </li>
                </ul>
                <Button
                  className="bg-white text-[20px] w-full px-16 text-black font-black"
                  variant="solid"
                  size="lg"
                  onPress={(f) => {
                    handleChoosePlan(user?.id, "free");
                    // router.push(!!user ? "/app" : "/sign-in");
                  }}
                >
                  {!!user
                    ? subscription === "habit_creator"
                      ? "Downgrade plan"
                      : "Go to the app"
                    : "Try free"}
                  <ChevronRight className="md:mr-[-20px] shrink-0" />
                </Button>
              </div>
              <div className="proCard text-left relative overflow-hidden md:mt-[-100px] bg-[#343434] flex items-center justify-center rounded-[28px]">
                <div className="relative z-50 w-[100%] h-[100%] border-4 border-[rgba(0,0,0,0)] bg-clip-padding md:h-[100%] bg-[#272727] p-10 pr-14 pl-8 m-auto rounded-[28px]">
                  <div className="absolute top-[15px] right-[15px] bg-[#27DE55] rounded-xl py-2 px-3 text-[black] font-black">
                    {isPro ? "Already subscribed" : "Most popular"}
                  </div>

                  <div className="text-[45px] flex relative font-black items-end mb-6">
                    <div className="absolute text-[30px] top-[-15px] opacity-45 line-through">
                      $10
                    </div>
                    <p className="mt-5">$4.99</p>
                    <span className="text-[18px] bottom-[10px] absolute left-[130px] font-normal text-[#656565]">
                      /month
                    </span>
                  </div>

                  <p className="text-[40px] font-black text-[#27DE55] relative">
                    PRO
                  </p>
                  <p className="mb-8 max-w-[90%]">
                    For those who want to pursue goals in a disciplined manner
                    and who trust in the power of consistency
                  </p>
                  <ul className="mb-20">
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">Unlimited simultaneous Journeys</p>
                    </li>
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">Unlimited logs</p>
                    </li>
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">
                        Reminders via e-mail, SMS or Whatsapp
                      </p>
                    </li>
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">Custom support</p>
                    </li>
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">
                        Access to <strong>full</strong> habit insights
                      </p>
                    </li>
                    <li className="flex items-center justify-start my-3">
                      <svg
                        width="29"
                        height="36"
                        viewBox="0 0 29 36"
                        className="flex-shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.6655 23.6832C18.7457 24.1194 18.7859 24.4717 18.7859 24.7402C18.826 25.0086 18.8461 25.2771 18.8461 25.5455C18.8461 26.3844 18.7056 27.3743 18.4246 28.5153C18.1838 29.6562 17.7422 30.7467 17.1 31.787C16.4979 32.7937 15.675 33.6661 14.6313 34.4044C13.6278 35.1091 12.3433 35.4614 10.7778 35.4614C9.33273 35.4614 7.96795 35.1258 6.68344 34.4547C5.39894 33.75 4.25492 32.8608 3.2514 31.787C2.24788 30.6796 1.44507 29.4548 0.842957 28.1126C0.280986 26.7368 0 25.3778 0 24.0355C0 22.0892 0.140493 20.4282 0.421479 19.0524C0.742605 17.6431 1.18415 16.4183 1.74612 15.378C1.74612 15.2773 1.66584 15.1767 1.50528 15.076C1.38486 14.9753 1.32465 14.8411 1.32465 14.6733C1.32465 14.5055 1.50528 14.2874 1.86655 14.019C2.26795 13.7505 2.72957 13.4989 3.2514 13.264C3.81338 12.9955 4.35528 12.7774 4.87711 12.6096C5.43908 12.4083 5.86056 12.3076 6.14154 12.3076C6.3021 12.3076 6.56302 12.3747 6.92429 12.509C7.3257 12.6432 7.82745 12.7103 8.42957 12.7103C8.63027 12.7103 8.83097 12.6935 9.03168 12.66C9.23238 12.6264 9.45316 12.6096 9.694 12.6096C10.537 12.6096 11.4401 12.9452 12.4035 13.6163C13.407 14.2539 14.3303 15.0928 15.1732 16.133C16.0563 17.1733 16.7989 18.3645 17.401 19.7068C18.0433 21.0155 18.4648 22.3409 18.6655 23.6832ZM16.257 25.6462C16.257 25.0086 16.0965 24.1026 15.7753 22.9282C15.4542 21.7201 14.9725 20.5457 14.3303 19.4048C13.688 18.2303 12.9053 17.2068 11.982 16.3344C11.0989 15.4619 10.0954 15.0257 8.97147 15.0257C8.89119 15.0257 8.73062 15.0257 8.48978 15.0257C8.28907 14.9921 8.04823 14.9753 7.76724 14.9753C7.48626 14.9418 7.22534 14.925 6.9845 14.925C6.74365 14.8914 6.60316 14.8747 6.56302 14.8747C5.92077 14.8747 5.3588 15.1263 4.87711 15.6297C4.43556 16.133 4.05422 16.7874 3.73309 17.5927C3.45211 18.3981 3.23133 19.3209 3.07077 20.3611C2.91021 21.4013 2.82993 22.4416 2.82993 23.4818C2.82993 23.8509 2.95035 24.5724 3.19119 25.6462C3.43204 26.6864 3.85352 27.777 4.45563 28.9179C5.09788 30.0253 5.94084 31.0152 6.9845 31.8877C8.02816 32.7601 9.3528 33.1963 10.9584 33.1963C12.0422 33.1963 12.9253 32.9279 13.6077 32.391C14.2901 31.8205 14.812 31.1326 15.1732 30.3273C15.5746 29.5219 15.8556 28.6998 16.0162 27.8609C16.1767 26.9885 16.257 26.2502 16.257 25.6462Z"
                          fill="#555555"
                        />
                        <path
                          d="M11.755 27.4014L11.7643 27.3959L11.7734 27.3899C12.4092 26.9714 13.1427 26.3679 13.9712 25.5895L13.9712 25.5895L13.9744 25.5864C14.8226 24.7753 15.7334 23.8171 16.7065 22.7132L16.708 22.7115C17.6966 21.5794 18.705 20.3768 19.7334 19.1037L19.7335 19.1038L19.7401 19.0952C20.7385 17.8026 21.7145 16.4766 22.6682 15.1173L22.6683 15.1174L22.6747 15.1078C23.6163 13.6977 24.4758 12.3218 25.2529 10.98C26.4061 8.98882 27.2257 7.35893 27.6993 6.09855L27.6995 6.09861L27.7039 6.08587C28.1359 4.83496 28.402 3.82197 28.4824 3.06435L28.4836 3.05302L28.4843 3.04165C28.5068 2.66662 28.5059 2.3363 28.4764 2.05731C28.4489 1.79731 28.3927 1.54225 28.2772 1.33287C28.2157 1.19868 28.162 1.08734 28.1172 1.00336C28.0942 0.960218 28.0689 0.915369 28.0424 0.875394C28.0293 0.855636 28.0108 0.829271 27.9877 0.802061C27.9713 0.782823 27.9219 0.725831 27.8426 0.680151C27.4426 0.449919 27.0071 0.446634 26.5925 0.634656C26.2389 0.794992 25.9454 1.02972 25.7566 1.35573C25.6856 1.47825 25.6384 1.6259 25.603 1.76687C25.5656 1.91553 25.5331 2.09214 25.5041 2.29249C25.4532 2.6448 25.3482 3.13433 25.1843 3.76815C24.9917 4.37651 24.7109 5.14052 24.3397 6.06294C23.9404 6.96061 23.3875 8.02125 22.6777 9.24688C22.0399 10.3482 21.3287 11.4703 20.544 12.613C19.7266 13.7404 18.8874 14.8345 18.0265 15.8953C17.1645 16.9575 16.3234 17.9486 15.5032 18.8686C14.6523 19.7704 13.8753 20.5466 13.1719 21.1981C12.4666 21.8515 11.8739 22.3526 11.3916 22.7072C11.1746 22.8582 11.0173 22.9412 10.9128 22.979C10.839 22.8878 10.7347 22.7544 10.5987 22.5769C10.3139 22.2053 9.95529 21.7509 9.52349 21.2145C9.10011 20.6351 8.62233 20.0465 8.09078 19.4486C7.54487 18.8008 6.98058 18.1836 6.39787 17.5972C6.1352 17.3196 5.82833 17.0179 5.47827 16.6922C5.11518 16.3183 4.77309 15.9765 4.45209 15.6671C4.13091 15.3575 3.84622 15.0892 3.59837 14.8625L3.59845 14.8624L3.59045 14.8554C3.4513 14.7335 3.33592 14.6348 3.24569 14.5607C3.1672 14.4963 3.07795 14.4254 3.00495 14.3834C2.7202 14.2195 2.4034 14.099 2.08313 14.1242C1.72219 14.1525 1.44982 14.357 1.28125 14.648C1.06869 15.015 1.06318 15.4168 1.24964 15.7927C1.43666 16.1698 1.78103 16.7327 2.268 17.4679C2.75857 18.2086 3.31722 19.0082 3.94359 19.8666C4.53669 20.7039 5.16725 21.5834 5.83525 22.5048C6.50511 23.4289 7.12484 24.2625 7.69433 25.0056C8.25872 25.742 8.7542 26.3595 9.18009 26.8563C9.36129 27.1014 9.50344 27.2908 9.60545 27.4228C9.65707 27.4896 9.70124 27.5453 9.7363 27.5873C9.75344 27.6078 9.77227 27.6297 9.79096 27.6497L9.79102 27.6497C9.79296 27.6519 9.84807 27.7143 9.92589 27.7591C10.2168 27.9265 10.5461 27.9013 10.8215 27.8277C11.1058 27.7518 11.4197 27.6019 11.755 27.4014ZM10.8309 23.0009C10.831 23.0008 10.8324 23.0006 10.8351 23.0006C10.8322 23.001 10.8309 23.001 10.8309 23.0009Z"
                          fill="#39D353"
                          stroke="#39D353"
                        />
                      </svg>

                      <p className="ml-4">
                        Early access to <strong>future features</strong>
                      </p>
                    </li>
                  </ul>
                  <Button
                    className="bg-[#39D353] text-[20px] w-full px-16 text-black font-black"
                    variant="solid"
                    size="lg"
                    onPress={() => {
                      if (!!user && subscription === "habit_creator") {
                        router.push("/app");
                      } else if (!!user) {
                        handleChoosePlan(user?.id, "habit_creator");
                      } else {
                        router.push("/sign-in");
                      }
                    }}
                  >
                    {!!user
                      ? subscription === "habit_creator"
                        ? "Go to the app"
                        : "Choose plan"
                      : "Choose plan"}
                    <ChevronRight className="md:mr-[-20px] shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <motion.section
          id="freepass"
          className="items-center text-center mt-0 md:mt-24 md:my-[120px] w-[100%] m-auto flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          viewport={{ amount: 0.3, once: true }}
        >
          <div className="border-1 border-[#515151] w-[85%] md:w-[70%] max-w-[900px] rounded-3xl p-10">
            <h4 className="font-bold text-[25px] px-8 md:p-0 text-center md:text-left mb-4 text-[#ffffff]">
              How about upgrading to{" "}
              <span className="text-[#27DE55]">PRO for life?</span>
            </h4>
            <div className="flex-col md:flex-row md:flex items-center justify-center md:justify-between text-[#848484]">
              <p className="text-center md:text-left md:max-w-[70%] md:pr-10 mb-7 shrink-0 md:mb-0">
                Share how you built a new habit with Journeylog through photos,
                videos, logs, or however you like! If our team loves it, you’ll
                receive a lifetime PRO subscription.
              </p>
              <Link
                className="bg-[#fff] text-[16px] justify-center m-auto shrink-0 flex p-4 rounded-3xl text-[#171717] font-black"
                href="mailto:contact@cesarolvr.com"
              >
                Get PRO for life
                <ChevronRight className="mr-[-8px]" />
              </Link>
            </div>
          </div>
        </motion.section>
        <section
          id="faq"
          className="justify-center items-center text-center mt-20 md:mt-6 md:my-[150px] w-[100%]"
        >
          <h3 className="text-[40px] font-black mb-8">FAQ</h3>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            className="w-[95%] md:max-w-[900px] flex items-center justify-center m-auto"
          >
            <Accordion
              showDivider={false}
              selectionMode="multiple"
              itemClasses={{
                title: "text-[22px] md:text-[25px] text-left",
                content: "text-left text-[20px] py-2 pb-8 text-[#595959]",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Why would I use it?"
                title="Why would I use it?"
                className="rounded-[20px] px-8 py-2 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                It helps you build and maintain habits by logging your
                activities and tracking progress.
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="It's possible to create a habit using this app?"
                title="It's possible to create a habit using this app?"
                className="rounded-[20px] px-8 py-2 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                Yes, Journeylog is designed to help you develop and sustain
                habits with consistency.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Where and how can I use Journeylog?"
                title="Where and how can I use Journeylog?"
                className="rounded-[20px] px-8 py-2 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                You can use Journeylog on any device (Desktop, Mobile or WebApp
                saving in your home page). Just create an account and try it!
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="It's an app for iOS or Android?"
                title="It's an app for iOS or Android?"
                className="rounded-[20px] px-8 py-2 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                Currently, Journeylog is a web-based app, with future plans for
                mobile.
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="It's free?"
                title="It's free?"
                className="rounded-[20px] px-8 py-2 text-[30px] mb-5 bg-[#1B1B1B]"
              >
                Yes, there’s a free plan, but if you want more, there is an
                option to upgrade.
              </AccordionItem>
            </Accordion>
          </motion.div>
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
              isDisabled={isLoading}
              onValueChange={handleSuggestionForm}
              value={formContent}
            />
            <Button
              className="bg-white text-[20px] px-16 text-black font-black"
              variant="solid"
              isDisabled={isLoading || formContent?.length < 5}
              size="lg"
              onPress={submitForm}
            >
              {isLoading ? (
                <CircularProgress
                  size="sm"
                  className="switch-loader"
                  classNames={{
                    indicator: "stroke-[#ffffff]",
                  }}
                  aria-label="Loading..."
                />
              ) : (
                <>{buttonFormText}</>
              )}
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
