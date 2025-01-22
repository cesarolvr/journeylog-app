"use client";

import React from "react";
import * as motion from "motion/react-client";
import { quotes } from "@/services";

const AnimatedLoader = () => {
  const [randomQuote, setRandomQuote] = React.useState({
    text: "",
    author: "",
  });

  React.useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <motion.div
      initial={{ height: "100vh" }}
      animate={{ height: 0 }}
      transition={{
        duration: 0.5,
        delay: 1,
        ease: "easeInOut",
      }}
      className="loader overflow-hidden pointer-events-none w-[100vw] z-[300] h-[100vh] fixed bottom-0 left-0 right-0 bg-[#171717]"
      style={{ clip: "rect(auto, auto, auto, auto)" }}
    >
      <div className="fixed flex-col inset-0 z-[400] w-[400px] max-w-[85%] text-[#171717] m-auto flex items-start justify-center">
        <p className="text-3xl mb-10 font-black">{randomQuote.text}</p>
        <p className="text-xl">- {randomQuote.author}</p>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100vh" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="left-0 right-0 bottom-auto top-0 h-[50%] bg-[#39D353]"
      ></motion.div>
    </motion.div>
  );
};

export default AnimatedLoader;
