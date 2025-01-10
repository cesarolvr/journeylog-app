import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reenie_Beanie } from "next/font/google";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

const SecondIllustration = () => {
  const [isToRunConfetti, setIsToRunConfetti] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, text: "supermarket", checked: true },
    { id: 2, text: "report to boss", checked: true },
    { id: 3, text: "water the fern", checked: true },
    { id: 4, text: "make dinner", checked: false },
  ]);

  const notify = () => toast("Wow! Today was a perfect day 🎉");

  const handleCheck = (e: any, value: any, index: any) => {
    e.preventDefault();
    const listItem = e.target.closest("li");
    listItem.classList.toggle("editor-listitem-checked");
    listItem.classList.toggle("editor-listitem-unchecked");

    let newOptions = [...options];
    newOptions[index].checked = value;
    setOptions(newOptions);

    const isEveryChecked = options.every((item) => item.checked === true);

    if (isEveryChecked) {
      setIsToRunConfetti(true);
      notify();
    } else {
      setIsToRunConfetti(false);
    }
  };

  return (
    <>
      {isToRunConfetti && (
        <Confetti
          width={window?.innerWidth}
          height={window?.innerHeight}
          recycle={false}
          tweenDuration={5000}
          colors={["#27DE54", "#5FDB7D", "#3D6D49", "#fff"]}
          className="!z-50 !fixed pointer-events-none"
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 1, once: true }}
        className={`mx-12 !w-[378px] !h-[400px] bg-[#1b1b1b] !flex !justify-center editor-container !p-5 !rounded-[50px]`}
      >
        <ul className={`${reenie.className} text-[50px] leading-[70px] !pl-4`}>
          {options.map((option, index) => (
            <li
              key={option.id}
              role="checkbox"
              className={`cursor-pointer !mb-0 editor-listitem editor-listitem-${
                option.checked ? "checked" : "unchecked"
              } ltr`}
              aria-checked={option.checked}
              onClick={(e) => handleCheck(e, !option.checked, index)}
            >
              <span>{option.text}</span>
            </li>
          ))}
          {/* <li role="checkbox" className="!mb-0 editor-listitem editor-listitem-checked ltr" aria-checked="true"><span>supermarket</span></li>
        <li role="checkbox" className="!mb-0 editor-listitem editor-listitem-checked ltr" aria-checked="true"><span>report to boss</span></li>
        <li role="checkbox" className="!mb-0 editor-listitem editor-listitem-checked ltr" aria-checked="true"><span>water the fern</span></li>
        <li role="checkbox" className="!mb-0 editor-listitem editor-listitem-unchecked ltr" aria-checked="false"><span>make dinner</span></li> */}
        </ul>
      </motion.div>
    </>
  );
};

export default SecondIllustration;
