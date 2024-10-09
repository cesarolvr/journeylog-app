"use client";

import { CircularProgress, Select, SelectItem } from "@nextui-org/react";
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
  isLoading,
  subscriptionInfo,
  previewList,
}: any) => {
  const [frequency, setFrequency] = useState([]);
  const [daysInARow, setDaysInARow] = useState(0);
  const [callHeatmap, setCallHeatmap] = useState(null);
  const [callHeatmap2, setCallHeatmap2] = useState(null);
  const [callHeatmap3, setCallHeatmap3] = useState(null);

  const beginning = DateTime.fromISO(frequency[frequency.length - 1]?.date);
  const now = DateTime.fromJSDate(new Date());
  const diffInDays = beginning.diff(now, "days");
  const daysFromTheBeginning = Math.round(diffInDays?.toObject()?.days * -1);

  const { subscription } = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  const getDaysInARow = () => {
    let acc = 0;

    frequency.sort((prev, current): any => {
      const currentDate = DateTime.fromJSDate(new Date(current?.date));
      const prevDate = DateTime.fromJSDate(new Date(prev?.date));
      const diffInMonths = currentDate.diff(prevDate, "days")?.toObject();
      if (diffInMonths?.days < 2) {
        acc++;
      }
    });

    return acc;
  };

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

  useEffect(() => {
    if (!isInsightsOpened && callHeatmap) {
      callHeatmap.destroy();
    }
  }, [isInsightsOpened]);

  const currentMonth = new Date().getMonth();

  // Graph 1
  useEffect(() => {
    if (frequency.length === 0 && !isInsightsOpened && !callHeatmap) return;
    const cal = new CalHeatmap();
    setCallHeatmap(cal);
    cal.paint(
      {
        data: {
          source: frequency,
          type: "json",
          x: "date",
          y: "value",
        },
        date: {
          start: new Date("2024-01-01"),
          max: new Date(),
          end: new Date(),
          highlight: [new Date()],
        },
        range: currentMonth + 1 > 4 ? currentMonth + 1 : 12,
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
          gutter: 6,
          label: { text: "MMM", textAlign: "start", position: "bottom" },
        },
        subDomain: {
          type: "ghDay",
          radius: 5,
          width: 27,
          height: 27,
          gutter: 6,
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

            padding: [0, 10, 0, 0],
          },
        ],
      ]
    );

    const timeout = setTimeout(() => {
      const todayElement = document.querySelector("#cal-heatmap .highlight");
      if (todayElement) {
        todayElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "start",
        });
      }
    }, 2000);
    const days = getDaysInARow();
    days && setDaysInARow(days);

    return () => {
      clearTimeout(timeout);
    };
  }, [frequency]);

  const lastTirtyDays = Array.from(Array(30).keys());
  const lastSevenDays = Array.from(Array(7).keys());

  return (
    <div className="relative insights-panel">
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
          "close-insights-button rounded-xl bg-[#2c2c2c] p-1 w-[50px] flex justify-center py-2 items-center flex-shrink-0 absolute md:right-[570px] right-[85%] cursor-pointer z-[903] top-10",
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
          "content fixed w-[550px] max-w-[83%] h-full bg-[#1E1E1E] border-l-1 py-10 overflow-y-scroll border-[#303030] right-0 top-0 z-[902]",
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

        <div className="">
          <ul className="flex justify-start w-full overflow-scroll">
            <li className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 pl-0 text-[#fff] ml-7">
              <div className="text-5xl font-bold">
                {daysInARow ? (
                  daysInARow
                ) : (
                  <CircularProgress className="mb-2" aria-label="Loading..." />
                )}
              </div>
              <span>Days in a row</span>
            </li>
            <li className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-5xl font-bold">
                {frequency?.length ? (
                  frequency?.length
                ) : (
                  <CircularProgress className="mb-2" aria-label="Loading..." />
                )}
              </div>
              <span>Days with logs</span>
            </li>
            <li className="flex justify-center items-center flex-shrink-0 flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-5xl font-bold">
                {daysFromTheBeginning ? (
                  daysFromTheBeginning
                ) : (
                  <CircularProgress className="mb-2" aria-label="Loading..." />
                )}
              </div>
              <span>Days since it started</span>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="flex justify-between mb-6 px-7 items-center">
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
          <div className="w-full overflow-scroll pl-7 pr-8 mb-7">
            <div className="flex">
              {isInsightsOpened && !isLoading ? (
                <>
                  <div id="cal-heatmap" className="mr-6 flex-shrink-0"></div>
                  <div className="w-[50px] h-[270px] flex-shrink-0"></div>
                </>
              ) : (
                <div className="flex items-center bg-[#2b2b2b] h-[200px] w-full justify-center rounded-3xl">
                  <CircularProgress aria-label="Loading..." />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-10 relative">
          <div className="flex px-7 justify-between mb-6 items-center">
            <p>Habit consistency</p>
            <span className="text-[#656565]">Last 30 days</span>
          </div>
          <div className="w-full mb-7 overflow-scroll px-7 relative">
            {isPro ? (
              <>Graph</>
            ) : (
              <>
                <div className="feature-locker absolute inset-0 mx-7 z-50 rounded-lg bg-[rgba(30, 30, 30, 0.6))] flex items-center justify-center backdrop-blur-lg	 border-[#444444]">
                  <p className="font-black">
                    Unlock with <span className="text-[#27DE55]"> PRO</span>
                  </p>
                </div>
                <ul className="flex w-full justify-between relative">
                  {lastTirtyDays.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={`rounded-lg p-[5px] mx-[2px] h-[80px] bg-[#27DE55] opacity-25`}
                      ></li>
                    );
                  })}
                </ul>
              </>
            )}

            <div className="w-[50px] flex-shrink-0"></div>
          </div>
        </div>
        <div className="px-7">
          <div className="flex justify-between mb-6 items-center">
            <p>Habit density</p>
            <span className="text-[#656565]">Last 7 days</span>
          </div>
          <div className="w-full mb-7 relative">
            {isPro ? (
              <>Graph</>
            ) : (
              <>
                <div className="feature-locker absolute inset-0 mx-7 z-50 rounded-lg bg-[rgba(30, 30, 30, 0.6))] flex items-center justify-center backdrop-blur-lg	 border-[#444444]">
                  <p className="font-black">
                    Unlock with <span className="text-[#27DE55]"> PRO</span>
                  </p>
                </div>
                <ul className="flex w-full justify-between">
                  {lastSevenDays.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="w-[63px] rounded-lg p-[5px] mx-[2px] h-[196px] bg-[#27DE55] opacity-15"
                      ></li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtboardInsights;
