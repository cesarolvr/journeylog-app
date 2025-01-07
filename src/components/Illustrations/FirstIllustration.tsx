import React from "react";
import { motion } from "framer-motion";

const FirstIllustration = () => {
  // Animações com Framer Motion
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay entre os filhos
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 558 695"
      fill="none"
      initial="hidden"
      animate="visible"
      variants={container}
      className="mx-12"
      width={358}
    >
      <motion.rect
        width="558"
        height="695"
        rx="60"
        fill="#1B1B1B"
        variants={item}
      />
      <motion.path
        d="M92.0549 148.36C92.0549 149.093 91.4316 149.827 90.1849 150.56C89.0116 151.22 87.6549 151.807 86.1149 152.32C84.5749 152.833 83.1083 153.273 81.7149 153.64C80.3216 153.933 79.4416 154.08 79.0749 154.08C77.7549 154.08 76.8383 154.007 76.3249 153.86C75.8849 153.713 75.4816 153.237 75.1149 152.43C74.8949 152.137 74.6749 151.807"
        stroke="#fff"
        strokeWidth="2"
        variants={item}
      />
      {/* Adicione mais elementos aqui, aplicando animação */}
    </motion.svg>
  );
};

export default FirstIllustration;
