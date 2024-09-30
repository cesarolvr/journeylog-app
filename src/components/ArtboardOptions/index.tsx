"use client";

import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import classNames from "classnames";
import {
  AlarmClock,
  Bell,
  IndentIncrease,
  MessageCircleQuestion,
} from "lucide-react";
import React, { useState } from "react";

import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({ subsets: ["latin"], weight: "400" });

const ArtboardOptions = ({
  isOptionsOpened,
  setIsOptionsOpened,
  handleJourneyDeletion,
  activeTab,
  setFont,
}: any) => {
  const [fontSelected, setFontSelected]: any = useState("default");
  const [backgroundSelected, setBackgroundSelected]: any = useState("dark");

  return (
    <div className="relative">
      <div
        className={classNames("fixed w-full h-full cursor-pointer z-[901]", {
          block: isOptionsOpened,
          hidden: !isOptionsOpened,
        })}
        onClick={() => {
          setIsOptionsOpened(!isOptionsOpened);
        }}
      ></div>

      <IndentIncrease
        onClick={() => {
          setIsOptionsOpened(!isOptionsOpened);
        }}
        className={classNames(
          "absolute right-[425px] cursor-pointer z-[903] top-28",
          {
            block: isOptionsOpened,
            hidden: !isOptionsOpened,
          }
        )}
      />

      <div
        className={classNames(
          "fixed w-[400px] h-full bg-[#1E1E1E] border-l-1 py-10 px-7 overflow-scroll border-[#303030] right-0 top-0 z-[902]",
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
              setFont({ class: reenie.className, code: 1 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]",
              {
                "border-[#6d6d6d] bg-[#313131] font-bold": fontSelected === "default",
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
              setFont({ class: nunito.className, code: 2 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]",
              {
                "border-[#6d6d6d] bg-[#313131] font-bold": fontSelected === "formal",
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
              setFont({ class: cutive.className, code: 3 });
            }}
            className={classNames(
              "border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]",
              {
                "border-[#6d6d6d] bg-[#313131] font-bold": fontSelected === "mono",
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
              setBackgroundSelected("dark");
            }}
            className={classNames(
              "border-1 border-[#383838] bg-[#171717] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]",
              {
                "border-[#6d6d6d] font-bold": backgroundSelected === "dark",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Dark</p>
          </li>
          <li
            onClick={() => {
              setBackgroundSelected("formal");
            }}
            className={classNames(
              "border-1 border-[#383838] bg-[#F3EDD1] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]",
              {
                "border-[#a29e8a] font-bold": backgroundSelected === "formal",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Light</p>
          </li>
          <li
            onClick={() => {
              setBackgroundSelected("mono");
            }}
            className={classNames(
              "border-1 border-[#383838] bg-[#1E262D] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]",
              {
                "border-[#a29e8a] font-bold": backgroundSelected === "mono",
              }
            )}
          >
            <p className="text-[#5C5C5C] text-sm">Blue</p>
          </li>
        </ul>
        <p className="mb-6">Notifications</p>
        <div className="flex mb-5 items-start">
          <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Reminders</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              As opposed to using 'Content here, content here', making it look
              like
            </p>
          </div>
          <Switch isDisabled={true} aria-label="Automatic updates" />
        </div>
        <div className="flex mb-5 items-start">
          <AlarmClock className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Remember me</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              As opposed to using 'Content here, content here', making it look
              like
            </p>
          </div>
          <Select
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="When?"
            className="max-w-[100px]"
            isDisabled={true}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <div className="flex mb-8 items-start">
          <MessageCircleQuestion className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Alert me on</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              As opposed to using 'Content here, content here', making it look
              like
            </p>
          </div>
          <Select
            isDisabled={true}
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="Where?"
            className="max-w-[100px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <p className="mb-6">Actions</p>
        <div className="flex justify-between mb-4 items-center">
          <p className="max-w-[200px] text-sm text-[#525252]">
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="primary" isDisabled>
            Finish Journey
          </Button>
        </div>
        <div className="flex justify-between mb-4 items-center">
          <p className="max-w-[200px] text-sm text-[#525252]">
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="default" isDisabled>
            Pause Journey
          </Button>
        </div>
        <div className="flex justify-between mb-4 items-center">
          <p className="max-w-[200px] text-sm text-[#525252]">
            Habit created? So, it's time to finish this one and go to the next.
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
