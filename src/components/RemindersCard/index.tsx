"use client";

import { useState } from "react";
import * as motion from "motion/react-client";
import { useInView } from "react-intersection-observer";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { Bell, Clock9, MessageCircleQuestion } from "lucide-react";
import { useMotionValue, useTransform } from "framer-motion";

// Custom hook
import useArtboardOptions from "../ArtboardOptions/hook";

const RemindersCard = () => {
  const [remindersTurnOn, _] = useState(false);

  const { whatTime, where } = useArtboardOptions();

  const { ref: remindersRef, inView: remindersRefInView } = useInView({
    threshold: 0.5,
  });

  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [40, -40]); // Reversed values
  const rotateY = useTransform(cardX, [-300, 300], [-40, 40]); // Reversed values

  const handleMouseMove = (event: any) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;

    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <div
      ref={remindersRef}
      className="flex cardItemParent justify-center items-center w-[100vw] my-8 md:my-0 flex-col md:flex-row"
    >
      <motion.div
        style={{
          perspective: 1200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
        }}
        className="flex-col md:flex-row md:w-[100vh] md:h-[100vh]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 1, once: true }}
          className="text-[25px] w-[100%] md:w-[50%] flex justify-end flex-shrink-0 md:text-[30px] p-6 max-w-[70%] md:max-w-none text-center md:text-left"
        >
          <h3 className="md:w-[300px] md:pr-16 mb-4 md:mb-0">
            And setup reminders to keep you moving
          </h3>
        </motion.div>
        <motion.div
          style={{
            height: "100%",
            transformStyle: "preserve-3d",
            perspective: 1200,
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            rotateX,
            rotateY,
            transition: "transform 0.1s linear",
          }}
          className="flex-shrink-0 w-[90%] md:w-[50%]"
          transition={{ velocity: 0 }}
        >
          <motion.div className="bg-[#1B1B1B] w-[400px] max-w-[90%] cardItem px-7 md:px-11 py-14 m-auto md:m-0 rounded-[40px]">
            <p className="mb-8">Notifications</p>
            <div className="flex mb-8 items-start justify-between">
              <div className="flex">
                <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
                <div className="flex flex-col ml-4">
                  <p className="text-[#aaaaaa]">Reminders</p>
                  <p className="text-[#525252] text-sm max-w-[180px] mt-1">
                    Turn on the reminders to be notified about your progress.
                  </p>
                </div>
              </div>
              <Switch
                isSelected={remindersTurnOn}
                className="switch"
                aria-label="Automatic updates"
                onValueChange={(f) => f}
              />
            </div>
            <div className="flex mb-8 items-start justify-between">
              <div className="flex">
                <Clock9 className="flex-shrink-0 stroke-[#A1A1AA]" />
                <div className="flex flex-col ml-4">
                  <p className="text-[#aaaaaa]">What time?</p>
                  <p className="text-[#525252] text-sm max-w-[180px] mt-1 mb-3">
                    Choose what time you want to be reminded
                  </p>
                </div>
              </div>
              <Select
                items={whatTime}
                disallowEmptySelection={true}
                defaultSelectedKeys={[`0-key`]}
                color="default"
                autoFocus={false}
                className="max-w-[100px] select text-[11px]"
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
            <div className="flex mb-0 items-start justify-between">
              <div className="flex">
                <MessageCircleQuestion className="flex-shrink-0 stroke-[#A1A1AA]" />
                <div className="flex flex-col ml-4">
                  <p className="text-[#aaaaaa]">Alert me on</p>
                  <p className="text-[#525252] text-sm max-w-[180px] mt-1 mb-3">
                    Choose where you would like to receive notifications.
                  </p>
                </div>
              </div>
              <Select
                items={where}
                disallowEmptySelection={true}
                defaultSelectedKeys={[`email`]}
                color="default"
                className="max-w-[100px] select text-[11px]"
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RemindersCard;
