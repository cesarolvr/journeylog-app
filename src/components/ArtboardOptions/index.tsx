"use client";

import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import classNames from "classnames";
import {
  AlarmClock,
  Bell,
  IndentIncrease,
  MessageCircleQuestion,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
import { useTheme } from "next-themes";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({ subsets: ["latin"], weight: "400" });

const ArtboardOptions = ({
  isOptionsOpened,
  setIsOptionsOpened,
  handleJourneyDeletion,
  handleJourneyUpdate,
  activeTab,
  handleSwitchNotifications,
  setFont,
}: any) => {
  const [fontSelected, setFontSelected]: any = useState("default");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (activeTab?.theme) {
      setTheme(activeTab?.theme);
    }

    if (activeTab?.font) {
      setFontSelected(activeTab?.font);
    }
  }, [activeTab]);

  return (
    <div className="relative options-panel">
      <div
        className={classNames(
          "fixed w-full h-full cursor-pointer z-[44] bg-[black] md:bg-none backdrop-blur-sm md:backdrop-blur-none bg-opacity-20",
          {
            block: isOptionsOpened,
            hidden: !isOptionsOpened,
          }
        )}
        onClick={() => {
          setIsOptionsOpened(!isOptionsOpened);
        }}
      ></div>

      <div
        className={classNames(
          "close-options-button rounded-xl bg-[#2c2c2c] p-1 w-[50px] flex justify-center py-2 items-center flex-shrink-0 absolute md:right-[425px] right-[86%] cursor-pointer z-[46] top-28",
          {
            block: isOptionsOpened,
            hidden: !isOptionsOpened,
          }
        )}
      >
        <IndentIncrease
          onClick={() => {
            setIsOptionsOpened(!isOptionsOpened);
          }}
        />
      </div>

      <div
        className={classNames(
          "content fixed w-[400px] max-w-[85%] h-full bg-[#1E1E1E] border-l-1 py-10 px-5 md:px-7 overflow-scroll border-[#303030] right-0 top-0 z-[45]",
          {
            "right-0": isOptionsOpened,
            "right-[-500px]": !isOptionsOpened,
          }
        )}
      >
        <p className="mb-3">Theme</p>
        <ul className="flex w-full justify-between items-center py-2">
          <li
            onClick={() => {
              setFontSelected("default");
              handleJourneyUpdate({ font: "default" });
              setFont({ class: reenie.className, code: 1 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-4 md:py-6 justify-center rounded-2xl w-[31%] md:w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] md:h-[104px] h-[95px]",
              {
                "border-[#6d6d6d] bg-[#313131]": fontSelected === "default",
              }
            )}
          >
            <span
              className={classNames(`text-3xl scale-125 ${reenie.className}`)}
            >
              Aa
            </span>
            <p className="text-[#5C5C5C] text-sm">Default</p>
          </li>
          <li
            onClick={() => {
              setFontSelected("formal");
              handleJourneyUpdate({ font: "formal" });
              setFont({ class: nunito.className, code: 2 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-4 md:py-6 justify-center rounded-2xl w-[31%] md:w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] md:h-[104px] h-[95px]",
              {
                "border-[#6d6d6d] bg-[#313131]": fontSelected === "formal",
              }
            )}
          >
            <span className={classNames(`text-3xl ${nunito.className}`)}>
              Aa
            </span>
            <p className="text-[#5C5C5C] text-sm">Formal</p>
          </li>
          <li
            onClick={() => {
              setFontSelected("mono");
              handleJourneyUpdate({ font: "mono" });
              setFont({ class: cutive.className, code: 3 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-4 md:py-6 justify-center rounded-2xl w-[31%] md:w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] md:h-[104px] h-[95px]",
              {
                "border-[#6d6d6d] bg-[#313131]": fontSelected === "mono",
              }
            )}
          >
            <span className={classNames(`text-3xl ${cutive.className}`)}>
              Aa
            </span>
            <p className="text-[#5C5C5C] text-sm">Mono</p>
          </li>
        </ul>
        <ul className="flex w-full justify-between items-center py-2 mb-4">
          <li
            onClick={() => {
              setTheme("dark");
              handleJourneyUpdate({ theme: "dark" });
            }}
            className={classNames(
              "cursor-pointer border-1 border-[#383838] bg-[#171717] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center md:h-[104px] h-[95px]",
              {
                "border-[#6d6d6d]": theme === "dark",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Dark</p>
          </li>
          <li
            onClick={() => {
              setTheme("light");
              handleJourneyUpdate({ theme: "light" });
            }}
            className={classNames(
              "cursor-pointer border-1 border-[#383838] bg-[#F3EDD1] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center md:h-[104px] h-[95px]",
              {
                "border-[#a29e8a]": theme === "light",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Light</p>
          </li>
          <li
            onClick={() => {
              // handleJourneyUpdate({theme: "blue"});
            }}
            className={classNames(
              "opacity-30 border-1 border-[#383838] bg-[#1E262D] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-not-allowed md:h-[104px] h-[95px]",
              {
                "border-[#a29e8a]": theme === "blue",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Blue</p>
          </li>
        </ul>
        <p className="mb-6">Notifications</p>
        <div className="flex mb-5 items-start cursor-not-allowed">
          <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Reminders</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              Turn on the reminders to be notified about your progress.
            </p>
          </div>
          <Switch
            className="switch"
            aria-label="Automatic updates"
            onValueChange={handleSwitchNotifications}
          />
        </div>
        <div className="flex mb-5 items-start cursor-not-allowed">
          <AlarmClock className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Remember me</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              Define a good interval between notifications. Try not to forget
              but not to be flooded.
            </p>
          </div>
          <Select
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="When?"
            color="default"
            className="max-w-[100px] select"
            isDisabled={true}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <div className="flex mb-8 items-start cursor-not-allowed">
          <MessageCircleQuestion className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Alert me on</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              Choose where you would like to receive notifications.
            </p>
          </div>
          <Select
            isDisabled={true}
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="Where?"
            className="max-w-[100px] select"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <p className="mb-6">Actions</p>
        <div className="flex justify-between mb-4 items-center cursor-not-allowed">
          <p className="max-w-[150px] md:max-w-[200px] text-sm text-[#525252]">
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="primary" isDisabled>
            Finish Journey
          </Button>
        </div>
        <div className="flex justify-between mb-4 items-center cursor-not-allowed">
          <p className="max-w-[150px] md:max-w-[200px] text-sm text-[#525252]">
            Do you want to take a break and keep your streak alive? Just pause
            it.
          </p>
          <Button
            variant="bordered"
            color="default"
            className="text-[#d4d4d8]"
            isDisabled
          >
            Pause Journey
          </Button>
        </div>
        <div className="flex justify-between mb-4 items-center">
          <p className="max-w-[150px] md:max-w-[200px] text-sm text-[#525252]">
            Delete this Journey and all it’s logs if it doesn't make more sense.
          </p>
          <Button
            variant="bordered"
            color="danger"
            onClick={() => {
              handleJourneyDeletion(activeTab);
            }}
          >
            Delete Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtboardOptions;
