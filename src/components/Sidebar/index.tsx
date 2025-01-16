"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import { DateTime } from "luxon";

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
import Quote from "../Quote";
import "./index.scss";

const Sidebar = ({
  isLoading,
  setActiveLog,
  isBlocked,
  setIsOpened,
  isOpened,
  activeTab,
  setDateSelected,
  getLogs,
  dateSelected,
  previewList,
  getPreviews,
  selectedDay,
  setIsLoading,
  setSelectedDay,
  font,
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
      newLastYearLoaded
    );

    setLastMonthLoaded(newLastMonthLoaded);
    setLastYearLoaded(newLastYearLoaded);
    
    const monthWithPad = `0${newLastMonthLoaded}`.slice(-2);
    const dayWithPad = `0${1}`.slice(-2);
    
    const dateStringStart = `${newLastYearLoaded}-${monthWithPad}-${dayWithPad}`;
    const lastDayOfMonth = new Date(newLastYearLoaded, newLastMonthLoaded, 0).getDate();
    const dateStringEnd = `${newLastYearLoaded}-${monthWithPad}-${lastDayOfMonth}`;
    

    getPreviews(dateStringStart, dateStringEnd, activeTab, {
      forceUpdate: false,
    });

    setTimeout(() => {
      setDays([...days, ...newDays]);
    }, 1000);
  };

  const handleDaySelection = async (
    e: any,
    { id, monthNumber, dayNumber, year }: any
  ) => {
    setIsReadyToRenderArtboard(false);
    setIsLoading(true);
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
    setIsOpened(true);
    setIsLoading(false);
  };

  const handleDateSelection = async (e: any) => {
    setIsReadyToRenderArtboard(false);
    setIsLoading(true);
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

      const dateStringStart = `${e?.year}-${monthWithPad}-01`;
      const lastDayOfMonth = new Date(e?.year, e?.month, 0).getDate();
      const dateStringEnd = `${e?.year}-${monthWithPad}-${lastDayOfMonth}`;

      await getPreviews(dateStringStart, dateStringEnd, activeTab, {
        forceUpdate: true,
      });

      setIsReadyToRenderArtboard(true);
      setIsOpened(true);
    }
    setIsLoading(false);
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
      getPreviews(dateStringStart, dateStringEnd, activeTab, {
        forceUpdate: true,
      });
    }
  }, [activeTab]);

  return (
    <div
      className={classnames(
        `sidebar w-[260px] h-[100svh] rounded-r-3xl bottom-0 flex-shrink-0 md:h-[100svh] top-0 px-6 py-6 fixed z-[43] border-r-1 border-y-1 justify-start sidebar-font-${font.code}`,
        {
          "md:translate-x-0 translate-x-[-260px] overflow-visible md:overflow-scroll":
            isOpened,
          "overflow-scroll md:overflow-scroll": !isOpened,
          "cursor-not-allowed": isBlocked,
        }
      )}
    >
      <div
        className={classnames(
          "datepicker-wrapper w-full sticky top-0 mb-5 mt-1 md:mt-2 z-[48] rounded-xl",
          {
            "pointer-events-none": isBlocked,
          }
        )}
      >
        <DatePicker
          aria-label="teste"
          variant={"bordered"}
          value={dateSelected}
          maxValue={todayDate(getLocalTimeZone())}
          onChange={handleDateSelection}
          className="rounded-xl text-white outline-none z-[48] relative"
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
      <div
        className={classnames("flex flex-col", {
          "pointer-events-none": isBlocked,
        })}
      >
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

            const qualityLog = Math.round(
              (logToPreview?.content?.length || 0) / 100
            );

            return type === "day" ? (
              <div
                key={index}
                id={`day-${id}`}
                onClick={(e) => {
                  if (selectedDay === id || isLoading) return;
                  handleDaySelection(e, {
                    id,
                    monthNumber,
                    dayNumber,
                    year,
                  });
                }}
                className={classnames(
                  "sidebar-day p-4 flex flex-col relative justify-start cursor-pointer hover:text-white hover:bg-[#212121] mb-4 text-[24px] rounded-2xl h-[130px]",
                  {
                    "bg-[#212121] text-white featured-day": selectedDay === id,
                  }
                )}
              >
                <div className="w-[10px] h-[80%] absolute right-[100%] items-end m-auto top-0 bottom-0">
                  <ul className="flex flex-col w-[100%] h-full justify-end">
                    <Quote
                      quality={qualityLog}
                      content={logToPreview?.content}
                    />
                  </ul>
                </div>
                <div className="flex w-full justify-between">
                  <span className="leading-7">{dayNumber}</span>
                  <small className="text-sm">{dayName}</small>
                </div>
                <ul
                  className={`preview-item text-sm w-full list-disc px-3 pl-6 mt-2 preview-list overflow-hidden h-[70px] ${font.class}`}
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
                className="sidebar-note text-[#4d4d4d] z-[48] mb-4 flex justify-between px-1 sticky top-[40px] pb-1 pt-2"
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
