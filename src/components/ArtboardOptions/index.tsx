"use client";

import {
  Button,
  CircularProgress,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import classNames from "classnames";
import {
  AlarmClock,
  Bell,
  CalendarClock,
  Clock9,
  IndentIncrease,
  MessageCircleQuestion,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
import { useTheme } from "next-themes";
import { DateTime } from "luxon";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({ subsets: ["latin"], weight: "400" });

const ArtboardOptions = ({
  isOptionsOpened,
  setIsOptionsOpened,
  handleJourneyDeletion,
  handleJourneyUpdate,
  isLoading,
  activeTab,
  notification,
  handleSwitchNotifications,
  setFont,
}: any) => {
  const [fontSelected, setFontSelected]: any = useState("default");
  const { theme, setTheme } = useTheme();

  const when = [
    { key: "daily", label: "Daily" },
    { key: "weekly", label: "Weekly" },
    { key: "monthly", label: "Monthly" },
  ];

  const whatTime = [
    { key: "0-key", label: "12 AM" },
    { key: "1-key", label: "1 AM" },
    { key: "2-key", label: "2 AM" },
    { key: "3-key", label: "3 AM" },
    { key: "4-key", label: "4 AM" },
    { key: "5-key", label: "5 AM" },
    { key: "6-key", label: "6 AM" },
    { key: "7-key", label: "7 AM" },
    { key: "8-key", label: "8 AM" },
    { key: "9-key", label: "9 AM" },
    { key: "10-key", label: "10 AM" },
    { key: "11-key", label: "11 AM" },
    { key: "12-key", label: "12 PM" },
    { key: "13-key", label: "01 PM" },
    { key: "14-key", label: "02 PM" },
    { key: "15-key", label: "03 PM" },
    { key: "16-key", label: "04 PM" },
    { key: "17-key", label: "05 PM" },
    { key: "18-key", label: "06 PM" },
    { key: "19-key", label: "07 PM" },
    { key: "20-key", label: "08 PM" },
    { key: "21-key", label: "09 PM" },
    { key: "22-key", label: "10 PM" },
    { key: "23-key", label: "11 PM" },
  ];
  const where = [
    { key: "email", label: "Email" },
    { key: "whatsapp", label: "Whatsapp" },
    { key: "sms", label: "SMS" },
  ];

  const nextScheduledDate = notification?.next_sent ? DateTime.fromISO(
    notification?.next_sent
  ).toLocaleString(DateTime.DATETIME_MED) : null;

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
        <br />
        <div className="flex mb-5 items-start justify-between">
          <div className="flex">
            <CalendarClock className="flex-shrink-0 stroke-[#A1A1AA]" />
            <div className="flex flex-col ml-4">
              <p className="text-[#aaaaaa]">Frequency</p>
              <p className="text-[#525252] text-sm max-w-[190px] mb-3">
                Define an ideal frequency for this habit. It will affects your
                graphs and also define the interval between reminders.
              </p>
            </div>
          </div>
          {activeTab?.frequency ? (
            <Select
              items={when}
              disallowEmptySelection={true}
              defaultSelectedKeys={[activeTab?.frequency]}
              color="default"
              className="max-w-[100px] select text-[11px]"
              onChange={(e) => handleSwitchNotifications(e, "when")}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          ) : null}
        </div>
        <p className="mb-6">Notifications</p>
        <div className="flex mb-5 items-start justify-between">
          <div className="flex">
            <Bell className="flex-shrink-0 stroke-[#A1A1AA]" />
            <div className="flex flex-col ml-4">
              <p className="text-[#aaaaaa]">Reminders</p>
              <p className="text-[#525252] text-sm max-w-[190px]">
                Turn on the reminders to be notified about your progress.
              </p>
            </div>
          </div>
          <Switch
            isSelected={!!notification ? true : false}
            isDisabled={isLoading ? true : false}
            thumbIcon={() => {
              return isLoading ? (
                <CircularProgress
                  size="sm"
                  className="switch-loader"
                  classNames={{
                    indicator: "stroke-[#39D353]",
                  }}
                  aria-label="Loading..."
                />
              ) : null;
            }}
            className="switch"
            aria-label="Automatic updates"
            onValueChange={(e) => handleSwitchNotifications(e, "turnon")}
          />
        </div>

        {!!notification ? (
          <div className="flex mb-5 items-start justify-between">
            <div className="flex">
              <Clock9 className="flex-shrink-0 stroke-[#A1A1AA]" />
              <div className="flex flex-col ml-4">
                <p className="text-[#aaaaaa]">What time?</p>
                <p className="text-[#525252] text-sm max-w-[190px] mb-3">
                  Choose what time you want to be reminded
                </p>
              </div>
            </div>
            <Select
              items={whatTime}
              disallowEmptySelection={true}
              defaultSelectedKeys={[
                `${DateTime.fromISO(notification?.next_sent)?.hour}-key`,
              ]}
              color="default"
              className="max-w-[100px] select text-[11px]"
              isDisabled={!!notification ? false : true}
              onChange={(e) => handleSwitchNotifications(e, "what")}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </div>
        ) : null}
        <div className="flex mb-3 items-start justify-between">
          <div className="flex">
            <MessageCircleQuestion className="flex-shrink-0 stroke-[#A1A1AA]" />
            <div className="flex flex-col ml-4">
              <p className="text-[#aaaaaa]">Alert me on</p>
              <p className="text-[#525252] text-sm max-w-[170px] mb-3">
                Choose where you would like to receive notifications.
              </p>
              {!!notification ? null : (
                <small
                  className="cursor-pointer text-[#878787] underline"
                  onClick={() => handleSwitchNotifications(true, "turnon")}
                >
                  Turn on the reminders
                </small>
              )}
            </div>
          </div>
          {!!notification ? (
            <Select
              items={where}
              disallowEmptySelection={true}
              disabledKeys={["sms", "whatsapp"]}
              defaultSelectedKeys={[notification.where]}
              color="default"
              className="max-w-[100px] select"
              isDisabled={!!notification ? false : true}
              onChange={(e) => handleSwitchNotifications(e, "where")}
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          ) : null}
        </div>
        {nextScheduledDate ? (
          <p className="cursor-pointer text-[#525252] text-[14px]">
            Next reminder:{" "}
            <span className="text-[white]">{nextScheduledDate}</span>
          </p>
        ) : null}
        <br />
        <br />
        <p className="mb-6">Actions</p>
        <div className="flex justify-between mb-4 items-center cursor-not-allowed">
          <p className="max-w-[150px] md:max-w-[200px] text-sm text-[#525252]">
            Habit created? So, it's time to finish this one and go to the next.
          </p>
          <Button variant="bordered" className="opacity-20" isDisabled color="primary">
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
            className="text-[#d4d4d8] opacity-20"
            isDisabled={true}
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
