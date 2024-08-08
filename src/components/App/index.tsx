"use client";

import { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DateTime } from "luxon";
import { Reenie_Beanie } from "next/font/google";

const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });

import { getLocalTimeZone, today as todayDate } from "@internationalized/date";

import React from "react";
import {
  Navbar,
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
} from "@nextui-org/react";
import { Plus, Ellipsis, ChevronsRight, ChevronsLeft } from "lucide-react";

import { debounce } from "lodash";
import Artboard from "../Artboard";
import Sidebar from "../Sidebar";

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [journeyTabs, setJourneyTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [activeLog, setActiveLog] = useState(null);
  const [isOpened, setIsOpened] = useState(true);
  const [initialArtboard, setInitialArtboard] = useState(null);

  const today = DateTime.now().toUTC().toJSDate();

  let now = todayDate(getLocalTimeZone());
  const [dateSelected, setDateSelected] = useState(now);

  const username = user?.user_metadata?.full_name
    .split(" ")
    .slice(0, -1)
    .join(" ");

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

    const payloadToSend = (condition: boolean) => {
      if (condition) {
        return {
          created_at: customDate,
          updated_at: now,
          type: "",
          journey_id: newActiveTab?.current?.id,
          content,
          user_id: user.id,
        };
      } else {
        return {
          id: newActiveLog?.current?.id,
          created_at: newActiveLog?.current?.created_at,
          updated_at: now,
          type: "",
          journey_id: newActiveTab?.current?.id,
          content,
          user_id: user.id,
        };
      }
    };

    const { data, error } = await supabaseClient
      .from("log")
      .upsert(payloadToSend(isToCreate))
      .select();

    if (data && data[0]) {
      newActiveLog.current = data[0];

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      getPreviews(dateStringStart, dateStringEnd);
    }
  }, 500);

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

  const handleLogout = debounce(async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.log(error);
    }
  }, 500);

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
      setPreviewList(data);
    }
  };

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
      <Sidebar
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        activeLog={activeLog}
        setActiveLog={setActiveLog}
        setDateSelected={setDateSelected}
        dateSelected={dateSelected}
        setInitialArtboard={setInitialArtboard}
        getLogs={getLogs}
        activeTab={activeTab}
        newActiveLog={newActiveLog}
        newActiveTab={newActiveTab}
      />
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
      </div>
    </div>
  );
};

export default App;
