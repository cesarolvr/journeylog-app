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
          `<li className="!mb-0">call mom</li>
          <li className="!mb-0">homework</li>
          <li className="!mb-0">workout</li>
          <li className="!mb-0">daily fruit</li>
          <li className="!mb-0">drink water</li>`,
        ],
        typeSpeed: 40,
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
      className={`mx-12 !w-[358px] !h-[400px] bg-[#1b1b1b] editor-container !p-10 !rounded-[50px]`}
    >
      <ul
        ref={refList}
        className={`${reenie.className} text-[50px] leading-[55px] !pl-4`}
      ></ul>
    </motion.div>
  );
};

export default FirstIllustration;
