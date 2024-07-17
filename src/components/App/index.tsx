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
  User,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  CircularProgress,
  ButtonGroup,
} from "@nextui-org/react";
import { Bolt, Plus } from "lucide-react";

import { getDaysDetailsInMonth, isValidDate } from "@/utils";

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [days, setDays] = useState([]);

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

  let tabs = [
    {
      id: "english-learning",
      label: "🇺🇸 English learning",
    },
    {
      id: "to-learn-golang",
      label: "📚 To learn Golang",
    },
    {
      id: "gym",
      label: "🏋🏾 Gym",
    },
    {
      id: "good-habits",
      label: "🥦 Good habits",
    },
    {
      id: "to-drink-water",
      label: "💦 To drink water",
    },
  ];

  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  const handleCreateJourney = async (e: any) => {
    const { error } = await supabaseClient.from("journey").insert({
      name: "Testing",
      status: "IN PROGRESS",
      icon: "",
      type: "",
      isPublic: false,
      seasonality: 24,
    });
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

  const handleDaySelection = (
    e: any,
    { id, monthNumber, dayNumber, year }: any
  ) => {
    const newDate = new CalendarDate(year, monthNumber, dayNumber);
    setDateSelected(newDate);
    setSelectedDay(id);
  };

  const handleDateSelection = (e: any) => {
    setDateSelected(e);

    const isValidDateSelected = isValidDate(`${e.month}/${e.day}/${e.year}`);

    if (isValidDateSelected) {
      if (e.month !== lastMonthLoaded) {
        const newDateSelected: any = getDaysDetailsInMonth(e.month, e.year);

        setLastMonthLoaded(e.month);
        setLastYearLoaded(e.year);

        setDays([]);

        setTimeout(() => {
          setDays(newDateSelected);
        }, 1000);
      }
      setSelectedDay(`${e.month}-${e.day}-${e.year}`);
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

  return (
    <div className="flex bg-[#171717]">
      <div className="w-[286px] flex-shrink-0 bg-black h-screen px-6 py-4 relative rounded-r-3xl overflow-scroll justify-start">
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
                <Button onPress={() => setDateSelected(now)}>Today</Button>
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
                  id={id}
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
      <div className="items-start py-3 w-full">
        <Navbar className="bg-transparent" maxWidth="full">
          <NavbarContent justify="center">
            <NavbarItem className="justify-center flex">
              <Tabs
                aria-label="Journeys"
                items={tabs}
                variant="bordered"
                className="bg-[#171717] relative z-10 rounded-xl"
              >
                {(item) => <Tab key={item.id} title={item.label}></Tab>}
              </Tabs>
              <Button
                onClick={handleCreateJourney}
                className="bg-transparent py-5 rounded-l-none ml-[-10px] pl-4 border-dashed"
                variant="bordered"
              >
                <Plus className="stroke-white" /> New journey
              </Button>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <Button isIconOnly className="bg-[#424242]" aria-label="Like">
              <Bolt className="stroke-white" />
            </Button>
            <NavbarItem className="flex justify-center">
              <Dropdown>
                <DropdownTrigger>
                  <User
                    className="text-white cursor-pointer rounded-none"
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
      </div>
    </div>
  );
};

export default App;
