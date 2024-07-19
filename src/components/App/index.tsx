"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
  Input,
  Switch,
} from "@nextui-org/react";
import { Bolt, Plus } from "lucide-react";

import { getDaysDetailsInMonth, isValidDate } from "@/utils";
import Artboard from "../Artboard";
import { getLogFromADay } from "@/services";

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [days, setDays] = useState([]);
  const [journeyTabs, setJourneyTabs] = useState([]);
  const [activeTab, setActiveTab] = useState({});
  const [journeySettings, setJourneySettings] = useState({});
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

  const handleJourneySettingsUpdate = (e) => {
    const inputValue = e.target.value;
    setJourneySettings({ name: inputValue });
  };

  const handleJourneySave = async (updatedJourney) => {
    const { error, data } = await supabaseClient
      .from("journey")
      .update(journeySettings)
      .eq("id", updatedJourney.id)
      .select();

    if (data) {

      setJourneyTabs([...journeyTabs, ...data]);
    }
  };

  const handleJourneyDeletion = async ({ id }) => {
    const { error, data } = await supabaseClient
      .from("journey")
      .delete()
      .eq("id", id)
      .select();

    if (data) {
      const itemDeleted = data[0];
      const newTabsToBeRendered = journeyTabs.filter((item) => {
        return item.id !== itemDeleted.id;
      });

      setJourneyTabs(newTabsToBeRendered);
    }
  };

  const handleTabSelection = (idSelected) => {
    const activeTab = journeyTabs.find((item) => {
      return item.id === idSelected;
    });
    setActiveTab(activeTab);
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

  const handleCreateJourney = async (e: any) => {
    const { error, data } = await supabaseClient
      .from("journey")
      .insert({
        name: "🇺🇸 To learn english",
      })
      .select();

    if (data) {
      setJourneyTabs([...journeyTabs, ...data]);
    }
  };

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

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  const handleDaySelection = async (
    e: any,
    { id, monthNumber, dayNumber, year }: any
  ) => {
    setContentInArtboard(null);
    const newDate = new CalendarDate(year, monthNumber, dayNumber);
    setDateSelected(newDate);
    setSelectedDay(id);

    const element = document.querySelector(`#day-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const a = new Date(year, monthNumber - 1, dayNumber);

    const log = await getLogFromADay(a);

    setContentInArtboard(log?.content);
  };

  const handleDateSelection = (e: any) => {
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

  useEffect(() => {
    const getLog = async () => {
      const today = new Date();
      const log = await getLogFromADay(
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );

      setContentInArtboard(log?.content);
    };
    getLog();

    const getTabs = async () => {
      const { error, data } = await supabaseClient.from("journey").select();
      setJourneyTabs(data);
    };

    getTabs();
  }, []);

  return (
    <div className="flex bg-[#171717] w-full h-full">
      <div className="w-[260px] flex-shrink-0 bg-black h-screen px-6 py-6 relative rounded-r-3xl overflow-scroll justify-start">
        <div className="w-full sticky top-0 mb-5 mt-2 bg-black">
          <DatePicker
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
                  onClick={(e) =>
                    handleDaySelection(e, {
                      id,
                      monthNumber,
                      dayNumber,
                      year,
                    })
                  }
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
              <Tabs
                aria-label="Journeys"
                items={journeyTabs}
                variant="bordered"
                className="relative rounded-xl"
                onSelectionChange={handleTabSelection}
              >
                {(item) => <Tab key={item.id} title={item.name}></Tab>}
              </Tabs>
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
            <Popover className="flex justify-center">
              <PopoverTrigger>
                <Button color="primary" className="bg-[#3f3f46] w-auto min-w-0">
                  <Bolt />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[240px]">
                {(titleProps) => (
                  <div className="px-1 py-2 w-full">
                    <p
                      className="text-small font-bold text-foreground"
                      {...titleProps}
                    >
                      Journey's settings
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full mb-3">
                      <Input
                        defaultValue={activeTab.name}
                        onChange={handleJourneySettingsUpdate}
                        label="Name"
                        size="sm"
                        variant="bordered"
                        className="mb-2"
                      />
                      <Button
                        className="bg-success text-white w-full"
                        onClick={() => handleJourneySave(activeTab)}
                      >
                        Save
                      </Button>
                    </div>
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
        <div className="px-5 w-full h-full flex artboard">
          {contentInArtboard ? <Artboard content={contentInArtboard} /> : null}
          <Artboard content={contentInArtboard} />
        </div>
        <div className="h-[50px] shrink-0"></div>
        {/* <div className="absolute right-0 bg-black top-0 w-[260px] h-svh rounded-l-3xl p-4">aaa</div> */}
      </div>
    </div>
  );
};

export default App;
