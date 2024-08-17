"use client";

import { useEffect, useState } from "react";
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
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  CircularProgress,
  Button,
} from "@nextui-org/react";

import { debounce } from "lodash";
import Artboard from "../Artboard";
import Sidebar from "../Sidebar";
import SidebarCloseLayer from "../SidebarCloseLayer";
import ArtboardHeader from "../ArtboardHeader";
import ArtboardTabs from "../ArtboardTabs";

const EMPTY_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const App = ({ user }: any) => {
  const supabaseClient = useSupabaseClient();
  const [journeyTabs, setJourneyTabs]: any = useState([]);
  const [activeTab, setActiveTab]: any = useState(null);
  const [activeLog, setActiveLog]: any = useState(null);
  const [isOpened, setIsOpened]: any = useState(true);
  const [previewList, setPreviewList]: any = useState(null);
  const [forcedActiveTab, setForcedActiveTab]: any = useState(1);
  const [newJourneyTitle, setNewJourneyTitle]: any = useState("");

  const [isReadyToRenderArtboard, setIsReadyToRenderArtboard]: any =
    useState(false);

  const today = DateTime.now().toUTC().toJSDate();

  const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
  const dayWithPad = `0${today.getDate()}`.slice(-2);
  const initialDateSelected = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
  const [selectedDay, setSelectedDay] = useState(initialDateSelected);

  let now = todayDate(getLocalTimeZone());
  const [dateSelected, setDateSelected]: any = useState(now);

  const username = user?.user_metadata?.full_name
    .split(" ")
    .slice(0, -1)
    .join(" ");

  const getNow = () => DateTime.now().toUTC().toISO();
  const getCustomDate = () =>
    DateTime.fromJSDate(new Date())
      .set({
        day: dateSelected.day,
        month: dateSelected.month,
        year: dateSelected.year,
      })
      .toUTC()
      .toISO();

  const getUser = () => user;

  const handleContentEdit = debounce(async (content: any, options) => {
    const now = getNow();
    const customDate = getCustomDate();

    const isToCreate = !activeLog;

    const payloadToSend = (condition: boolean) => {
      if (condition) {
        return {
          created_at: customDate,
          updated_at: now,
          type: "",
          journey_id: activeTab?.id,
          content,
          user_id: getUser()?.id,
        };
      } else {
        return {
          id: activeLog?.id,
          created_at: activeLog?.created_at,
          updated_at: now,
          type: "",
          journey_id: activeTab?.id,
          content,
          user_id: getUser()?.id,
        };
      }
    };

    const { data, error } = await supabaseClient
      .from("log")
      .upsert(payloadToSend(isToCreate))
      .select();

    if (data && data[0]) {
      setActiveLog(data[0]);

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      getPreviews(dateStringStart, dateStringEnd, activeTab);
    }
  }, 500);

  const handleJourneyNameEdit = debounce(async (e: any) => {
    const value = e?.target?.value;
    const { error, data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ name: value, updated_at: DateTime.now().toUTC().toISO() })
      .eq("id", activeTab?.id)
      .select();

    if (updatedJourney) {
      const updatedTabList = journeyTabs.map((item: any) => {
        if (item?.id === updatedJourney[0].id) {
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
      const newTabsToBeRendered = journeyTabs.filter((item: any) => {
        return item.id !== itemDeleted.id;
      });

      setJourneyTabs(newTabsToBeRendered);
    }
  }, 500);

  const handleTabSelection = async (
    idSelected: any,
    isToReorderList: boolean
  ) => {
    const index = idSelected - 1;
    const activeTab: any = journeyTabs.length === 1 ? journeyTabs[0] : journeyTabs[index];

    const { data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ selected_at: DateTime.now().toUTC().toISO() })
      .eq("id", activeTab?.id)
      .select();

    if (isToReorderList && updatedJourney) {
      getTabs({ isToReorderList });
    }

    setActiveTab(activeTab);
    setActiveLog(null);

    const monthWithPad: string = `0${dateSelected.month}`.slice(-2);
    const dayWithPad: string = `0${dateSelected.day}`.slice(-2);

    const res = await getLogs(
      activeTab.id,
      `${dateSelected.year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
    }

    const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
    const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

    getPreviews(dateStringStart, dateStringEnd, activeTab);
  };

  const handleCreateJourney = debounce(async (e: any) => {
    const journeyTitle = e?.target?.textContent;
    await supabaseClient.from("journey").insert({
      name: journeyTitle || "🏆 New journey",
    });

    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("updated_at", { ascending: false });

    if (data) {
      setJourneyTabs([]);
      setActiveTab(data[0]);
      setIsReadyToRenderArtboard(true);
      setTimeout(() => {
        setJourneyTabs([...data]);
      }, 100);
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

  const getPreviews = debounce(
    async (dateStringStart: any, dateStringEnd: any, activeTab: any) => {
      const start = DateTime.fromISO(dateStringStart)
        .minus({ month: 1 })
        .set({ hour: 0, minute: 0, second: 0 })
        .toUTC()
        .toISO();

      const end = DateTime.fromISO(dateStringEnd)
        .plus({ day: 1 })
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
        .eq("journey_id", activeTab?.id)
        .gt("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: false });

      if (data) {
        setPreviewList(data);
      }
    },
    100
  );

  const getTabs = async (options: any = {}) => {
    const { isToReorderList } = options;
    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("selected_at", { ascending: false });

    if (data && data[0]) {
      setJourneyTabs(data);
      setActiveTab(data[0]);

      if (isToReorderList) {
        setForcedActiveTab(1);
      }

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const res = await getLogs(
        data[0]?.id,
        `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`
      );

      if (res) {
        setActiveLog(res);
      }

      setIsReadyToRenderArtboard(true);
    }
  };

  useEffect(() => {
    getTabs();
  }, []);

  return (
    <div className="flex bg-[#171717] w-full h-full relative">
      <SidebarCloseLayer isOpened={isOpened} setIsOpened={setIsOpened} />
      <Sidebar
        isOpened={isOpened}
        isBlocked={journeyTabs && journeyTabs?.length < 1}
        setIsOpened={setIsOpened}
        setActiveLog={setActiveLog}
        setDateSelected={setDateSelected}
        dateSelected={dateSelected}
        getLogs={getLogs}
        activeTab={activeTab}
        previewList={previewList}
        setPreviewList={setPreviewList}
        getPreviews={getPreviews}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        setIsReadyToRenderArtboard={setIsReadyToRenderArtboard}
      />
      <div className="items-start py-5 md:py-6 w-full flex flex-col h-full overflow-y-scroll overflow-x-hidden justify-start artboard-parent">
        <Navbar
          className="nav_header h-[64px] bg-transparent nav backdrop-filter-none"
          maxWidth="full"
        >
          <NavbarContent
            justify="center"
            className="rounded-2xl md:pr-3 ml-10 md:ml-0"
          >
            <ArtboardTabs
              journeyTabs={journeyTabs}
              handleTabSelection={handleTabSelection}
              handleCreateJourney={handleCreateJourney}
              forcedActiveTab={forcedActiveTab}
            />
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
        <div className="px-2 md:p-6 pt-3 md:pt-0 w-full h-full artboard flex-col">
          {isReadyToRenderArtboard &&
            journeyTabs &&
            journeyTabs?.length > 0 && (
              <ArtboardHeader
                handleJourneyDeletion={handleJourneyDeletion}
                handleJourneyNameEdit={handleJourneyNameEdit}
                activeTab={activeTab}
              />
            )}
          {isReadyToRenderArtboard && journeyTabs && journeyTabs?.length > 0 ? (
            <>
              {activeLog?.content ? (
                <Artboard
                  id={1}
                  initialState={activeLog?.content}
                  setContent={handleContentEdit}
                />
              ) : (
                <Artboard
                  id={2}
                  initialState={EMPTY_STATE}
                  setContent={handleContentEdit}
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-start">
              {journeyTabs && journeyTabs?.length > 0 ? (
                <CircularProgress aria-label="Loading..." />
              ) : (
                <div className="flex flex-col w-full h-full justify-center md:pl-16">
                  <h1
                    className={`${reenie.className} text-[60px] text-[#969696] mb-[40px] leading-[60px] w-[460px] max-w-full`}
                  >
                    Start by creating your new habit journey
                  </h1>
                  <p className={`text-[16px] text-[#454545] mb-[10px]`}>
                    Something like:
                  </p>
                  <div className="w-full flex flex-wrap justify-start items-start max-w-[470px]">
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      🏋🏽 Workout on weekdays
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      👩🏽‍🦳 Call mom everyday
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      🚰 Drink water
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      🗣️ To learn a new language
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      🧘🏽 Daily meditation
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      🍏 Eat fruits
                    </Button>
                    <Button
                      className="my-3 mr-2 text-[#6a6a6a] border-[#454545] text-lg"
                      variant="bordered"
                      onClick={(e) => handleCreateJourney(e)}
                    >
                      📚 To read consistently
                    </Button>
                  </div>
                  <p className={`text-[16px] text-[#454545] my-[30px] mb-5`}>
                    Or create yours:
                  </p>
                  <div>
                    <input
                      disabled={true}
                      className="px-4 py-2 text-lg bg-[#1f1f1f] rounded-l-lg h-[50px] outline-none"
                      value={newJourneyTitle}
                      onChange={(e) => setNewJourneyTitle(e?.target?.value)}
                    />
                    <Button disabled={true} className="rounded-l-none bg-[#343434] h-[50px] text-lg px-6">
                      Start
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="h-[50px] shrink-0"></div>
      </div>
    </div>
  );
};

export default App;
