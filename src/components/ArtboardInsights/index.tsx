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

  const lastTirtyDays = Array.from(Array(31).keys());
  const lastTirtyDaysFormatted = lastTirtyDays.map((item, index) => {
    const currentDate = DateTime.fromJSDate(new Date())
      .set({ hour: 0, minute: 0, second: 0 })
      .minus({ day: 30 - index })
      .toUTC()
      .toISO();

    const sameDaySelected = frequency.find(({ date, value }, index) => {
      const currentLoopItem = currentDate?.split("T")[0];
      if (currentLoopItem === date)
        return {
          date,
          value,
        };
    });

    if (sameDaySelected) {
      return { index: item, date: currentDate, value: sameDaySelected?.value };
    }

    return { index: item, date: currentDate };
  });

  const lastSevenDays = Array.from(Array(8).keys());
  const lastSevenDaysFormatted = lastSevenDays.map((item, index) => {
    const currentDate = DateTime.fromJSDate(new Date())
      .set({ hour: 0, minute: 0, second: 0 })
      .minus({ day: 7 - index })
      .toUTC()
      .toISO();

    const sameDaySelected = frequency.find(({ date, value }, index) => {
      const currentLoopItem = currentDate?.split("T")[0];
      if (currentLoopItem === date)
        return {
          date,
          value,
        };
    });

    if (sameDaySelected) {
      return { index: item, date: currentDate, value: sameDaySelected?.value };
    }

    return { index: item, date: currentDate };
  });

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
                  String(daysInARow).padStart(2, "0")
                ) : (
                  <CircularProgress className="mb-2" aria-label="Loading..." />
                )}
              </div>
              <span>Days in a row</span>
            </li>
            <li className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-5xl font-bold">
                {frequency?.length ? (
                  String(frequency?.length).padStart(2, "0")
                ) : (
                  <CircularProgress className="mb-2" aria-label="Loading..." />
                )}
              </div>
              <span>Days with logs</span>
            </li>
            <li className="flex justify-center items-center flex-shrink-0 flex-col p-4 py-8 text-[#5C5C5C]">
              <div className="text-5xl font-bold">
                {daysFromTheBeginning ? (
                  String(daysFromTheBeginning).padStart(2, "0")
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
                  {/* <div id="cal-heatmap" className="mr-6 flex-shrink-0"></div>
                  <div className="w-[50px] h-[270px] flex-shrink-0"></div> */}
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
          <div className="w-full mb-16 px-7 relative">
            {isPro ? (
              <ul className="flex w-full gap-1 justify-between relative overflow-visible">
                {lastTirtyDaysFormatted.map(({ value, date }, index) => {
                  const dayFormatted = new Date(date)?.getDate();
                  return (
                    <li
                      key={index}
                      className={`w-full relative p-[1px] h-[80px] bg-[#3E3E3E] rounded-lg overflow-visible`}
                    >
                      <span className="absolute bottom-[-20px] md:bottom-[-30px] text-[10px] md:text-[14px] left-0 right-0 text-center justify-center opacity-40 m-auto inline-flex">
                        <p>{dayFormatted % 2 ? dayFormatted : null}</p>
                      </span>
                      <span
                        className={classNames(
                          "bg-[#27DE55] absolute w-full bottom-0 left-0 right-0 h-full rounded-lg",
                          {
                            "opacity-0": !value,
                            "opacity-25": value && value > 0,
                            "opacity-50": value && value > 4,
                            "opacity-75": value && value > 10,
                          }
                        )}
                      ></span>
                    </li>
                  );
                })}
              </ul>
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
              <ul className="flex w-full justify-between relative gap-2">
                {lastSevenDaysFormatted.map(({ value, date }, index) => {
                  const dayFormatted = new Date(date)?.getDate();
                  return (
                    <li
                      key={index}
                      className={`relative rounded-lg p-[5px] w-full h-[196px] bg-[#3E3E3E] overflow-hidden`}
                    >
                      <span className="absolute top-[10px] left-0 right-0 w-full text-center opacity-40">
                        {dayFormatted}
                      </span>
                      <div
                        className={classNames(
                          "bg-[#27DE55] absolute w-full bottom-0 left-0 right-0 rounded-lg",
                          {
                            "h-0": !value,
                            "h-1/4": value && value > 0,
                            "h-2/4": value && value > 4,
                            "h-3/4": value && value > 10,
                            "h-4/4": value && value > 15,
                          }
                        )}
                      >
                        <span className="absolute top-[10px] left-0 right-0 m-auto font-black text-[#3E3E3E] w-full text-center">
                          {value ? value : null}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
