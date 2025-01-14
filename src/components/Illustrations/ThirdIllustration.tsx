import React, { useState } from "react";
import { motion } from "framer-motion";
import { Reenie_Beanie } from "next/font/google";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

const ThirdIllustration = () => {
  const [isToRunConfetti, setIsToRunConfetti] = useState(false);
  const [isListBlock, setIsListBlock] = useState(false);
  const [options, setOptions] = useState([
    { id: 1, text: "supermarket", checked: true },
    { id: 2, text: "report to boss", checked: true },
    { id: 3, text: "water the fern", checked: true },
    { id: 4, text: "make dinner", checked: false },
  ]);

  const notify = () => toast("Mission accomplished for today!  🚀");

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
      setIsListBlock(true);
    } else {
      setIsToRunConfetti(false);
      setIsListBlock(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 1, once: true }}
      className={`mx-12 !w-[378px] !h-auto bg-[#1b1b1b] !flex !justify-center editor-container !p-8 !rounded-[50px]`}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        viewport={{ amount: 1, once: true }}
        className="text-md mt-3 text-[#888888] mb-4"
      >
        Last 7 days
      </motion.h2>
      <div className="w-full">
        {[
          { day: "Mon", text: "No time invested", value: 0 },
          { day: "Tue", text: "Good", value: 1 },
          { day: "Wed", text: "Well done!", value: 4 },
          { day: "Thu", text: "Nice", value: 2 },
          { day: "Fri", text: "You rock it! 🚀", value: 5 },
          { day: "Sat", text: "Nice", value: 2 },
          { day: "Sun", text: "Great", value: 3 },
        ].map(({ day, text, value }, index) => {
          const colorRange = [
            "#59665C",
            "#60865b",
            "#4e8850",
            "#418450",
            "#27DE54",
          ];
          const colorIndex = Math.min(value - 1, colorRange.length - 1);
          const backgroundColor = colorRange[colorIndex];
          const width = `${value * 20}%`; // Calculate width based on value
          return (
            <div className="flex items-center my-3" key={day}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: index / 6,
                }}
                viewport={{ amount: 1, once: true }}
                className="w-14 text-[#888888] mr-4 text-right"
              >
                {day}
              </motion.span>
              <div className="bg-[#2C2C2C] w-full rounded-lg overflow-hidden relative h-[45px]">
                <motion.div
                  className={`h-full rounded-lg`}
                  style={{ backgroundColor, width }}
                  initial={{ width: 0 }}
                  whileInView={{ width: width }}
                  transition={{
                    duration: 0.8,
                    delay: index / 6,
                    ease: "circOut",
                  }}
                  viewport={{ amount: 1, once: true }}
                ></motion.div>
                <motion.span
                  className="absolute right-[10px] top-0 bottom-0 h-full z-50 flex items-center"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: value > 4 ? 1 : Math.max(0.2, value / 5),
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index / 6,
                  }}
                  viewport={{ amount: 1, once: true }}
                  style={{
                    fontSize: value > 4 ? "14px" : "12px",
                    color: value > 4 ? "#376831" : "white",
                    fontWeight: value > 0 ? "bold" : "normal",
                  }}
                >
                  {text}
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ThirdIllustration;
