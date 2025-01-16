import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reenie_Beanie } from "next/font/google";
import Typed from "typed.js";
import { useInView } from "react-intersection-observer";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

const FirstIllustration = () => {
  const [typedInstance, setTypedInstance]: any = useState(null);
  const refList = useRef(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) return;
    if (!typedInstance) {
      const typed = new Typed(refList.current, {
        strings: [
          `<li>call my mom</li>
          <li>check homework</li>
          <li>to workout</li>
          <li>daily fruit</li>
          <li>2L of water</li>`,
          `<li>daily journal</li>
          <li>8 book pages</li>
          <li>5 min meditation</li>
          <li>dutch new word</li>
          <li>act of gratitude</li>`,
        ],
        typeSpeed: 100,
        loop: false,
        startDelay: 500,
        showCursor: false,
      });

      setTypedInstance(typed);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 1, once: true }}
      className={`mx-12 !w-[388px] !h-[450px] max-w-[85%] bg-[#1b1b1b] editor-container lp !p-8 md:!p-10 !rounded-[50px]`}
    >
      <ul
        ref={refList}
        className={`${reenie.className} text-[40px] md:text-[45px] h-full leading-[40px] !pl-0`}
      ></ul>
    </motion.div>
  );
};

export default FirstIllustration;
