"use client";

import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
  Navbar,
  DatePicker,
  NavbarContent,
  NavbarItem,
  Button,
  Tabs,
  Tab,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  CircularProgress,
  ButtonGroup,
} from "@nextui-org/react";
import { Plus, Ellipsis, ChevronsRight, ChevronsLeft } from "lucide-react";

import { debounce } from "lodash";
import { getDaysDetailsInMonth, isValidDate } from "@/utils";
import Artboard from "../Artboard";

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [days, setDays] = useState([]);
  const [journeyTabs, setJourneyTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [previewList, setPreviewList] = useState(null);
  const [isOpened, setIsOpened] = useState(true);
  const [initialArtboard, setInitialArtboard] = useState(null);

  const today = DateTime.now().toUTC().toJSDate();
  const [selectedDay, setSelectedDay] = useState(
    `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
  );
  const [lastMonthLoaded, setLastMonthLoaded] = useState(today.getMonth() + 1);
  const [lastYearLoaded, setLastYearLoaded] = useState(today.getFullYear());

  let now = todayDate(getLocalTimeZone());
  const [dateSelected, setDateSelected] = useState(now);

  const username = user?.user_metadata?.full_name
    .split(" ")
    .slice(0, -1)
    .join(" ");

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const newActiveLog = useRef(null);
  const newActiveTab = useRef(null);

  const handleContentEdit = debounce(async (content: any) => {
    const now = DateTime.now().toUTC().toISO();
    const customDate = DateTime.fromJSDate(new Date())
      .set({
        day: dateSelected.day,
        month: dateSelected.month,
        year: dateSelected.year,
      })
      .toUTC()
      .toISO();

    const isToCreate = !newActiveLog?.current;

    const { data, error } = await supabaseClient
      .from("log")
      .upsert({
        ...(isToCreate ? {} : { id: newActiveLog?.current?.id }),
        created_at: isToCreate ? customDate : newActiveLog?.current?.created_at,
        updated_at: now,
        type: "",
        journey_id: activeTab?.id,
        content,
        user_id: user.id,
      })
      .select();

    if (data && data[0]) {
      newActiveLog.current = data[0];

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      const res = await getPreviews(dateStringStart, dateStringEnd);
      setPreviewList(res);
    }
  }, 1000);

  const handleJourneyNameEdit = debounce(async (e: any) => {
    const value = e?.target?.textContent;
    const { error, data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ name: value, updated_at: DateTime.now().toUTC().toISO() })
      .eq("id", activeTab?.id)
      .select();

    if (updatedJourney) {
      const updatedTabList = journeyTabs.map((item) => {
        if (item?.id === updatedJourney[0].id) {
          return {
            ...item,
            ...updatedJourney[0],
          };
        }

        return item;
      });
      setActiveTab(updatedJourney[0]);
      newActiveTab.current = updatedJourney[0];
      setJourneyTabs([...updatedTabList]);
    }
  }, 1000);

  const handleJourneyDeletion = debounce(async ({ id }: any) => {
    const { error, data } = await supabaseClient
      .from("journey")
      .delete()
      .eq("id", id)
      .select()
      .order("updated_at", { ascending: false });

    if (data) {
      const itemDeleted = data[0];
      const newTabsToBeRendered = journeyTabs.filter((item) => {
        return item.id !== itemDeleted.id;
      });

      setJourneyTabs(newTabsToBeRendered);
    }
  }, 500);

  const handleTabSelection = async (idSelected: any) => {
    const activeTab = journeyTabs.find((item) => {
      return item.id === idSelected;
    });

    setActiveTab(activeTab);
    newActiveTab.current = activeTab;
    setInitialArtboard(null);
    setActiveLog(null);
    newActiveLog.current = null;

    const monthWithPad = `0${dateSelected.month}`.slice(-2);
    const dayWithPad = `0${dateSelected.day}`.slice(-2);

    const res = await getLogs(
      activeTab.id,
      `${dateSelected.year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
      newActiveLog.current = res;
      setInitialArtboard(res.content);
    }
  };

  const handleGoToToday = (now: any) => {
    const getId = (divider: string) =>
      `${now?.month}${divider}${now?.day}${divider}${now?.year}`;

    if (lastMonthLoaded !== now.month || lastYearLoaded !== now.year) {
      const newDays: any = getDaysDetailsInMonth(now.month, now.year);

      setLastMonthLoaded(now.month);
      setLastYearLoaded(now.year);

      setDays(newDays);
    }

    setDateSelected(now);
    setSelectedDay(getId("-"));
    setTimeout(async () => {
      const element = document.querySelector(`#day-${getId("-")}`);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const monthWithPad = `0${now.month}`.slice(-2);
      const dayWithPad = `0${now.day}`.slice(-2);

      const res = await getLogs(
        activeTab.id,
        `${now.year}-${monthWithPad}-${dayWithPad}`
      );

      if (res) {
        setActiveLog(res);
        newActiveLog.current = res;
        setInitialArtboard(res.content);
      }
    }, 0);
  };

  const handleCreateJourney = debounce(async (e: any) => {
    await supabaseClient.from("journey").insert({
      name: "🏆 New journey",
    });

    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("updated_at", { ascending: false });

    if (data) {
      setJourneyTabs([]);
      setActiveTab(data[0]);
      newActiveTab.current = data[0];
      setTimeout(() => {
        setJourneyTabs([...data]);
      }, 100);
      setInitialArtboard(null);
    }
  }, 500);

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

  const handleLogout = debounce(async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
  }, 500);

  const handleDaySelection = async (
    e: any,
    { id, monthNumber, dayNumber, year }: any
  ) => {
    setActiveLog(null);
    newActiveLog.current = null;
    setInitialArtboard(null);

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
      activeTab.id,
      `${year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
      newActiveLog.current = res;
      setInitialArtboard(res.content);
    }
  };

  const handleDateSelection = async (e: any) => {
    setDateSelected(e);

    const getId = (divider: string) =>
      `${e?.month}${divider}${e?.day}${divider}${e?.year}`;
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

      setTimeout(
        () => {
          const element = document.querySelector(`#day-${getId("-")}`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        },
        isTheSameMonthSelected && isTheSameYearSelected ? 0 : 150
      );

      setSelectedDay(getId("-"));

      setActiveLog(null);
      newActiveLog.current = null;
      setInitialArtboard(null);

      const monthWithPad = `0${e?.month}`.slice(-2);
      const dayWithPad = `0${e?.day}`.slice(-2);

      const filter = `${e?.year}-${monthWithPad}-${dayWithPad}`;

      const res = await getLogs(activeTab.id, filter);
      if (res) {
        setActiveLog(res);
        newActiveLog.current = res;
        setInitialArtboard(res.content);
      }
    }
  };

  const getLogs = async (journeyId: any, dateString: any) => {
    const start = DateTime.fromISO(dateString)
      .set({ hour: 0, minute: 0, second: 0 })
      .toUTC()
      .toISO();
    const end = DateTime.fromISO(dateString)
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toUTC()
      .toISO();

    const { data, error } = await supabaseClient
      .from("log")
      .select()
      .eq("journey_id", journeyId)
      .gt("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    return data ? data[0] : null;
  };

  const getPreviews = async (dateStringStart: any, dateStringEnd: any) => {
    const start = DateTime.fromISO(dateStringStart)
      .minus({ month: 1 })
      .set({ hour: 0, minute: 0, second: 0 })
      .toUTC()
      .toISO();

    const end = DateTime.fromISO(dateStringEnd)
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toUTC()
      .toISO();

    const { error, data } = await supabaseClient
      .from("log")
      .select()
      .gt("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    if (data) {
      return data;
    }
  };

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

  useEffect(() => {
    const getTabs = async () => {
      const { error, data } = await supabaseClient
        .from("journey")
        .select()
        .order("updated_at", { ascending: false });

      if (data && data[0]) {
        setActiveTab(data[0]);
        newActiveTab.current = data[0];
        setJourneyTabs(data);

        const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
        const dayWithPad = `0${today?.getDate()}`.slice(-2);

        const res = await getLogs(
          data[0]?.id,
          `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`
        );

        if (res) {
          setActiveLog(res);
          newActiveLog.current = res;
          setInitialArtboard(res.content);
        }
      }
    };

    getTabs();

    const startCalendar = async () => {
      const currentMonth: any = getDaysDetailsInMonth(
        today.getMonth() + 1,
        today.getFullYear()
      );
      setDays(currentMonth);

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      const res = await getPreviews(dateStringStart, dateStringEnd);
      setPreviewList(res);
    };

    startCalendar();
  }, []);

  return (
    <div className="flex bg-[#171717] w-full h-full relative">
      <div
        className={classnames(
          "absolute cursor-pointer bg-[#393939] backdrop-blur-sm left-0 top-0 bg-opacity-20 z-[100]",
          {
            "w-[100vw] h-[100vh]": !isOpened,
            "w-[0px] h-[0px] flex items-center justify-center": isOpened,
          }
        )}
        onClick={() => setIsOpened(!isOpened)}
      >
        <div
          className={classnames(
            "hover:bg-[#2c2c2c] w-[40px] h-[40px] p-2 rounded-xl left-8 top-[50px] relative",
            {
              "left-[270px] bg-black top-7": !isOpened,
            }
          )}
        >
          {isOpened ? <ChevronsRight /> : <ChevronsLeft />}
        </div>
      </div>
      <div
        className={classnames(
          "w-[260px] h-[95vh] top-0 bottom-0 flex-shrink-0 bg-black md:h-screen px-6 py-6 fixed m-auto z-[500] md:relative rounded-r-3xl justify-start",
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
                .toUTC()
                .toISODate();
              const logToPreview = previewList?.find((item) => {
                const dateToBeCompared = DateTime.fromJSDate(
                  new Date(item?.created_at)
                )
                  .toUTC()
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
                    {previewItem?.map(({ children }: any, key) => {
                      const isList = children[0]?.type === "listitem";
                      const textContent = isList
                        ? children[0]?.children[0].text
                        : children[0]?.text;
                      return <li key={key}>{textContent}</li>;
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
      <div className="items-start py-5 md:py-6 w-full flex flex-col h-full overflow-scroll justify-start artboard-parent">
        <Navbar
          className="nav_header h-[64px] bg-transparent nav backdrop-filter-none"
          maxWidth="full"
        >
          <NavbarContent
            justify="center"
            className="rounded-2xl md:px-3 ml-10 md:ml-0"
          >
            <NavbarItem className="justify-center flex">
              {journeyTabs.length > 0 ? (
                <Tabs
                  aria-label="Journeys"
                  items={journeyTabs}
                  variant="bordered"
                  className="relative rounded-xl"
                  onSelectionChange={handleTabSelection}
                >
                  {(item) => <Tab key={item.id} title={item.name}></Tab>}
                </Tabs>
              ) : null}

              <Button
                onClick={handleCreateJourney}
                className="bg-transparent px-3 md:pl-4 border-none min-w-0"
                variant="bordered"
              >
                <Plus className="stroke-white" />{" "}
                <div className="hidden md:block">New journey</div>
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end" className="rounded-2xl nav-logout px-1">
            <NavbarItem className="flex justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <Avatar
                    className="text-white cursor-pointer"
                    name={username}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new" onClick={handleLogout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="px-2 md:p-6 pt-3 md:pt-0 w-full h-full flex artboard flex-col">
          <div className="flex items-center justify-between">
            <p
              className="px-4 py-2 text-3xl mt-3 mb-5"
              contentEditable="true"
              onInput={handleJourneyNameEdit}
              suppressContentEditableWarning={true}
            >
              {activeTab?.name}
            </p>
            {activeTab ? (
              <Popover className="flex justify-center">
                <PopoverTrigger>
                  <Ellipsis className="mr-3" />
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                  {(titleProps) => (
                    <div className="px-1 py-2 w-full">
                      <Button
                        className="bg-danger-300 text-white w-full"
                        onClick={() => handleJourneyDeletion(activeTab)}
                      >
                        Delete Journey
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
          {activeTab && activeTab?.id && (
            <Artboard
              content={initialArtboard}
              setContent={handleContentEdit}
              fontClassname={reenie.className}
            />
          )}
        </div>
        <div className="h-[50px] shrink-0"></div>
        {/* <div className="absolute right-0 bg-black top-0 w-[260px] h-svh rounded-l-3xl p-4">aaa</div> */}
      </div>
    </div>
  );
};

export default App;
