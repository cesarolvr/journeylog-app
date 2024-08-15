"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import { DateTime } from "luxon";
import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
import { useInView } from "react-intersection-observer";

import {
  CalendarDate,
  getLocalTimeZone,
  today as todayDate,
} from "@internationalized/date";

import React from "react";
import {
  DatePicker,
  Button,
  CircularProgress,
  ButtonGroup,
} from "@nextui-org/react";

import { getDaysDetailsInMonth, isValidDate } from "@/utils";

const Sidebar = ({
  setActiveLog,
  isOpened,
  activeTab,
  setDateSelected,
  getLogs,
  dateSelected,
  previewList,
  getPreviews,
  selectedDay,
  setSelectedDay,
  setIsReadyToRenderArtboard,
}: any) => {
  const [days, setDays] = useState([]);

  const today = DateTime.now().toUTC().toJSDate();

  const [lastMonthLoaded, setLastMonthLoaded] = useState(today.getMonth() + 1);
  const [lastYearLoaded, setLastYearLoaded] = useState(today.getFullYear());

  let now = todayDate(getLocalTimeZone());

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const handleGoToToday = (now: any) => {
    setIsReadyToRenderArtboard(false);
    if (lastMonthLoaded !== now.month || lastYearLoaded !== now.year) {
      const newDays: any = getDaysDetailsInMonth(now.month, now.year);

      setLastMonthLoaded(now.month);
      setLastYearLoaded(now.year);

      setDays(newDays);
    }

    const monthWithPad = `0${now.month}`.slice(-2);
    const dayWithPad = `0${now.day}`.slice(-2);
    const id = `${now?.year}-${monthWithPad}-${dayWithPad}`;

    setDateSelected(now);
    setSelectedDay(id);
    setTimeout(async () => {
      const element = document.querySelector(`#day-${id}`);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const res = await getLogs(
        activeTab.id,
        `${now.year}-${monthWithPad}-${dayWithPad}`
      );

      if (res) {
        setActiveLog(res);
      }

      setIsReadyToRenderArtboard(true);
    }, 0);
  };

  const handleLoadMore = async () => {
    const newLastMonthLoaded = lastMonthLoaded === 1 ? 12 : lastMonthLoaded - 1;
    const newLastYearLoaded =
      lastMonthLoaded === 1 ? lastYearLoaded - 1 : lastYearLoaded;

    const newDays: any = getDaysDetailsInMonth(
      newLastMonthLoaded,
      lastYearLoaded
    );

    setLastMonthLoaded(newLastMonthLoaded);
    setLastYearLoaded(newLastYearLoaded);

    setTimeout(() => {
      setDays([...days, ...newDays]);
    }, 1000);
  };

  const handleDaySelection = async (
    e: any,
    { id, monthNumber, dayNumber, year }: any
  ) => {
    setIsReadyToRenderArtboard(false);
    setActiveLog(null);

    const newDate = new CalendarDate(year, monthNumber, dayNumber);
    setDateSelected(newDate);
    setSelectedDay(id);

    const element = document.querySelector(`#day-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const monthWithPad = `0${monthNumber}`.slice(-2);
    const dayWithPad = `0${dayNumber}`.slice(-2);

    const res = await getLogs(
      activeTab?.id,
      `${year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
    } else {
      setActiveLog(null);
    }

    setIsReadyToRenderArtboard(true);
  };

  const handleDateSelection = async (e: any) => {
    setIsReadyToRenderArtboard(false);
    setDateSelected(e);

    const monthWithPad = `0${e?.month}`.slice(-2);
    const dayWithPad = `0${e?.day}`.slice(-2);

    const getId = (divider: string) =>
      `${monthWithPad}${divider}${dayWithPad}${divider}${e?.year}`;
    const isValidDateSelected = isValidDate(getId("/"));

    const syntheticDate = DateTime.fromJSDate(new Date())
      .set({
        day: e?.day,
        month: e?.month,
        year: e?.year,
      })
      .toUTC()
      .toJSDate();

    if (isValidDateSelected && syntheticDate < today) {
      const isTheSameMonthSelected = e.month === lastMonthLoaded;
      const isTheSameYearSelected = e.year === lastYearLoaded;
      if (!isTheSameMonthSelected || !isTheSameYearSelected) {
        const newDateSelected: any = getDaysDetailsInMonth(e.month, e.year);

        setLastMonthLoaded(e.month);
        setLastYearLoaded(e.year);

        setDays([]);

        setTimeout(() => {
          setDays(newDateSelected);
        }, 100);
      }

      const monthWithPad = `0${e?.month}`.slice(-2);
      const dayWithPad = `0${e?.day}`.slice(-2);

      const id = `${e?.year}-${monthWithPad}-${dayWithPad}`;

      setTimeout(
        () => {
          const element = document.querySelector(`#day-${id}`);

          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        },
        isTheSameMonthSelected && isTheSameYearSelected ? 0 : 150
      );

      setSelectedDay(id);
      setActiveLog(null);

      const filter = `${e?.year}-${monthWithPad}-${dayWithPad}`;

      const res = await getLogs(activeTab.id, filter);
      if (res) {
        setActiveLog(res);
      }
      setIsReadyToRenderArtboard(true);
    }
  };

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  useEffect(() => {
    const startCalendar = async () => {
      const currentMonth: any = getDaysDetailsInMonth(
        today.getMonth() + 1,
        today.getFullYear()
      );
      setDays(currentMonth);
    };

    startCalendar();
  }, []);

  useEffect(() => {
    const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
    const dayWithPad = `0${today?.getDate()}`.slice(-2);
    const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
    const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

    if (activeTab) {
      getPreviews(dateStringStart, dateStringEnd, activeTab);
    }
  }, [activeTab]);

  return (
    <div
      className={classnames(
        "w-[260px] h-[95svh] top-0 bottom-0 flex-shrink-0 bg-black md:h-screen px-6 py-6 fixed m-auto z-[500] md:relative rounded-r-3xl justify-start",
        {
          "md:translate-x-0 translate-x-[-260px] overflow-visible md:overflow-scroll":
            isOpened,
          "overflow-scroll md:overflow-scroll": !isOpened,
        }
      )}
    >
      <div className="w-full sticky top-0 mb-5 mt-1 md:mt-2 bg-black">
        <DatePicker
          aria-label="teste"
          variant={"bordered"}
          value={dateSelected}
          maxValue={todayDate(getLocalTimeZone())}
          onChange={handleDateSelection}
          className="rounded-xl text-white outline-none"
          CalendarTopContent={
            <ButtonGroup
              fullWidth
              className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
              radius="full"
              size="sm"
              variant="bordered"
            >
              <Button onPress={() => handleGoToToday(now)}>Today</Button>
            </ButtonGroup>
          }
          calendarProps={{
            nextButtonProps: {
              variant: "bordered",
            },
            prevButtonProps: {
              variant: "bordered",
            },
          }}
        />
      </div>
      <div className="flex flex-col">
        {days.map(
          (
            { dayNumber, type, monthName, monthNumber, dayName, year, id },
            index
          ) => {
            const previewLink = DateTime.fromJSDate(new Date(id))
              .plus({ day: 1 })
              .toLocal()
              .toISODate();

            const logToPreview = previewList?.find((item: any) => {
              const dateToBeCompared = DateTime.fromJSDate(
                new Date(item?.created_at)
              )
                .toLocal()
                .toISODate();

              return dateToBeCompared === previewLink;
            });

            const parsedEditorState = logToPreview?.content
              ? JSON.parse(`${logToPreview?.content}`)
              : {};

            const previewItem = parsedEditorState?.root?.children;

            return type === "day" ? (
              <div
                key={index}
                id={`day-${id}`}
                onClick={(e) => {
                  if (selectedDay === id) return;
                  handleDaySelection(e, {
                    id,
                    monthNumber,
                    dayNumber,
                    year,
                  });
                }}
                className={classnames(
                  "p-4 flex flex-col justify-start cursor-pointer hover:text-white hover:bg-[#212121] bg-[#161616] mb-4 text-[24px] rounded-2xl text-[#424242] h-[130px]",
                  {
                    "bg-[#212121] text-white": selectedDay === id,
                  }
                )}
              >
                <div className="flex w-full justify-between">
                  <span className="leading-7">{dayNumber}</span>
                  <small className="text-sm">{dayName}</small>
                </div>
                <ul
                  className={`text-sm w-full list-disc px-3 pl-10 preview-list ${reenie.className}`}
                >
                  {previewItem?.map(({ children }: any, key: any) => {
                    return (
                      <div key={key}>
                        {children.map((item: any, keyChildren: any) => {
                          const textContent = item?.children
                            ? item.children[0]?.text
                            : item?.text;
                          return (
                            <li
                              key={keyChildren}
                              className="max-w-full break-all leading-3"
                            >
                              {textContent}
                            </li>
                          );
                        })}
                      </div>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <p
                key={index}
                className="text-[#4d4d4d] mb-4 flex justify-between px-1 sticky top-[40px] bg-black pb-1 pt-2"
              >
                <span>{monthName}</span>
                <span>{year}</span>
              </p>
            );
          }
        )}
        {days.length === 0 ? (
          <div className="flex p-3 justify-center rounded-xl">
            <CircularProgress aria-label="Loading..." />
          </div>
        ) : null}
        {days.length > 0 ? (
          <div ref={ref} className="flex p-3 justify-center rounded-xl">
            <CircularProgress aria-label="Loading..." />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Sidebar;
