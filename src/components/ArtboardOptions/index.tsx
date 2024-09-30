"use client";

import { Button, Select, SelectItem, Switch } from "@nextui-org/react";
import classNames from "classnames";
import { Bell, IndentIncrease } from "lucide-react";
import React from "react";

const ArtboardOptions = ({ isOptionsOpened, setIsOptionsOpened }: any) => {
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
        <p className="mb-3">Journey’s settings</p>
        <ul className="flex w-full justify-between items-center py-2">
          <li className="border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]">
            <span className="text-3xl">Aa</span>
            <p className="text-[#5C5C5C] text-sm">Default</p>
          </li>
          <li className="border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]">
            <span className="text-3xl">Aa</span>
            <p className="text-[#5C5C5C] text-sm">Formal</p>
          </li>
          <li className="border-1 border-[#383838] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center cursor-pointer hover:bg-[#313131] h-[104px]">
            <span className="text-3xl">Aa</span>
            <p className="text-[#5C5C5C] text-sm">Mono</p>
          </li>
        </ul>
        <ul className="flex w-full justify-between items-center py-2 mb-4">
          <li className="border-1 border-[#383838] bg-[#171717] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]">
            <p className="text-[#5C5C5C] text-sm">Dark</p>
          </li>
          <li className="border-1 border-[#383838] bg-[#F3EDD1] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]">
            <p className="text-[#5C5C5C] text-sm">Light</p>
          </li>
          <li className="border-1 border-[#383838] bg-[#1E262D] px-4 py-6 rounded-2xl w-[30%] flex flex-col items-center justify-center cursor-pointer h-[104px]">
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
          <Switch defaultSelected aria-label="Automatic updates" />
        </div>
        <div className="flex mb-5 items-start">
          <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Reminders</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              As opposed to using 'Content here, content here', making it look
              like
            </p>
          </div>
          <Select
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="When?"
            className="max-w-[100px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <div className="flex mb-8 items-start">
          <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
          <div className="flex flex-col ml-4">
            <p className="text-[#aaaaaa]">Reminders</p>
            <p className="text-[#525252] text-sm max-w-[250px]">
              As opposed to using 'Content here, content here', making it look
              like
            </p>
          </div>
          <Select
            items={[{ key: "cat", label: "Cat" }]}
            placeholder="Where?"
            className="max-w-[100px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
        <p className="mb-4">Actions</p>
        <div>
          <p>
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="primary">
            Finish Journey
          </Button>
        </div>
        <div>
          <p>
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="default">
            Pause Journey
          </Button>
        </div>
        <div>
          <p>
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" color="danger">
            Delete Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArtboardOptions;
