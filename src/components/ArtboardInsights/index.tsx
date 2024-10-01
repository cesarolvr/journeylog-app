"use client";

import { Select, SelectItem } from "@nextui-org/react";
import classNames from "classnames";
import Calendar from "react-github-contribution-calendar";
import { Share, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

const ArtboardInsights = ({
  isInsightsOpened,
  setIsInsightsOpened,
  getInsights,
  activeTab,
}: any) => {
  const [frequency, setFrequency] = useState({});

  useEffect(() => {
    const triggerGetInsights = async () => {
      const res = await getInsights(2024, activeTab?.id);
      let object: any = {};

      res.forEach((item: any) => {
        object[item.created_at.split("T")[0]] = 10;
      });
      console.log(object);
      setFrequency(object);
    };
    if (isInsightsOpened) {
      triggerGetInsights();
    }
  }, [isInsightsOpened]);

  const today = DateTime.now().toUTC().toJSDate();
  const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
  const dayWithPad = `0${today.getDate()}`.slice(-2);
  const initialDateSelected = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

  return (
    <div className="relative">
      <div
        className={classNames(
          "fixed w-full h-full cursor-pointer z-[901] bg-[black] md:bg-none backdrop-blur-sm md:backdrop-blur-none bg-opacity-20",
          {
            block: isInsightsOpened,
            hidden: !isInsightsOpened,
          }
        )}
        onClick={() => {
          setIsInsightsOpened(!isInsightsOpened);
        }}
      ></div>

      <div
        className={classNames(
          "rounded-xl bg-[#2c2c2c] p-1 w-[50px] flex justify-center py-2 items-center flex-shrink-0 absolute md:right-[570px] right-[87%] cursor-pointer z-[903] top-10",
          {
            block: isInsightsOpened,
            hidden: !isInsightsOpened,
          }
        )}
        onClick={() => {
          setIsInsightsOpened(!isInsightsOpened);
        }}
      >
        <X />
      </div>

      <div
        className={classNames(
          "fixed w-[550px] max-w-[85%] h-full bg-[#1E1E1E] border-l-1 py-10 px-7 overflow-scroll border-[#303030] right-0 top-0 z-[902]",
          {
            "right-0": isInsightsOpened,
            "right-[-600px]": !isInsightsOpened,
          }
        )}
      >
        <div className="flex justify-between">
          <p className="mb-3">Insights</p>
          <Share className="opacity-25 cursor-not-allowed" />
        </div>

        <div>
          <ul className="flex justify-start">
            <li className="flex justify-center items-center flex-col p-4 py-8 text-[#fff]">
              <p className="text-5xl font-bold">22</p>
              <span>Days streak</span>
            </li>
            <li className="flex justify-center items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <p className="text-5xl font-bold">54</p>
              <span>Journey's days</span>
            </li>
            <li className="flex justify-center items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <p className="text-5xl font-bold">Tue</p>
              <span>Busiest days</span>
            </li>
          </ul>
        </div>
        <div className="pb-8">
          <div className="flex justify-between mb-6 items-center">

          <p>Frequency</p>
          <Select
            isDisabled={true}
            items={[{ key: "2024", label: "2024" }]}
            placeholder="2024"
            className="max-w-[100px]"
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
          </div>
          <Calendar values={frequency} until={initialDateSelected} />
        </div>
        <div>
          <p>Habit consistency</p>
          <span>Last 30 days</span>
        </div>
        <div>
          <p>Habit density</p>
          <span>Last 7 days</span>
        </div>
      </div>
    </div>
  );
};

export default ArtboardInsights;
