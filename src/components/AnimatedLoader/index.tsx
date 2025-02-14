"use client";

import React, { useEffect } from "react";
import * as motion from "motion/react-client";
import { Progress } from "@nextui-org/react";

// Services
import { quotes } from "@/services";

const AnimatedLoader = () => {
  const [progress, setProgress] = React.useState(0);
  const [randomQuote, setRandomQuote] = React.useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1.5;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ height: "100vh" }}
      animate={{ height: 0 }}
      transition={{
        duration: 0.5,
        delay: 1.8,
        ease: "easeInOut",
      }}
      className="loader overflow-hidden pointer-events-none w-[100vw] z-[300] h-[100vh] fixed bottom-0 left-0 right-0 bg-[#171717]"
      style={{ clip: "rect(auto, auto, auto, auto)" }}
    >
      <div className="fixed flex-col inset-0 z-[400] w-full text-[#171717] m-auto flex items-start justify-center">
        <div className="w-[400px] max-w-[85%] m-auto">
          <p className="text-3xl mb-10 font-black">{randomQuote.text}</p>
          <p className="text-xl">- {randomQuote.author}</p>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100vh" }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
        className="left-0 right-0 bottom-auto top-0 relative bg-[#27DE55] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Progress
            aria-label="Loading..."
            className="w-full rounded-none fixed top-[0px] left-0 z-[401]"
            radius="none"
            color="success"
            showValueLabel={false}
            size="md"
            value={progress}
            classNames={{
              indicator:
                "bg-[#171717] ease-in-out z-[403] will-change-transform will-change-width",
              track: "bg-[#23ad45] w-full z-[402]",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLoader;
