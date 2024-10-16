"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { DateTime } from "luxon";
import classNames from "classnames";
import { useRouter } from "next/navigation";

import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({ subsets: ["latin"], weight: "400" });

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
import ArtboardOptions from "../ArtboardOptions";
import ArtboardInsights from "../ArtboardInsights";
import { ArrowUpRight, ChevronRight, LogOut, User } from "lucide-react";

export const EMPTY_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const Editor = ({
  user,
  subscriptionInfo,
  onOpen,
  handleLogout,
  setDefaultPanel,
}: any) => {
  const supabaseClient = useSupabaseClient();
  const [journeyTabs, setJourneyTabs]: any = useState([]);
  const [activeTab, setActiveTab]: any = useState(null);
  const [activeLog, setActiveLog]: any = useState(null);
  const [isOpened, setIsOpened]: any = useState(true);
  const [previewList, setPreviewList]: any = useState(null);
  const [forcedActiveTab, setForcedActiveTab]: any = useState(1);
  const [newJourneyTitle, setNewJourneyTitle]: any = useState("");
  const [isLoading, setIsLoading]: any = useState(false);
  const [font, setFont]: any = useState({ class: reenie.className, code: 1 });

  const [isReadyToRenderArtboard, setIsReadyToRenderArtboard]: any =
    useState(false);

  const { subscription } = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  const today = DateTime.now().toUTC().toJSDate();

  const router = useRouter();

  const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
  const dayWithPad = `0${today.getDate()}`.slice(-2);
  const initialDateSelected = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
  const [selectedDay, setSelectedDay] = useState(initialDateSelected);

  let now = todayDate(getLocalTimeZone());
  const [dateSelected, setDateSelected]: any = useState(now);
  const [isOptionsOpened, setIsOptionsOpened]: any = useState(false);
  const [isInsightsOpened, setIsInsightsOpened]: any = useState(false);
  const [notification, setNotification]: any = useState(null);

  const username = user?.user_metadata?.full_name
    ?.split(" ")
    ?.slice(0, -1)
    ?.join(" ");

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
  const getActiveLog = () => activeLog;

  const handleSwitchNotifications = debounce(
    async (isToEnable: any, setup: any) => {
      setIsLoading(true);
      if (isToEnable) {
        const next_sent = notification?.id ? notification?.next_sent : DateTime.fromJSDate(new Date())
          .plus({ day: 1 })
          .toUTC()
          .toISO();
        const { data, error } = await supabaseClient
          .from("notification")
          .upsert({
            id: notification?.id,
            journey_id: activeTab?.id,
            email: getUser()?.email,
            phone: getUser()?.phone,
            user_id: getUser()?.id,
            when:
              setup === "when"
                ? isToEnable?.target?.value
                : notification?.when || "daily",
            where:
              setup === "where"
                ? isToEnable?.target?.value
                : notification?.where || "email",
            next_sent,
            time: "9:00:00+00:0",
          })
          .select();

        if (data) {
          setNotification(data[0]);
        }
      } else {
        const { data, error } = await supabaseClient
          .from("notification")
          .delete()
          .eq("id", notification?.id);

        setNotification(null);
      }
      setIsLoading(false);
    },
    100
  );

  const handleContentEdit = debounce(async (content: any) => {
    const now = getNow();
    const customDate = getCustomDate();

    const isToCreate = !getActiveLog();

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
          id: getActiveLog()?.id,
          created_at: getActiveLog()?.created_at,
          updated_at: now,
          type: "",
          journey_id: activeTab?.id,
          content,
          user_id: getUser()?.id,
        };
      }
    };
    setIsLoading(true);

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

      getPreviews(dateStringStart, dateStringEnd, activeTab, {
        forceUpdate: true,
      });
    }
    setIsLoading(false);
  }, 2500);

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
  }, 4000);

  const handleJourneyUpdate = debounce(async ({ theme, font }: any) => {
    const { error, data: updatedJourney } = await supabaseClient
      .from("journey")
      .update({ theme: theme || "dark", font: font || "default" })
      .eq("id", activeTab?.id);
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
      setIsOptionsOpened(false);

      if (newTabsToBeRendered && newTabsToBeRendered?.length === 0) {
        setPreviewList([]);
      }
    }
  }, 500);

  const handleTabSelection = async (
    idSelected: any,
    isToReorderList: boolean
  ) => {
    const index = idSelected - 1;
    const activeTab: any =
      journeyTabs.length === 1 ? journeyTabs[0] : journeyTabs[index];

    setIsLoading(true);

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
      activeTab?.id,
      `${dateSelected.year}-${monthWithPad}-${dayWithPad}`
    );

    if (res) {
      setActiveLog(res);
    }

    const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
    const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

    setIsLoading(false);

    getPreviews(dateStringStart, dateStringEnd, activeTab, {
      forceUpdate: true,
    });
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

  const getInsights = async (year: any, journeyId: any) => {
    if (!journeyId) return;
    const start = DateTime.fromISO(`${year}-01-01`)
      .set({ hour: 0, minute: 0, second: 0 })
      .toUTC()
      .toISO();

    const end = DateTime.fromISO(`${year}-01-01`)
      .plus({ year: 1 })
      .set({
        hour: 23,
        minute: 59,
        second: 59,
      })
      .toUTC()
      .toISO();

    setIsLoading(true);

    const { error, data } = await supabaseClient
      .from("log")
      .select()
      .eq("journey_id", journeyId)
      .gt("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    if (data) {
      setIsLoading(false);
      return data;
    }

    setIsLoading(false);
    return [];
  };

  const getPreviews = debounce(
    async (
      dateStringStart: any,
      dateStringEnd: any,
      newTab: any,
      options: any
    ) => {
      if (!newTab?.id) return;
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

      setIsLoading(true);

      const { error, data } = await supabaseClient
        .from("log")
        .select()
        .eq("journey_id", newTab?.id)
        .gt("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: false });

      if (data) {
        const isToForcePreviewList = options.forceUpdate;
        const formattedPreviewList = previewList
          ? [...previewList, ...data]
          : [...data];
        setPreviewList(isToForcePreviewList ? [...data] : formattedPreviewList);
      }

      setIsLoading(false);
    },
    100
  );

  const getTabs = async (options: any = {}) => {
    setIsLoading(true);
    const { isToReorderList } = options;
    const { error, data } = await supabaseClient
      .from("journey")
      .select()
      .order("selected_at", { ascending: false });

    setIsLoading(false);

    if (data && data[0]) {
      setJourneyTabs(data);
      setActiveTab(data[0]);

      if (isToReorderList) {
        setForcedActiveTab(1);
      }

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      setIsLoading(true);

      const res = await getLogs(
        data[0]?.id,
        `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`
      );

      if (res) {
        setActiveLog(res);
      }

      setIsReadyToRenderArtboard(true);
      setIsLoading(false);

      const { data: notification }: any = await supabaseClient
        .from("notification")
        .select()
        .eq("journey_id", data[0]?.id);

      setNotification(notification[0]);
    }
  };

  useEffect(() => {
    getTabs();
  }, []);

  useEffect(() => {
    if (activeTab?.font) {
      const dictionaryFont: any = {
        default: { class: reenie.className, code: 1 },
        formal: { class: nunito.className, code: 2 },
        mono: { class: cutive.className, code: 3 },
      };
      setFont(dictionaryFont[activeTab?.font]);
    }
  }, [activeTab]);

  const todayNote = new Date(
    dateSelected?.year,
    dateSelected?.month - 1,
    dateSelected?.day
  );

  return (
    <div className="w-full h-full editor">
      <ArtboardOptions
        isOptionsOpened={isOptionsOpened}
        setIsOptionsOpened={setIsOptionsOpened}
        handleJourneyDeletion={handleJourneyDeletion}
        handleJourneyUpdate={handleJourneyUpdate}
        activeTab={activeTab}
        notification={notification}
        handleSwitchNotifications={handleSwitchNotifications}
        setFont={setFont}
        font={font}
        isLoading={isLoading}
        subscriptionInfo={subscriptionInfo}
      />
      <ArtboardInsights
        setIsInsightsOpened={setIsInsightsOpened}
        isInsightsOpened={isInsightsOpened}
        getInsights={getInsights}
        activeTab={activeTab}
        isLoading={isLoading}
        previewList={previewList}
        subscriptionInfo={subscriptionInfo}
        onOpenModal={onOpen}
        setDefaultPanel={setDefaultPanel}
      />
      <SidebarCloseLayer isOpened={isOpened} setIsOpened={setIsOpened} />
      <Sidebar
        font={font}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        isBlocked={journeyTabs && journeyTabs?.length < 1}
        setActiveLog={setActiveLog}
        setDateSelected={setDateSelected}
        dateSelected={dateSelected}
        getLogs={getLogs}
        activeTab={activeTab}
        previewList={previewList}
        setPreviewList={setPreviewList}
        getPreviews={getPreviews}
        selectedDay={selectedDay}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedDay={setSelectedDay}
        setIsReadyToRenderArtboard={setIsReadyToRenderArtboard}
      />
      <div
        className={`${font.class} daybadge daybadge-${font.code} fixed z-40 cursor-pointer text-[50px] bottom-[30px] right-[30px] p-4 leading-[30px] rounded-3xl text-[#3b3b3b]`}
        onClick={() => setIsOpened(!isOpened)}
      >
        {todayNote.toLocaleString("default", { month: "short" })},{" "}
        {dateSelected?.day}
      </div>
      <div className="items-start py-5 px-3 md:pl-[280px] md:py-6 w-full justify-start artboard-parent">
        <Navbar
          className="nav-header h-[64px] rounded-2xl nav backdrop-filter-none"
          maxWidth="full"
        >
          <NavbarContent
            justify="center"
            className="rounded-2xl md:pr-3 ml-6 md:ml-0"
          >
            <ArtboardTabs
              journeyTabs={journeyTabs}
              handleTabSelection={handleTabSelection}
              handleCreateJourney={handleCreateJourney}
              forcedActiveTab={forcedActiveTab}
              isPro={isPro}
              onOpenModal={onOpen}
              setDefaultPanel={setDefaultPanel}
            />
          </NavbarContent>
          <NavbarContent justify="end" className="rounded-2xl nav-logout px-1">
            <div
              className={classNames(
                "syncer fixed md:relative translate-y-[-80px] transition-transform left-0 right-0 m-auto w-[40px] h-[40px] z-[15] flex justify-center rounded-full",
                {
                  "active translate-y-[0px]": isLoading,
                }
              )}
            >
              <CircularProgress
                size="sm"
                classNames={{
                  indicator: "stroke-[#39D353]",
                }}
                aria-label="Loading..."
              />
            </div>
            <NavbarItem className="flex justify-center z-[30]">
              <Dropdown>
                <DropdownTrigger>
                  {isPro ? (
                    <div className="relative flex items-center justify-center">
                      <span className="bg-[#39d353] px-[5px] uppercase mr-[-20px] z-40 mt-[-50px] font-black rounded-lg text-[black] text-[10px]">
                        PRO
                      </span>
                      <Avatar
                        className="text-white cursor-pointer clear-start avatar"
                        name={username}
                        size="md"
                      ></Avatar>
                    </div>
                  ) : (
                    // <Badge content="" className="border-1 border-[#39d353]" size="ld">
                    // </Badge>
                    <Avatar
                      className="text-white cursor-pointer clear-start avatar"
                      name={username}
                    />
                  )}
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Static Actions"
                  disabledKeys={["profile"]}
                >
                  <DropdownItem
                    key="profile"
                    onClick={(f) => f}
                    startContent={<User className="w-[20px]" />}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="home"
                    onClick={() => {
                      router.push("/");
                    }}
                    startContent={<ArrowUpRight className="w-[20px]" />}
                  >
                    Go to landing page
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    onClick={handleLogout}
                    startContent={<LogOut className="w-[20px]" />}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="md:py-6 pt-3 md:pt-0 w-full artboard flex-col">
          {isReadyToRenderArtboard &&
            journeyTabs &&
            journeyTabs?.length > 0 && (
              <ArtboardHeader
                handleJourneyDeletion={handleJourneyDeletion}
                handleJourneyNameEdit={handleJourneyNameEdit}
                activeTab={activeTab}
                isOptionsOpened={isOptionsOpened}
                setIsOptionsOpened={setIsOptionsOpened}
                setIsInsightsOpened={setIsInsightsOpened}
                isInsightsOpened={isInsightsOpened}
              />
            )}
          {isReadyToRenderArtboard && journeyTabs && journeyTabs?.length > 0 ? (
            <>
              {activeLog?.content ? (
                <Artboard
                  id={1}
                  initialState={activeLog?.content}
                  setContent={handleContentEdit}
                  font={font}
                />
              ) : (
                <>
                  <Artboard
                    id={2}
                    initialState={EMPTY_STATE}
                    setContent={handleContentEdit}
                    font={font}
                  />
                </>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center items-start">
              {!isLoading && (
                <div className="flex flex-col w-full h-full justify-center md:pl-16">
                  <h1
                    className={`${font.class} text-[40px] text-[#969696] mb-[20px] leading-[40px] w-[400px] max-w-full`}
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
                  <p
                    className={`text-[16px] text-[#454545] my-[30px] mb-5 mt-2`}
                  >
                    Or create yours:
                  </p>
                  <div>
                    <input
                      disabled={true}
                      className="px-4 py-2 text-lg placeholder-gray-500 bg-[#1f1f1f] mb-4 mr-4 rounded-xl h-[50px] outline-none"
                      value={newJourneyTitle}
                      onChange={(e) => setNewJourneyTitle(e?.target?.value)}
                    />
                    <Button
                      disabled={true}
                      variant="bordered"
                      className="bg-[#343434] border-[#343434] h-[50px] text-lg px-6"
                    >
                      Create
                      <ChevronRight />
                    </Button>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
