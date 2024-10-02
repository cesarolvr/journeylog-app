"use client";

import { Select, SelectItem } from "@nextui-org/react";
import classNames from "classnames";
import { Share, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";

import "cal-heatmap/cal-heatmap.css";

const ArtboardInsights = ({
  isInsightsOpened,
  setIsInsightsOpened,
  getInsights,
  activeTab,
}: any) => {
  const [frequency, setFrequency] = useState([]);
  console.log(frequency);

  const beginning = DateTime.fromISO(frequency[frequency.length - 1]?.date);
  const now = DateTime.fromJSDate(new Date());
  const diffInDays = beginning.diff(now, "days");
  const daysFromTheBeginning = Math.round(diffInDays?.toObject()?.days * -1);

  useEffect(() => {
    const triggerGetInsights = async () => {
      const res = await getInsights(2024, activeTab?.id);

      const newRes = res.map((item: any) => {
        return {
          date: item.created_at.split("T")[0],
          value: Math.round((item?.content?.length || 0) / 150),
        };
      });
      setFrequency(newRes);
    };
    if (isInsightsOpened) {
      triggerGetInsights();
    }
  }, [isInsightsOpened]);

  // const today = DateTime.now().toUTC().toJSDate();
  // const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
  // const dayWithPad = `0${today.getDate()}`.slice(-2);
  // const initialDateSelected = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

  useEffect(() => {
    if (frequency.length === 0 && !isInsightsOpened) return;
    const cal = new CalHeatmap();
    cal.paint(
      {
        data: {
          source: frequency,
          type: "json",
          x: "date",
          y: "value",
        },
        date: { start: new Date("2024-01-01"), max: new Date("2024-10-15") },
        range: 12,
        theme: "dark",
        scale: {
          color: {
            type: "threshold",
            range: ["#626262", "#515e54", "#4d6551", "#468A51", "#39D353"],
            domain: [2, 4, 6, 8, 10],
          },
        },
        domain: {
          type: "month",
          gutter: 4,
          label: { text: "MMM", textAlign: "start", position: "top" },
        },
        subDomain: {
          type: "ghDay",
          radius: 2,
          width: 27,
          height: 27,
          gutter: 5,
        },
      },
      [
        [
          Tooltip,
          {
            text: function (date: any, value: any, dayjsDate: any) {
              return (
                (value ? value : "No") +
                " logs on " +
                dayjsDate.format("dddd, MMMM D, YYYY")
              );
            },
          },
        ],
        [
          CalendarLabel,
          {
            width: 35,
            textAlign: "end",
            text: () => {
              return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (d, i) => d
              );
            },

            padding: [25, 10, 0, 0],
          },
        ],
      ]
    );
  }, [frequency]);

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
          "fixed w-[550px] max-w-[85%] h-full bg-[#1E1E1E] border-l-1 py-10 overflow-scroll border-[#303030] right-0 top-0 z-[902]",
          {
            "right-0": isInsightsOpened,
            "right-[-600px]": !isInsightsOpened,
          }
        )}
      >
        <div className="flex justify-between px-7">
          <p className="mb-3">Insights</p>
          <Share className="opacity-25 cursor-not-allowed" />
        </div>

        <div className="px-7">
          <ul className="flex justify-start">
            <li className="flex justify-center items-center flex-col p-4 py-8 pl-0 text-[#fff]">
              <p className="text-5xl font-bold">22</p>
              <span>Days in a row</span>
            </li>
            <li className="flex justify-center items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <p className="text-5xl font-bold">{frequency.length}</p>
              <span>Days with logs</span>
            </li>
            <li className="flex justify-center items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <p className="text-5xl font-bold">{daysFromTheBeginning}</p>
              <span>Days since it started</span>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="flex justify-between mb-3 px-7 items-center">
            <p>Frequency</p>
            <Select
              isDisabled={true}
              items={[{ key: "2024", label: "2024" }]}
              placeholder="2024"
              className="max-w-[100px] text-[18px]"
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="w-full overflow-scroll pl-7 pr-8 mb-9">
            <div className="flex">
              {isInsightsOpened ? (
                <div id="cal-heatmap" className="mr-6 flex-shrink-0"></div>
              ) : null}

              <div className="w-[50px] h-[200px] flex-shrink-0"></div>
            </div>
          </div>
        </div>
        <div className="mb-10 px-7">
          <div className="flex justify-between mb-6 items-center">
            <p>Habit consistency</p>
            <span className="text-[#656565]">Last 30 days</span>
          </div>
          <div className="bg-[#2b2b2b] w-full h-[180px] rounded-3xl flex justify-center items-center text-[#656565]">
            Soon...
          </div>
        </div>
        <div className="px-7">
          <div className="flex justify-between mb-6 items-center">
            <p>Habit density</p>
            <span className="text-[#656565]">Last 7 days</span>
          </div>
          <div className="bg-[#2b2b2b] w-full h-[180px] rounded-3xl flex justify-center items-center text-[#656565]">
            Soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtboardInsights;
