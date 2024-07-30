"use client";

import { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
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
import { Plus, Ellipsis } from "lucide-react";

import { getDaysDetailsInMonth, isValidDate } from "@/utils";
import Artboard from "../Artboard";
import { debounce } from "lodash";

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [days, setDays] = useState([]);
  const [journeyTabs, setJourneyTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [contentInArtboard, setContentInArtboard] = useState(null);

  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(
    `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
  );
  const [lastMonthLoaded, setLastMonthLoaded] = useState(today.getMonth() + 1);
  const [lastYearLoaded, setLastYearLoaded] = useState(today.getFullYear());

  let now = todayDate(getLocalTimeZone());
  const [dateSelected, setDateSelected] = useState(now);

  const username = user.user_metadata.full_name
    .split(" ")
    .slice(0, -1)
    .join(" ");

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const handleContentEdit = debounce(async (content: any) => {
    const customDate = new Date();
    customDate.setDate(dateSelected.day);
    customDate.setMonth(dateSelected.month - 1);
    customDate.setFullYear(dateSelected.year);

    const { data, error } = await supabaseClient
      .from("log")
      .upsert({
        ...(activeLog && { id: activeLog.id }),
        created_at: customDate,
        ...(activeLog
          ? { updated_at: new Date() }
          : { updated_at: customDate }),
        // updated_at: customDate,
        type: "",
        journey_id: activeTab?.id,
        content,
        user_id: user.id,
      })
      .select();

    if (data[0]) {
      // setActiveLog(data[0])
    }
  }, 500);

  const handleJourneyNameEdit = debounce(async (e: any) => {
    const value = e?.target?.textContent;
    const { error, data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ name: value, updated_at: new Date() })
      .eq("id", activeTab?.id)
      .select();

    if (updatedJourney) {
      const updatedTabList = journeyTabs.map((item) => {
        if (item.id === updatedJourney[0].id) {
          return {
            ...item,
            ...updatedJourney[0],
          };
        }

        return item;
      });
      setActiveTab(updatedJourney[0]);
      setJourneyTabs([...updatedTabList]);
    }
  }, 500);

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
    setContentInArtboard(null);
    setActiveLog(null);

    const monthWithPad = `0${dateSelected.month}`.slice(-2);

    const res = await getLogs(
      activeTab.id,
      `${dateSelected.year}-${monthWithPad}-${dateSelected.day}`
    );

    if (res) {
      setActiveLog(res);
      setContentInArtboard(res.content);
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
    setTimeout(() => {
      const element = document.querySelector(`#day-${getId("-")}`);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
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
      setTimeout(() => {
        setJourneyTabs([...data]);
      }, 100);
      setContentInArtboard(null);
    }
  }, 500);

  const handleLoadMore = () => {
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
    setContentInArtboard(null);
    const newDate = new CalendarDate(year, monthNumber, dayNumber);
    setDateSelected(newDate);
    setSelectedDay(id);

    const element = document.querySelector(`#day-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const monthWithPad = `0${monthNumber}`.slice(-2);

    const res = await getLogs(
      activeTab.id,
      `${year}-${monthWithPad}-${dayNumber}`
    );

    if (res) {
      setActiveLog(res);
      setContentInArtboard(res.content);
    }
  };

  const handleDateSelection = async (e: any) => {
    setDateSelected(e);

    const getId = (divider: string) =>
      `${e?.month}${divider}${e?.day}${divider}${e?.year}`;
    const isValidDateSelected = isValidDate(getId("/"));

    const syntheticDate = new Date(`${e?.year}-${e?.month}-${e?.day}`);

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
      setContentInArtboard(null);

      const monthWithPad = `0${e?.month}`.slice(-2);
      const filter = `${e?.year}-${monthWithPad}-${e?.day}`;

      const res = await getLogs(activeTab.id, filter);
      if (res) {
        setActiveLog(res);
        setContentInArtboard(res.content);
      }
    }
  };

  useEffect(() => {
    const currentMonth: any = getDaysDetailsInMonth(
      today.getMonth() + 1,
      today.getFullYear()
    );
    setDays(currentMonth);
  }, []);

  useEffect(() => {
    if (inView) {
      handleLoadMore();
    }
  }, [inView]);

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

    return data[0];
  };

  useEffect(() => {
    const getTabs = async () => {
      const { error, data } = await supabaseClient
        .from("journey")
        .select()
        .order("updated_at", { ascending: false });
      setActiveTab(data[0]);
      setJourneyTabs(data);

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);

      const res = await getLogs(
        data[0].id,
        `${today.getFullYear()}-${monthWithPad}-${today.getDate()}`
      );
      if (res) {
        setActiveLog(res);
        setContentInArtboard(res.content);
      }
    };

    getTabs();
  }, []);

  return (
    <div className="flex bg-[#171717] w-full h-full">
      <div className="w-[260px] flex-shrink-0 bg-black h-screen px-6 py-6 relative rounded-r-3xl overflow-scroll justify-start">
        <div className="w-full sticky top-0 mb-5 mt-2 bg-black">
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
              focusedValue: dateSelected,
              onFocusChange: setDateSelected,
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
                    "p-4 flex justify-between cursor-pointer hover:text-white hover:bg-[#212121] bg-[#161616] mb-4 text-[24px] rounded-2xl text-[#424242] h-[130px]",
                    {
                      "bg-[#212121] text-white": selectedDay === id,
                    }
                  )}
                >
                  <span className="leading-7">{dayNumber}</span>
                  <small className="text-sm">{dayName}</small>
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
      <div className="items-start py-6 w-full flex flex-col h-full overflow-scroll justify-start artboard-parent">
        <Navbar
          className="h-[64px] bg-transparent nav backdrop-filter-none"
          maxWidth="full"
        >
          <NavbarContent
            justify="center"
            className="bg-[#1e1e1e] rounded-2xl px-3"
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
                className="bg-transparent pl-4 border-none"
                variant="bordered"
              >
                <Plus className="stroke-white" /> New journey
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent
            justify="end"
            className="rounded-2xl nav-logout px-3 bg-[#1e1e1e]"
          >
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
        <div className="px-6 w-full h-full flex artboard flex-col">
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
          <Artboard
            content={contentInArtboard}
            setContent={handleContentEdit}
            activeTab={activeTab}
          />
        </div>
        <div className="h-[50px] shrink-0"></div>
        {/* <div className="absolute right-0 bg-black top-0 w-[260px] h-svh rounded-l-3xl p-4">aaa</div> */}
      </div>
    </div>
  );
};

export default App;
