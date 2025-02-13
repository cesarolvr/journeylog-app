"use client";

import { CircularProgress } from "@nextui-org/react";
import * as motion from "motion/react-client";
import classNames from "classnames";
import { Share, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";

import "cal-heatmap/cal-heatmap.css";
import { EMPTY_STATE } from "../Editor";
import dynamic from "next/dynamic";

const ArtboardInsights = ({
  isInsightsOpened,
  setIsInsightsOpened,
  getInsights,
  activeTab,
  isLoading,
  subscriptionInfo,
  previewList,
  onOpenModal,
  setDefaultPanel,
}: any) => {
  const [frequency, setFrequency]: any = useState(null);
  const [daysInARow, setDaysInARow]: any = useState(null);
  const [callHeatmap, setCallHeatmap] = useState(null);

  const isWeekly = activeTab?.frequency === "weekly";
  const isDaily = activeTab?.frequency === "daily";
  const isMonthly = activeTab?.frequency === "monthly";

  const beginning = DateTime.fromISO(
    frequency ? frequency[frequency?.length - 1]?.date : ""
  );
  const now = DateTime.fromJSDate(new Date());

  const diffInDays: any = beginning.diff(
    now,
    isDaily ? "days" : isMonthly ? "months" : "weeks"
  );

  const filteredDaysLogs =
    frequency?.reduce((a: any, v: any) => ({ ...a, [v.date]: v }), {}) || {};

  const filteredMonthsLogs =
    frequency?.reduce((a: any, v: any) => {
      const keyname = DateTime.fromJSDate(new Date(v.date)).toUTC();
      return { ...a, [`${keyname.year}-${keyname.month}`]: v };
    }, {}) || {};

  const filteredWeeksLogs =
    frequency?.reduce((a: any, v: any) => {
      const keyname = DateTime.fromJSDate(new Date(v.date)).toUTC();
      return { ...a, [`${keyname.year}-${keyname.weekNumber}-week`]: v };
    }, {}) || {};

  const daysWithLogs = isDaily
    ? Object.keys(filteredDaysLogs)?.length
    : isMonthly
    ? Object.keys(filteredMonthsLogs)?.length
    : Object.keys(filteredWeeksLogs)?.length;

  const daysFromTheBeginning =
    Math.round(
      diffInDays?.values?.[isDaily ? "days" : isMonthly ? "months" : "weeks"]
    ) * -1;

  const { subscription } = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  // console.log('aaaa')

  const getDaysInARow = () => {
    let acc = 1;
    let accObj = isMonthly ? {} : { 0: DateTime.local() };

    const reversedList = frequency?.toReversed();

    if (!frequency || frequency.length === 0) {
      acc = 0;
      return 0;
    }

    if (isDaily) {
      if (reversedList.length > 1) {
        reversedList?.forEach((prev: any, index: any): any => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const currentDate = DateTime.fromJSDate(
            new Date(current?.date)
          ).toUTC();
          const prevDate = DateTime.fromJSDate(new Date(prev?.date)).toUTC();

          const diff: any = currentDate.diff(prevDate, "days")?.toObject();
          const diffInDays = diff?.days * -1;

          if (diffInDays === 1) {
            acc++;
          } else if (diffInDays > 1) {
            acc = 1;
          }

          const isLastItem =
            reversedList.indexOf(prev) === reversedList.length - 1;

          if (isLastItem) {
            const isTodayOrYesterday =
              prevDate.toISODate() === DateTime.local().toISODate() ||
              prevDate.toISODate() ===
                DateTime.local().minus({ days: 1 }).toISODate();
            if (!isTodayOrYesterday) {
              acc = 0;
            }
          }

          return 0;
        });
      } else if (reversedList.length === 1) {
        const isToday = reversedList[0]?.date === DateTime.local().toISODate();
        if (isToday) {
          acc = 1;
        } else {
          acc = 0;
        }
      }
    } else if (isWeekly) {
      if (reversedList.length > 1) {
        reversedList.forEach((prev: any, index: any) => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const currentDate = DateTime.fromJSDate(
            new Date(current?.date)
          ).toLocal();

          const prevDate = DateTime.fromJSDate(new Date(prev?.date)).toLocal();
          const diff: any = currentDate.diff(prevDate, "weeks")?.toObject();
          const diffInWeeks = diff?.weeks * -1;
          const isToday =
            DateTime.fromJSDate(new Date(prev?.date)).localWeekNumber ===
              DateTime.local().localWeekNumber ||
            DateTime.fromJSDate(new Date(current?.date)).localWeekNumber ===
              DateTime.local().localWeekNumber;
          const isLastItemInARow =
            reversedList.indexOf(prev) === reversedList.length - 1;

          const dateAToAeAdded = DateTime.fromJSDate(new Date(prev?.date));
          const dateBToBeAdded = DateTime.fromJSDate(new Date(current?.date));

          if (diffInWeeks <= 1) {
            accObj[dateBToBeAdded.localWeekNumber] = dateBToBeAdded;

            if (isLastItemInARow && isToday) {
              accObj[dateAToAeAdded.localWeekNumber] = dateAToAeAdded;
            }
          } else {
            if (isToday) {
              accObj[dateBToBeAdded.localWeekNumber] = dateBToBeAdded;
            }
          }
        });
      } else {
        const isToday = reversedList[0]?.date === DateTime.local().toISODate();
        if (isToday) {
          accObj[1] = DateTime.local();
        } else {
          accObj = [];
        }
      }
    } else if (isMonthly) {
      if (reversedList.length > 1) {
        reversedList.forEach((prev, index) => {
          if (index === 0) return 0;
          const current = reversedList[index - 1];

          const currentDate = DateTime.fromJSDate(
            new Date(current?.date)
          ).toLocal();
          const prevDate = DateTime.fromJSDate(new Date(prev?.date)).toLocal();
          const diff: any = currentDate.diff(prevDate, "months")?.toObject();

          const aMonth = DateTime.fromJSDate(new Date(prev?.date)).month;
          const bMonth = DateTime.fromJSDate(new Date(current?.date)).month;
          const diffInMonths = Math.abs(aMonth - bMonth);

          const isTodaysMonth =
            (aMonth === DateTime.local().month &&
              aMonth === DateTime.local().year) ||
            (bMonth === DateTime.local().month &&
              bMonth === DateTime.local().year);

          const isLastItemInARow =
            reversedList.indexOf(prev) === reversedList.length - 1;

          const dateAToBeAdded = DateTime.fromJSDate(new Date(prev?.date));
          const dateBToBeAdded = DateTime.fromJSDate(new Date(current?.date));

          if (diffInMonths <= 1) {
            accObj[dateBToBeAdded.month] = dateBToBeAdded;

            if (isLastItemInARow && isTodaysMonth) {
              accObj[dateAToBeAdded.month] = dateAToBeAdded;
            }
          } else {
            if (isTodaysMonth) {
              accObj[dateBToBeAdded.month] = dateBToBeAdded;
            }
          }

          return -1;
        });
      } else {
        const isTodaysMonth =
          reversedList[0]?.date === DateTime.local().toISODate();
        if (isTodaysMonth) {
          accObj[1] = DateTime.local();
        }
      }

      console.log(acc, accObj);
    }

    return isDaily ? acc : Object.keys(accObj).length;
  };

  useEffect(() => {
    const triggerGetInsights = async () => {
      const res = await getInsights(new Date().getFullYear(), activeTab?.id);

      const newRes = res
        .map((item: any) => {
          const localDate = DateTime.fromJSDate(new Date(item?.created_at))
            .toLocal()
            .toISODate();
          return {
            date: localDate,
            value: Math.round((item?.content?.length || 0) / 150),
            content: item?.content,
            empty: item?.content === EMPTY_STATE,
          };
        })
        .filter((item: any) => !item?.empty);

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

  useEffect(() => {
    const element = document.querySelector("#cal-heatmap");
    if (frequency?.length === 0 && !isInsightsOpened && !callHeatmap) return;

    if (element) {
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
            start: new Date(`${new Date().getFullYear()}-01-01`),
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
    }

    const days: any = getDaysInARow();

    typeof days === "number" && setDaysInARow(days);
  }, [frequency]);

  const getLastDaysConsistency: any = {
    daily: {
      days: Array.from(Array(31).keys()),
      text: "Last 30 days",
      value: 31,
    },
    weekly: {
      days: Array.from(Array(12).keys()),
      text: "Last 12 weeks",
      value: 12,
    },
    monthly: {
      days: Array.from(Array(12).keys()),
      text: "Last 12 months",
      value: 12,
    },
  };

  const lastDaysConsistency =
    getLastDaysConsistency[activeTab?.frequency]?.days || [];

  const lastDatesFormatted = lastDaysConsistency.map(
    (item: any, index: any) => {
      const currentDate = DateTime.fromJSDate(new Date())
        .minus(
          isDaily
            ? { day: 30 - index }
            : isWeekly
            ? { week: 11 - index }
            : { month: 11 - index }
        )
        .toUTC()
        .toISO();

      const sameDaySelected = frequency
        ? frequency?.find(({ date, value }: any) => {
            const currentLoopSlot = `${
              DateTime.fromJSDate(new Date(currentDate)).toUTC().day
            }-${DateTime.fromJSDate(new Date(currentDate)).toUTC().month}`;

            const currentLoopItem = `${
              DateTime.fromJSDate(new Date(date)).toUTC().day
            }-${DateTime.fromJSDate(new Date(date)).toUTC().month}`;

            if (currentLoopSlot === currentLoopItem)
              return {
                date,
                value,
              };
          })
        : null;

      const sameMonthSelected = frequency
        ? frequency?.find(({ date }: any) => {
            const currentLoopSlot = DateTime.fromJSDate(
              new Date(currentDate)
            ).toLocal();

            const currentLoopItem = DateTime.fromJSDate(new Date(date)).toUTC();

            if (
              currentLoopSlot.month === currentLoopItem.month &&
              currentLoopSlot.year === currentLoopItem.year
            ) {
              return {
                date: DateTime.fromJSDate(new Date(date)).toUTC(),
                value: currentLoopItem,
              };
            }
          })
        : null;

      const sameWeekSelected = frequency
        ? frequency?.find(({ date }: any) => {
            const currentLoopSlot = DateTime.fromJSDate(
              new Date(currentDate)
            ).toLocal();

            const currentLoopItem = DateTime.fromJSDate(new Date(date)).toUTC();
            if (
              currentLoopSlot.localWeekNumber ===
                currentLoopItem.localWeekNumber &&
              currentLoopSlot.month === currentLoopItem.month &&
              currentLoopSlot.year === currentLoopItem.year
            ) {
              return {
                date: DateTime.fromJSDate(new Date(date)).toUTC(),
                value: currentLoopItem,
              };
            }
          })
        : null;

      if (isDaily && sameDaySelected) {
        return {
          index: item,
          date: currentDate,
          value: sameDaySelected?.value,
          day: DateTime.fromJSDate(new Date(currentDate)).toUTC().day,
        };
      }

      if (isMonthly && sameMonthSelected) {
        return {
          index: item,
          date: currentDate,
          value: 11,
          month: DateTime.fromJSDate(new Date(currentDate)).toUTC().month,
        };
      }

      if (isWeekly && sameWeekSelected) {
        return {
          index: item,
          date: currentDate,
          value: 10,
          week: DateTime.fromJSDate(new Date(currentDate)).toUTC().weekNumber,
        };
      }

      return { index: item, date: currentDate };
    }
  );

  const getLastDaysDensity: any = {
    daily: {
      days: Array.from(Array(7).keys()),
      text: "Last 7 days",
      value: 31,
    },
  };

  const lastDaysDensity = getLastDaysDensity[activeTab?.frequency]?.days || [];

  const lastSevenDaysFormatted = lastDaysDensity.map((item, index) => {
    const currentDate = DateTime.fromJSDate(new Date())
      .set({ hour: 0, minute: 0, second: 0 })
      .minus({ day: 6 - index })
      .toUTC()
      .toISO();

    const sameDaySelected = frequency
      ? frequency?.find(({ date, value }, index) => {
          const currentLoopItem = currentDate?.split("T")[0];
          if (currentLoopItem === date)
            return {
              date,
              value,
            };
        })
      : null;

    if (sameDaySelected) {
      return { index: item, date: currentDate, value: sameDaySelected?.value };
    }

    return { index: item, date: currentDate };
  });

  const OnboardingInsights = dynamic(() => import("../OnboardingInsights"), {
    ssr: false,
  });

  return (
    <>
      <OnboardingInsights isInsightsOpened={isInsightsOpened} />

      <div className="relative insights-panel">
        <div
          className={classNames(
            "fixed w-full h-full cursor-pointer z-[44] bg-[black] md:bg-none backdrop-blur-sm md:backdrop-blur-none bg-opacity-20",
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
            "close-insights-button rounded-xl bg-[#2c2c2c] p-1 w-[50px] flex justify-center py-2 items-center flex-shrink-0 absolute md:right-[570px] right-[85%] cursor-pointer z-[46] top-10",
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
            "content fixed w-[550px] max-w-[83%] h-full bg-[#1E1E1E] border-l-1 pb-10 pt-3 overflow-y-scroll border-[#303030] right-0 top-0 z-[45]",
            {
              "right-0": isInsightsOpened,
              "right-[-600px]": !isInsightsOpened,
            }
          )}
        >
          <div className="flex justify-between px-7 pt-4 pb-3 sticky top-[-15px] bg-[#1E1E1E] z-[45]">
            <p className="text-[#39d353] text-md bg-[#2c2c2c] px-3 py-2 rounded-[15px] border-[1px] border-[#39d353]">
              {activeTab?.name}
            </p>
            <Share className="opacity-25 cursor-not-allowed" />
          </div>

          <div className="">
            <ul
              key={isInsightsOpened}
              className="inarow flex justify-start w-full overflow-scroll"
            >
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5, once: true }}
                className="flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 pl-0 text-[#fff] ml-7"
              >
                <div className="text-5xl font-bold">
                  {typeof daysInARow === "number" ? (
                    String(daysInARow).padStart(daysInARow === 0 ? 1 : 2, "0")
                  ) : (
                    <CircularProgress
                      className="mb-2"
                      aria-label="Loading..."
                    />
                  )}
                </div>
                <span>
                  {isDaily ? "Days" : isWeekly ? "Weeks" : "Months"} in a row
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5, once: true }}
                transition={{ delay: 0.1 }}
                className=" flex justify-center flex-shrink-0 items-center flex-col p-4 py-8 text-[#5C5C5C]"
              >
                <div className="text-5xl font-bold">
                  {typeof daysWithLogs === "number" ? (
                    isNaN(daysWithLogs) ? (
                      0
                    ) : (
                      String(daysWithLogs).padStart(
                        daysWithLogs > 0 ? 2 : 1,
                        "0"
                      )
                    )
                  ) : (
                    <CircularProgress
                      className="mb-2"
                      aria-label="Loading..."
                    />
                  )}
                </div>
                <span>
                  {isDaily ? "Days" : isWeekly ? "Weeks" : "Months"} with logs
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.5, once: true }}
                transition={{ delay: 0.2 }}
                className=" flex justify-center items-center flex-shrink-0 flex-col p-4 py-8 text-[#5C5C5C]"
              >
                <div className="text-5xl font-bold">
                  {frequency ? (
                    isNaN(daysFromTheBeginning) ? (
                      0
                    ) : (
                      String(daysFromTheBeginning).padStart(2, "0")
                    )
                  ) : (
                    <CircularProgress
                      className="mb-2"
                      aria-label="Loading..."
                    />
                  )}
                </div>
                <span>
                  {isDaily ? "Days" : isWeekly ? "Weeks" : "Months"} since it
                  started
                </span>
              </motion.li>
            </ul>
          </div>
          <div className="frequency-item">
            <div className="flex justify-between mb-6 px-7 items-center">
              <p className="">Frequency</p>
            </div>
            <div className="w-full overflow-scroll pl-7 pr-8 mb-7">
              <div className=" flex">
                {isInsightsOpened && !isLoading ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 0.5, once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <div
                        id="cal-heatmap"
                        className="mr-6 flex-shrink-0"
                      ></div>
                    </motion.div>
                    <div id="weekly-graph" className="mr-6 flex-shrink-0"></div>
                    <div className="w-[50px] h-[270px] flex-shrink-0"></div>
                  </>
                ) : (
                  <div className="flex items-center bg-[#2b2b2b] h-[270px] w-full justify-center rounded-3xl">
                    <CircularProgress aria-label="Loading..." />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="consistency mb-12 relative">
            <div className="flex px-7 justify-between mb-3 items-center">
              <p>Habit consistency</p>
              <span className="text-[#656565]">
                {getLastDaysConsistency[activeTab?.frequency]?.text}
              </span>
            </div>
            {isPro ? (
              <div className="w-full mb-16 px-7 relative">
                <ul
                  className="flex w-full gap-[3px] justify-between relative overflow-visible"
                  key={isInsightsOpened}
                >
                  {lastDatesFormatted.map(
                    ({ value, date, ...item }: any, index: any) => {
                      const label = isDaily
                        ? new Date(date as any)?.getDate()
                        : isMonthly
                        ? DateTime.fromJSDate(new Date(date as any))?.toLocal()
                            .month
                        : DateTime.fromJSDate(new Date(date as any))?.toLocal()
                            .localWeekNumber;

                      return (
                        <li
                          key={index}
                          className={`w-full relative p-[1px] h-[80px] bg-[#3E3E3E] rounded-lg overflow-visible`}
                        >
                          <span className="absolute bottom-[-20px] md:bottom-[-30px] text-[10px] md:text-[14px] left-0 right-0 text-center justify-center opacity-40 m-auto inline-flex">
                            {isDaily ? (
                              <p>{label % 2 ? label : null}</p>
                            ) : (
                              <p>{label}</p>
                            )}
                          </span>
                          {value === 0 ? (
                            <span
                              className={classNames(
                                "bg-[#27DE55] absolute w-full bottom-0 opacity-0 left-0 right-0 h-full rounded-lg"
                              )}
                            ></span>
                          ) : (
                            <motion.span
                              initial={{ opacity: 0 }}
                              whileInView={{
                                opacity: value
                                  ? value > 10
                                    ? 0.75
                                    : value > 4
                                    ? 0.5
                                    : value > 0
                                    ? 0.25
                                    : 0
                                  : 0,
                              }}
                              viewport={{ amount: 1, once: true }}
                              transition={{
                                delay: (daysWithLogs * index) / 200,
                              }}
                              className={classNames(
                                "bg-[#27DE55] absolute w-full bottom-0 left-0 right-0 h-full rounded-lg"
                              )}
                            ></motion.span>
                          )}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            ) : (
              <div className="w-full h-[150px] mb-16 px-7 relative flex justify-center items-center">
                <div className="feature-locker absolute inset-0 z-40 rounded-xl bg-[rgba(30, 30, 30, 1))] flex items-center justify-center backdrop-blur-[15px]">
                  <p
                    className="absolute cursor-pointer bottom-[-20px] right-7 text-[14px] flex items-center font-black"
                    onClick={() => {
                      setIsInsightsOpened(false);
                      onOpenModal();
                      setDefaultPanel("subscription");
                    }}
                  >
                    Unlock with{" "}
                    <span className="text-[#27DE55] ml-1"> PRO </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-move-right ml-2 stroke-[#5c5c5c]"
                    >
                      <path d="M18 8L22 12L18 16" />
                      <path d="M2 12H22" />
                    </svg>
                  </p>
                </div>
                <svg
                  width="515"
                  className="w-full"
                  height="97"
                  viewBox="0 0 515 97"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.23771e-05 5C1.28725e-05 2.23858 2.23859 -4.78704e-08 5.00001 0L8.65467 6.33549e-08C11.4161 1.11225e-07 13.6547 2.23858 13.6547 5L13.6546 74C13.6546 76.7614 11.4161 79 8.65465 79H4.99999C2.23857 79 -4.9534e-07 76.7614 0 74L1.23771e-05 5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M129.719 5C129.719 2.23858 131.958 -4.68888e-08 134.719 2.19234e-09L138.374 6.71496e-08C141.135 1.16231e-07 143.374 2.23858 143.374 5L143.374 74C143.374 76.7614 141.135 79 138.374 79H134.719C131.958 79 129.719 76.7614 129.719 74L129.719 5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M259.438 5C259.438 2.23858 261.677 -4.68888e-08 264.438 2.19234e-09L268.093 6.71496e-08C270.855 1.16231e-07 273.093 2.23858 273.093 5V74C273.093 76.7614 270.855 79 268.093 79H264.438C261.677 79 259.438 76.7614 259.438 74V5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M389.157 5C389.157 2.23858 391.396 -4.68888e-08 394.157 2.19234e-09L397.812 6.71496e-08C400.574 1.16231e-07 402.812 2.23858 402.812 5V74C402.812 76.7614 400.574 79 397.812 79H394.157C391.396 79 389.157 76.7614 389.157 74V5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M18.5313 5C18.5313 2.23858 20.7698 -1.19514e-08 23.5313 8.02272e-08L27.1859 2.02223e-07C29.9473 2.94401e-07 32.1859 2.23858 32.1859 5L32.1859 74C32.1859 76.7614 29.9473 79 27.1859 79H23.5313C20.7698 79 18.5313 76.7614 18.5313 74L18.5313 5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M148.251 5C148.251 2.23858 150.489 -1.19514e-08 153.251 8.02272e-08L156.905 2.02223e-07C159.667 2.94401e-07 161.905 2.23858 161.905 5L161.905 74C161.905 76.7614 159.667 79 156.905 79H153.25C150.489 79 148.25 76.7614 148.25 74L148.251 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M277.97 5C277.97 2.23858 280.208 -1.19514e-08 282.97 8.02272e-08L286.624 2.02223e-07C289.386 2.94401e-07 291.624 2.23858 291.624 5V74C291.624 76.7614 289.386 79 286.624 79H282.97C280.208 79 277.97 76.7614 277.97 74V5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M407.689 5C407.689 2.23858 409.928 -1.19514e-08 412.689 8.02272e-08L416.344 2.02223e-07C419.105 2.94401e-07 421.344 2.23858 421.344 5V74C421.344 76.7614 419.105 79 416.344 79H412.689C409.928 79 407.689 76.7614 407.689 74V5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M37.0625 5C37.0625 2.23858 39.3011 -1.12302e-08 42.0625 8.18382e-08L45.7172 2.05011e-07C48.4786 2.9808e-07 50.7172 2.23858 50.7172 5L50.7172 74C50.7172 76.7614 48.4786 79 45.7172 79H42.0625C39.3011 79 37.0625 76.7614 37.0625 74L37.0625 5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M166.782 5C166.782 2.23858 169.02 -1.12302e-08 171.782 8.18382e-08L175.436 2.05011e-07C178.198 2.9808e-07 180.436 2.23858 180.436 5L180.436 74C180.436 76.7614 178.198 79 175.436 79H171.782C169.02 79 166.782 76.7614 166.782 74L166.782 5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M296.501 5C296.501 2.23858 298.74 -1.12302e-08 301.501 8.18382e-08L305.156 2.05011e-07C307.917 2.9808e-07 310.156 2.23858 310.156 5V74C310.156 76.7614 307.917 79 305.156 79H301.501C298.74 79 296.501 76.7614 296.501 74V5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M426.22 5C426.22 2.23858 428.459 -1.12302e-08 431.22 8.18382e-08L434.875 2.05011e-07C437.636 2.9808e-07 439.875 2.23858 439.875 5V74C439.875 76.7614 437.636 79 434.875 79H431.22C428.459 79 426.22 76.7614 426.22 74V5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M111.188 5C111.188 2.23858 113.427 -1.12302e-08 116.188 8.18382e-08L119.843 2.05011e-07C122.604 2.9808e-07 124.843 2.23858 124.843 5L124.843 74C124.843 76.7614 122.604 79 119.843 79H116.188C113.427 79 111.188 76.7614 111.188 74L111.188 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M240.907 5C240.907 2.23858 243.146 -1.12302e-08 245.907 8.18382e-08L249.562 2.05011e-07C252.323 2.9808e-07 254.562 2.23858 254.562 5L254.562 74C254.562 76.7614 252.323 79 249.562 79H245.907C243.146 79 240.907 76.7614 240.907 74L240.907 5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M370.626 5C370.626 2.23858 372.865 -1.12302e-08 375.626 8.18382e-08L379.281 2.05011e-07C382.042 2.9808e-07 384.281 2.23858 384.281 5V74C384.281 76.7614 382.042 79 379.281 79H375.626C372.865 79 370.626 76.7614 370.626 74V5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M500.345 5C500.345 2.23858 502.584 -1.12302e-08 505.345 8.18382e-08L509 2.05011e-07C511.761 2.9808e-07 514 2.23858 514 5V74C514 76.7614 511.761 79 509 79H505.345C502.584 79 500.345 76.7614 500.345 74V5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M55.5938 5C55.5938 2.23858 57.8323 -1.12302e-08 60.5938 8.18382e-08L64.2484 2.05011e-07C67.0098 2.9808e-07 69.2484 2.23858 69.2484 5L69.2484 74C69.2484 76.7614 67.0098 79 64.2484 79H60.5938C57.8323 79 55.5938 76.7614 55.5938 74L55.5938 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M185.313 5C185.313 2.23858 187.552 -1.12302e-08 190.313 8.18382e-08L193.968 2.05011e-07C196.729 2.9808e-07 198.968 2.23858 198.968 5L198.968 74C198.968 76.7614 196.729 79 193.968 79H190.313C187.552 79 185.313 76.7614 185.313 74L185.313 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M315.032 5C315.032 2.23858 317.271 -1.12302e-08 320.032 8.18382e-08L323.687 2.05011e-07C326.448 2.9808e-07 328.687 2.23858 328.687 5V74C328.687 76.7614 326.448 79 323.687 79H320.032C317.271 79 315.032 76.7614 315.032 74V5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M444.751 5C444.751 2.23858 446.99 -1.12302e-08 449.751 8.18382e-08L453.406 2.05011e-07C456.168 2.9808e-07 458.406 2.23858 458.406 5V74C458.406 76.7614 456.168 79 453.406 79H449.751C446.99 79 444.751 76.7614 444.751 74V5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M74.125 5C74.125 2.23858 76.3636 -1.12302e-08 79.125 8.18382e-08L82.7797 2.05011e-07C85.5411 2.9808e-07 87.7797 2.23858 87.7797 5L87.7797 74C87.7797 76.7614 85.5411 79 82.7797 79H79.125C76.3636 79 74.125 76.7614 74.125 74L74.125 5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M203.844 5C203.844 2.23858 206.083 -1.12302e-08 208.844 8.18382e-08L212.499 2.05011e-07C215.26 2.9808e-07 217.499 2.23858 217.499 5L217.499 74C217.499 76.7614 215.26 79 212.499 79H208.844C206.083 79 203.844 76.7614 203.844 74L203.844 5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M333.563 5C333.563 2.23858 335.802 -1.12302e-08 338.563 8.18382e-08L342.218 2.05011e-07C344.98 2.9808e-07 347.218 2.23858 347.218 5V74C347.218 76.7614 344.98 79 342.218 79H338.563C335.802 79 333.563 76.7614 333.563 74V5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M463.283 5C463.283 2.23858 465.521 -1.12302e-08 468.283 8.18382e-08L471.937 2.05011e-07C474.699 2.9808e-07 476.937 2.23858 476.937 5V74C476.937 76.7614 474.699 79 471.937 79H468.283C465.521 79 463.283 76.7614 463.283 74V5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M92.6563 5C92.6563 2.23858 94.8948 -1.12302e-08 97.6563 8.18382e-08L101.311 2.05011e-07C104.072 2.9808e-07 106.311 2.23858 106.311 5L106.311 74C106.311 76.7614 104.072 79 101.311 79H97.6562C94.8948 79 92.6563 76.7614 92.6563 74L92.6563 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M222.376 5C222.376 2.23858 224.614 -1.12302e-08 227.376 8.18382e-08L231.03 2.05011e-07C233.792 2.9808e-07 236.03 2.23858 236.03 5L236.03 74C236.03 76.7614 233.792 79 231.03 79H227.376C224.614 79 222.376 76.7614 222.376 74L222.376 5Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M352.095 5C352.095 2.23858 354.333 -1.12302e-08 357.095 8.18382e-08L360.749 2.05011e-07C363.511 2.9808e-07 365.749 2.23858 365.749 5V74C365.749 76.7614 363.511 79 360.749 79H357.095C354.333 79 352.095 76.7614 352.095 74V5Z"
                    fill="#27DE55"
                  />
                  <path
                    d="M481.814 5C481.814 2.23858 484.053 -1.12302e-08 486.814 8.18382e-08L490.469 2.05011e-07C493.23 2.9808e-07 495.469 2.23858 495.469 5V74C495.469 76.7614 493.23 79 490.469 79H486.814C484.053 79 481.814 76.7614 481.814 74V5Z"
                    fill="#3D6D49"
                  />
                  <path
                    d="M114.871 96L119.463 87.124H114.241V86.13H120.765V86.998L116.145 96H114.871Z"
                    fill="#888888"
                  />
                  <path
                    d="M5.03875 96V95.02H7.29275V87.516L5.51475 88.636L5.02475 87.782L7.61475 86.13H8.44075V95.02H10.5547V96H5.03875Z"
                    fill="#888888"
                  />
                  <path
                    d="M241.841 96V95.02H244.095V87.516L242.317 88.636L241.827 87.782L244.417 86.13H245.243V95.02H247.357V96H241.841Z"
                    fill="#888888"
                  />
                  <path
                    d="M253.778 96V93.886H249.228V93.018L253.974 86.13H254.94V92.906H256.41V93.886H254.94V96H253.778ZM253.778 92.906V88.02L250.418 92.906H253.778Z"
                    fill="#888888"
                  />
                  <path
                    d="M370.365 96V95.132L373.739 91.492C374.215 90.9693 374.556 90.4933 374.761 90.064C374.976 89.6347 375.083 89.196 375.083 88.748C375.083 87.6 374.416 87.026 373.081 87.026C372.083 87.026 371.201 87.3993 370.435 88.146L370.001 87.25C370.365 86.8767 370.827 86.578 371.387 86.354C371.957 86.1207 372.554 86.004 373.179 86.004C374.169 86.004 374.925 86.2373 375.447 86.704C375.979 87.1613 376.245 87.8147 376.245 88.664C376.245 89.252 376.101 89.8307 375.811 90.4C375.522 90.96 375.079 91.5573 374.481 92.192L371.835 95.02H376.651V96H370.365Z"
                    fill="#888888"
                  />
                  <path
                    d="M379.236 96V95.02H381.49V87.516L379.712 88.636L379.222 87.782L381.812 86.13H382.638V95.02H384.752V96H379.236Z"
                    fill="#888888"
                  />
                  <path
                    d="M502.193 96.126C501.54 96.126 500.919 96.028 500.331 95.832C499.743 95.6267 499.249 95.3327 498.847 94.95L499.267 94.04C499.725 94.4133 500.187 94.684 500.653 94.852C501.12 95.02 501.624 95.104 502.165 95.104C502.875 95.104 503.416 94.95 503.789 94.642C504.172 94.3247 504.363 93.8627 504.363 93.256C504.363 92.6773 504.172 92.2387 503.789 91.94C503.407 91.6413 502.851 91.492 502.123 91.492H500.667V90.498H502.025C502.66 90.498 503.159 90.3347 503.523 90.008C503.897 89.672 504.083 89.2147 504.083 88.636C504.083 88.1227 503.911 87.726 503.565 87.446C503.229 87.166 502.749 87.026 502.123 87.026C501.097 87.026 500.201 87.3993 499.435 88.146L499.015 87.25C499.379 86.858 499.841 86.5547 500.401 86.34C500.971 86.116 501.568 86.004 502.193 86.004C503.145 86.004 503.887 86.228 504.419 86.676C504.961 87.124 505.231 87.7447 505.231 88.538C505.231 89.0887 505.091 89.574 504.811 89.994C504.531 90.4047 504.144 90.7033 503.649 90.89C504.237 91.0487 504.695 91.3427 505.021 91.772C505.348 92.192 505.511 92.7147 505.511 93.34C505.511 94.1893 505.213 94.866 504.615 95.37C504.027 95.874 503.22 96.126 502.193 96.126Z"
                    fill="#888888"
                  />
                  <path
                    d="M510.7 96.126C509.571 96.126 508.712 95.692 508.124 94.824C507.536 93.956 507.242 92.7007 507.242 91.058C507.242 89.406 507.536 88.1507 508.124 87.292C508.712 86.4333 509.571 86.004 510.7 86.004C511.839 86.004 512.697 86.4333 513.276 87.292C513.864 88.1413 514.158 89.392 514.158 91.044C514.158 92.696 513.859 93.956 513.262 94.824C512.674 95.692 511.82 96.126 510.7 96.126ZM510.7 95.132C511.484 95.132 512.063 94.8007 512.436 94.138C512.819 93.4753 513.01 92.444 513.01 91.044C513.01 89.644 512.823 88.622 512.45 87.978C512.077 87.3247 511.493 86.998 510.7 86.998C509.916 86.998 509.333 87.3247 508.95 87.978C508.577 88.6313 508.39 89.6533 508.39 91.044C508.39 92.444 508.577 93.4753 508.95 94.138C509.333 94.8007 509.916 95.132 510.7 95.132Z"
                    fill="#888888"
                  />
                </svg>
              </div>
            )}

            <div className="w-[50px] flex-shrink-0"></div>
          </div>
          {isDaily ? (
            <div className="density mb-10 relative">
              <div className="flex justify-between mb-3 px-7 items-center">
                <p>Habit density</p>
                <span className="text-[#656565]">
                  {getLastDaysDensity[activeTab?.frequency]?.text}
                </span>
              </div>
              <div className="w-full mb-7 relative">
                {isPro ? (
                  <ul
                    className="flex w-full justify-between relative gap-[5px] px-7"
                    key={isInsightsOpened}
                  >
                    {lastSevenDaysFormatted.map(
                      ({ value, date }: any, index: any) => {
                        const dayFormatted = new Date(date as any)?.getDate();

                        return (
                          <li
                            key={index}
                            className={`relative rounded-lg p-[5px] w-full h-[196px] bg-[#3E3E3E] overflow-hidden`}
                          >
                            <span
                              className="absolute top-[10px] z-50 left-0 right-0 w-full text-center opacity-40"
                              style={{
                                color: value > 15 ? "#171717" : "white",
                                fontWeight: value > 15 ? "bold" : "normal",
                                opacity: value > 15 ? "60%" : "40%",
                              }}
                            >
                              {dayFormatted}
                            </span>
                            <motion.div
                              initial={{ height: 0 }}
                              whileInView={{
                                height: value
                                  ? value > 15
                                    ? "100%"
                                    : value > 10
                                    ? "75%"
                                    : value > 5
                                    ? "50%"
                                    : value > 0
                                    ? "25%"
                                    : "0%"
                                  : "0%",
                              }}
                              viewport={{ amount: 1, once: true }}
                              transition={{ delay: index / 5 }}
                              className={classNames(
                                "bg-[#27DE55] absolute w-full bottom-0 left-0 right-0 rounded-lg"
                              )}
                            >
                              <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{
                                  opacity: 1,
                                }}
                                viewport={{ amount: 0.1, once: true }}
                                transition={{ delay: index / 5 }}
                                className="absolute bottom-[10px] left-0 right-0 m-auto font-black text-[#3E3E3E] w-full text-center"
                              >
                                {value ? (
                                  value > 15 ? (
                                    <>🚀</>
                                  ) : value > 10 ? (
                                    <>😮</>
                                  ) : value > 5 ? (
                                    <>👌🏽</>
                                  ) : value > 0 ? (
                                    <>👍🏾</>
                                  ) : (
                                    <>👎🏽</>
                                  )
                                ) : (
                                  <div className="">👎🏽</div>
                                )}
                              </motion.span>
                            </motion.div>
                          </li>
                        );
                      }
                    )}
                  </ul>
                ) : (
                  <div className="w-full h-[250px] mb-16 px-7 relative flex justify-center items-center">
                    <div className="feature-locker absolute inset-0 z-40 rounded-xl bg-[rgba(30, 30, 30, 1))] flex items-center justify-center backdrop-blur-[15px]">
                      <p
                        className="absolute cursor-pointer bottom-[-30px] right-7 text-[14px] flex items-center font-black"
                        onClick={() => {
                          setIsInsightsOpened(false);
                          onOpenModal();
                          setDefaultPanel("subscription");
                        }}
                      >
                        Unlock with{" "}
                        <span className="text-[#27DE55] ml-1"> PRO </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-move-right ml-2 stroke-[#5c5c5c]"
                        >
                          <path d="M18 8L22 12L18 16" />
                          <path d="M2 12H22" />
                        </svg>
                      </p>
                    </div>
                    <svg
                      width="513"
                      className="w-full"
                      height="196"
                      viewBox="0 0 513 196"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.1235e-05 5C1.14018e-05 2.23857 2.23859 -1.57433e-08 5.00001 1.26417e-07L58 2.8549e-06C60.7614 2.99706e-06 63 2.23858 63 5L63 191C63 193.761 60.7614 196 58 196H5C2.23858 196 -1.66799e-07 193.761 0 191L1.1235e-05 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M75 5C75 2.23857 77.2386 -7.23423e-08 80 0L134 1.41466e-06C136.761 1.48701e-06 139 2.23858 139 5L139 191C139 193.761 136.761 196 134 196H80C77.2386 196 75 193.761 75 191L75 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M150 5C150 2.23857 152.239 -7.17761e-08 155 1.26443e-09L209 1.42958e-06C211.761 1.50262e-06 214 2.23858 214 5L214 191C214 193.761 211.761 196 209 196H155C152.239 196 150 193.761 150 191L150 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M150 118C150 115.239 152.239 113 155 113H209C211.761 113 214 115.239 214 118V191C214 193.761 211.761 196 209 196H155C152.239 196 150 193.761 150 191L150 118Z"
                        fill="#3D6D49"
                      />
                      <path
                        d="M450 5C450 2.23857 452.239 -7.17761e-08 455 1.26443e-09L508 1.40313e-06C510.761 1.47617e-06 513 2.23858 513 5V191C513 193.761 510.761 196 508 196H455C452.239 196 450 193.761 450 191L450 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M450 137C450 134.239 452.239 132 455 132H508C510.761 132 513 134.239 513 137V191C513 193.761 510.761 196 508 196H455C452.239 196 450 193.761 450 191L450 137Z"
                        fill="#3D6D49"
                      />
                      <path
                        d="M227 5C227 2.23857 229.239 -7.17761e-08 232 1.26443e-09L283 1.35023e-06C285.761 1.42327e-06 288 2.23858 288 5V191C288 193.761 285.761 196 283 196H232C229.239 196 227 193.761 227 191L227 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M227 137C227 134.239 229.239 132 232 132H283C285.761 132 288 134.239 288 137V191C288 193.761 285.761 196 283 196H232C229.239 196 227 193.761 227 191L227 137Z"
                        fill="#3D6D49"
                      />
                      <path
                        d="M1.00001 177C1.00001 174.239 3.23859 172 6.00001 172H57C59.7614 172 62 174.239 62 177L62 191C62 193.761 59.7614 196 57 196H6.00001C3.23859 196 1.00001 193.761 1.00001 191L1.00001 177Z"
                        fill="#56725D"
                      />
                      <path
                        d="M299 5C299 2.23857 301.239 -7.17761e-08 304 1.26443e-09L358 1.42958e-06C360.761 1.50262e-06 363 2.23858 363 5L363 191C363 193.761 360.761 196 358 196H304C301.239 196 299 193.761 299 191L299 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M299 88C299 85.2386 301.239 83 304 83H358C360.761 83 363 85.2386 363 88V191C363 193.761 360.761 196 358 196H304C301.239 196 299 193.761 299 191L299 88Z"
                        fill="#27DE54"
                      />
                      <path
                        d="M376 5C376 2.23857 378.239 -7.17761e-08 381 1.26443e-09L436 1.45603e-06C438.761 1.52907e-06 441 2.23858 441 5L441 191C441 193.761 438.761 196 436 196H381C378.239 196 376 193.761 376 191L376 5Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M376 67C376 64.2386 378.239 62 381 62H436C438.761 62 441 64.2386 441 67V191C441 193.761 438.761 196 436 196H381C378.239 196 376 193.761 376 191L376 67Z"
                        fill="#27DE54"
                      />
                      <path
                        d="M95.62 22V20.884L99.958 16.204C100.57 15.532 101.008 14.92 101.272 14.368C101.548 13.816 101.686 13.252 101.686 12.676C101.686 11.2 100.828 10.462 99.112 10.462C97.828 10.462 96.694 10.942 95.71 11.902L95.152 10.75C95.62 10.27 96.214 9.886 96.934 9.598C97.666 9.298 98.434 9.148 99.238 9.148C100.51 9.148 101.482 9.448 102.154 10.048C102.838 10.636 103.18 11.476 103.18 12.568C103.18 13.324 102.994 14.068 102.622 14.8C102.25 15.52 101.68 16.288 100.912 17.104L97.51 20.74H103.702V22H95.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M106.413 22V20.884L110.751 16.204C111.363 15.532 111.801 14.92 112.065 14.368C112.341 13.816 112.479 13.252 112.479 12.676C112.479 11.2 111.621 10.462 109.905 10.462C108.621 10.462 107.487 10.942 106.503 11.902L105.945 10.75C106.413 10.27 107.007 9.886 107.727 9.598C108.459 9.298 109.227 9.148 110.031 9.148C111.303 9.148 112.275 9.448 112.947 10.048C113.631 10.636 113.973 11.476 113.973 12.568C113.973 13.324 113.787 14.068 113.415 14.8C113.043 15.52 112.473 16.288 111.705 17.104L108.303 20.74H114.495V22H106.413Z"
                        fill="#888888"
                      />
                      <path
                        d="M21.62 22V20.884L25.958 16.204C26.366 15.76 26.696 15.346 26.948 14.962C27.2 14.566 27.386 14.182 27.506 13.81C27.626 13.438 27.686 13.06 27.686 12.676C27.686 11.956 27.464 11.41 27.02 11.038C26.588 10.654 25.952 10.462 25.112 10.462C24.464 10.462 23.858 10.582 23.294 10.822C22.742 11.05 22.214 11.41 21.71 11.902L21.152 10.75C21.62 10.27 22.214 9.886 22.934 9.598C23.666 9.298 24.434 9.148 25.238 9.148C26.09 9.148 26.81 9.28 27.398 9.544C27.986 9.808 28.43 10.198 28.73 10.714C29.03 11.218 29.18 11.836 29.18 12.568C29.18 12.952 29.132 13.33 29.036 13.702C28.952 14.062 28.814 14.428 28.622 14.8C28.442 15.16 28.208 15.532 27.92 15.916C27.644 16.3 27.308 16.696 26.912 17.104L23.096 21.154V20.74H29.702V22H21.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M33.025 22V20.74H35.923V10.588H36.697L33.637 12.532L33.007 11.434L36.337 9.31H37.399V20.74H40.117V22H33.025Z"
                        fill="#888888"
                      />
                      <path
                        d="M172.62 22V20.884L176.958 16.204C177.57 15.532 178.008 14.92 178.272 14.368C178.548 13.816 178.686 13.252 178.686 12.676C178.686 11.2 177.828 10.462 176.112 10.462C174.828 10.462 173.694 10.942 172.71 11.902L172.152 10.75C172.62 10.27 173.214 9.886 173.934 9.598C174.666 9.298 175.434 9.148 176.238 9.148C177.51 9.148 178.482 9.448 179.154 10.048C179.838 10.636 180.18 11.476 180.18 12.568C180.18 13.324 179.994 14.068 179.622 14.8C179.25 15.52 178.68 16.288 177.912 17.104L174.51 20.74H180.702V22H172.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M187.049 22.162C186.209 22.162 185.411 22.036 184.655 21.784C183.899 21.52 183.263 21.142 182.747 20.65L183.287 19.48C183.875 19.96 184.469 20.308 185.069 20.524C185.669 20.74 186.317 20.848 187.013 20.848C187.925 20.848 188.621 20.65 189.101 20.254C189.593 19.846 189.839 19.252 189.839 18.472C189.839 17.728 189.593 17.164 189.101 16.78C188.609 16.396 187.895 16.204 186.959 16.204H185.087V14.926H186.833C187.649 14.926 188.291 14.716 188.759 14.296C189.239 13.864 189.479 13.276 189.479 12.532C189.479 11.872 189.257 11.362 188.813 11.002C188.381 10.642 187.763 10.462 186.959 10.462C185.639 10.462 184.487 10.942 183.503 11.902L182.963 10.75C183.431 10.246 184.025 9.856 184.745 9.58C185.477 9.292 186.245 9.148 187.049 9.148C188.273 9.148 189.227 9.436 189.911 10.012C190.607 10.588 190.955 11.386 190.955 12.406C190.955 13.114 190.775 13.738 190.415 14.278C190.055 14.806 189.557 15.19 188.921 15.43C189.677 15.634 190.265 16.012 190.685 16.564C191.105 17.104 191.315 17.776 191.315 18.58C191.315 19.672 190.931 20.542 190.163 21.19C189.407 21.838 188.369 22.162 187.049 22.162Z"
                        fill="#888888"
                      />
                      <path
                        d="M249.62 22V20.884L253.958 16.204C254.57 15.532 255.008 14.92 255.272 14.368C255.548 13.816 255.686 13.252 255.686 12.676C255.686 11.2 254.828 10.462 253.112 10.462C251.828 10.462 250.694 10.942 249.71 11.902L249.152 10.75C249.62 10.27 250.214 9.886 250.934 9.598C251.666 9.298 252.434 9.148 253.238 9.148C254.51 9.148 255.482 9.448 256.154 10.048C256.838 10.636 257.18 11.476 257.18 12.568C257.18 13.324 256.994 14.068 256.622 14.8C256.25 15.52 255.68 16.288 254.912 17.104L251.51 20.74H257.702V22H249.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M265.579 22V19.282H259.729V18.166L265.831 9.31H267.073V18.022H268.963V19.282H267.073V22H265.579ZM265.579 18.022V11.74L261.259 18.022H265.579Z"
                        fill="#888888"
                      />
                      <path
                        d="M322.62 22V20.884L326.958 16.204C327.57 15.532 328.008 14.92 328.272 14.368C328.548 13.816 328.686 13.252 328.686 12.676C328.686 11.2 327.828 10.462 326.112 10.462C324.828 10.462 323.694 10.942 322.71 11.902L322.152 10.75C322.62 10.27 323.214 9.886 323.934 9.598C324.666 9.298 325.434 9.148 326.238 9.148C327.51 9.148 328.482 9.448 329.154 10.048C329.838 10.636 330.18 11.476 330.18 12.568C330.18 13.324 329.994 14.068 329.622 14.8C329.25 15.52 328.68 16.288 327.912 17.104L324.51 20.74H330.702V22H322.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M337.463 22.162C336.647 22.162 335.867 22.03 335.123 21.766C334.379 21.502 333.749 21.13 333.233 20.65L333.791 19.48C334.907 20.392 336.125 20.848 337.445 20.848C338.321 20.848 339.011 20.602 339.515 20.11C340.019 19.618 340.271 18.97 340.271 18.166C340.271 17.338 340.031 16.66 339.551 16.132C339.071 15.604 338.411 15.34 337.571 15.34C336.359 15.34 335.405 15.844 334.709 16.852H333.629V9.31H340.991V10.57H335.087V15.106C335.783 14.41 336.701 14.062 337.841 14.062C338.633 14.062 339.323 14.23 339.911 14.566C340.499 14.902 340.949 15.376 341.261 15.988C341.585 16.588 341.747 17.29 341.747 18.094C341.747 18.886 341.573 19.588 341.225 20.2C340.877 20.812 340.379 21.292 339.731 21.64C339.095 21.988 338.339 22.162 337.463 22.162Z"
                        fill="#888888"
                      />
                      <path
                        d="M399.62 22V20.884L403.958 16.204C404.57 15.532 405.008 14.92 405.272 14.368C405.548 13.816 405.686 13.252 405.686 12.676C405.686 11.2 404.828 10.462 403.112 10.462C401.828 10.462 400.694 10.942 399.71 11.902L399.152 10.75C399.62 10.27 400.214 9.886 400.934 9.598C401.666 9.298 402.434 9.148 403.238 9.148C404.51 9.148 405.482 9.448 406.154 10.048C406.838 10.636 407.18 11.476 407.18 12.568C407.18 13.324 406.994 14.068 406.622 14.8C406.25 15.52 405.68 16.288 404.912 17.104L401.51 20.74H407.702V22H399.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M414.625 22.162C413.125 22.162 411.967 21.622 411.151 20.542C410.347 19.45 409.945 17.926 409.945 15.97C409.945 13.774 410.395 12.088 411.295 10.912C412.195 9.736 413.455 9.148 415.075 9.148C415.723 9.148 416.371 9.286 417.019 9.562C417.679 9.838 418.219 10.21 418.639 10.678L418.099 11.83C417.655 11.374 417.169 11.032 416.641 10.804C416.125 10.576 415.591 10.462 415.039 10.462C413.863 10.462 412.957 10.9 412.321 11.776C411.697 12.652 411.385 13.954 411.385 15.682V16.564C411.613 15.772 412.033 15.154 412.645 14.71C413.269 14.266 414.001 14.044 414.841 14.044C415.585 14.044 416.245 14.218 416.821 14.566C417.397 14.902 417.847 15.37 418.171 15.97C418.495 16.57 418.657 17.26 418.657 18.04C418.657 18.844 418.483 19.558 418.135 20.182C417.799 20.794 417.325 21.28 416.713 21.64C416.113 21.988 415.417 22.162 414.625 22.162ZM414.535 20.902C415.339 20.902 415.987 20.644 416.479 20.128C416.983 19.612 417.235 18.934 417.235 18.094C417.235 17.266 416.983 16.594 416.479 16.078C415.987 15.55 415.339 15.286 414.535 15.286C413.731 15.286 413.077 15.55 412.573 16.078C412.081 16.594 411.835 17.266 411.835 18.094C411.835 18.934 412.081 19.612 412.573 20.128C413.077 20.644 413.731 20.902 414.535 20.902Z"
                        fill="#888888"
                      />
                      <path
                        d="M474.62 22V20.884L478.958 16.204C479.57 15.532 480.008 14.92 480.272 14.368C480.548 13.816 480.686 13.252 480.686 12.676C480.686 11.2 479.828 10.462 478.112 10.462C476.828 10.462 475.694 10.942 474.71 11.902L474.152 10.75C474.62 10.27 475.214 9.886 475.934 9.598C476.666 9.298 477.434 9.148 478.238 9.148C479.51 9.148 480.482 9.448 481.154 10.048C481.838 10.636 482.18 11.476 482.18 12.568C482.18 13.324 481.994 14.068 481.622 14.8C481.25 15.52 480.68 16.288 479.912 17.104L476.51 20.74H482.702V22H474.62Z"
                        fill="#888888"
                      />
                      <path
                        d="M485.809 22L491.713 10.588H484.999V9.31H493.387V10.426L487.447 22H485.809Z"
                        fill="#888888"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ArtboardInsights;
