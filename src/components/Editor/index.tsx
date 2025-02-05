"use client";

import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { DateTime } from "luxon";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cutive",
});

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
  Input,
} from "@nextui-org/react";

import { debounce } from "lodash";
import Artboard from "../Artboard";
import Sidebar from "../Sidebar";
import SidebarCloseLayer from "../SidebarCloseLayer";
import ArtboardHeader from "../ArtboardHeader";
import ArtboardTabs from "../ArtboardTabs";
import ArtboardOptions from "../ArtboardOptions";
import ArtboardInsights from "../ArtboardInsights";
import {
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  LogOut,
  User,
} from "lucide-react";
import ReactConfetti from "react-confetti";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

export const EMPTY_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const Editor = ({
  user,
  subscriptionInfo,
  onOpen,
  handleLogout,
  setTheme,
  setDefaultPanel,
}: any) => {
  const supabaseClient = useSupabaseClient();
  const [journeyTabs, setJourneyTabs]: any = useState([]);
  const [activeTab, setActiveTab]: any = useState(null);
  const [activeLog, setActiveLog]: any = useState(null);
  const [isOpened, setIsOpened]: any = useState(true);
  const [previewList, setPreviewList]: any = useState(null);
  const [forcedActiveTab, setForcedActiveTab]: any = useState(1);
  const [isLoading, setIsLoading]: any = useState(false);
  const [journeyName, setJourneyName]: any = useState("");
  const [isToShowJoyride, setIsToShowJoyride] = useState(false);
  const [font, setFont]: any = useState({ class: reenie.className, code: 1 });

  const [isReadyToRenderArtboard, setIsReadyToRenderArtboard]: any =
    useState(false);

  const [isChangingTabs, setIsChangingTabs]: any = useState(false);

  const { subscription } = subscriptionInfo;
  const isPro = subscription === "habit_creator";

  const handleJourneyName = (e: any) => {
    setJourneyName(e?.target.value);
  };

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

  const getUser = () => user;

  const handleSwitchNotifications = debounce(
    async (isToEnable: any, setup: any) => {
      const isWhen = setup === "when";
      const isWhere = setup === "where";
      const isWhat = setup === "what";

      if (!isPro && isToEnable.target.value === true) {
        onOpen();
        setDefaultPanel("subscription");
      } else {
        setIsLoading(true);
        if (isToEnable?.target?.value) {
          const valueWhen = isWhen
            ? isToEnable?.target?.value
            : activeTab?.frequency;

          const valueWhere = isWhere
            ? isToEnable?.target?.value
            : notification?.where;

          const valueWhat = isWhat
            ? isToEnable?.target?.value?.split("-")[0]
            : DateTime.fromISO(notification?.next_sent).hour;

          const nextSent = notification?.id
            ? DateTime.fromISO(notification?.next_sent)
                .set({
                  hour: valueWhat ? valueWhat : 9,
                  minute: 0,
                  second: 0,
                })
                .plus({ day: isWhat || isWhere ? 0 : 1 })
                .toUTC()
                .toISO()
            : DateTime.fromJSDate(new Date())
                .set({ hour: 9, minute: 0, second: 0 })
                .plus({ day: 1 })
                .toUTC()
                .toISO();

          const newNextSent = isWhen
            ? DateTime.fromJSDate(new Date())
                .set({ hour: valueWhat ? valueWhat : 9, minute: 0, second: 0 })
                .plus(
                  valueWhen === "weekly"
                    ? { week: 1 }
                    : valueWhen === "monthly"
                    ? { month: 1 }
                    : { day: 1 }
                )
                .toUTC()
                .toISO()
            : nextSent;

          if (isPro) {
            const { data, error } = await supabaseClient
              .from("notification")
              .upsert({
                id: notification?.id,
                journey_id: activeTab?.id,
                email: getUser()?.email,
                phone: getUser()?.phone,
                user_id: getUser()?.id,
                when: valueWhen,
                where: valueWhere,
                next_sent: newNextSent,
                journey_name: activeTab?.name,
                user_name:
                  getUser()?.user_metadata?.full_name || getUser()?.email,
              })
              .select();

            if (data) {
              setNotification(data[0]);
            }
          }
          setActiveTab({ ...activeTab, frequency: valueWhen });

          if (isWhen) {
            handleJourneyUpdate({ frequency: valueWhen });
          }
        } else {
          await supabaseClient
            .from("notification")
            .delete()
            .eq("id", notification?.id);

          setNotification(null);
        }
        setIsLoading(false);
      }
    },
    100
  );

  const handleContentEdit = debounce(async (content: any) => {
    const now = getNow();
    const customDate = DateTime.fromJSDate(new Date())
      .set({
        day: dateSelected.day,
        month: dateSelected.month,
        year: dateSelected.year,
      })
      .toUTC();

    const logId = `log_${getUser()?.id}_${
      activeTab?.id
    }_${customDate.toISODate()}`;

    const { data, error } = await supabaseClient
      .from("log")
      .upsert({
        id: logId,
        created_at: activeLog ? activeLog?.created_at : customDate.toISO(),
        updated_at: now,
        type: "",
        journey_id: activeTab?.id,
        content,
        user_id: getUser()?.id,
      })
      .select();

    if (data && data[0]) {
      setActiveLog(data[0]);

      const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
      const dayWithPad = `0${today?.getDate()}`.slice(-2);

      const dateStringStart = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
      const dateStringEnd = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;

      getPreviews(
        dateStringStart,
        dateStringEnd,
        activeTab,
        {
          forceUpdate: true,
        },
        false
      );

      const isToCreate = !activeLog;

      if (isToCreate) {
        setIsToRunConfetti(true);
        toast("Mission accomplished for today!  🚀");
      }
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
      setJourneyTabs([...updatedTabList]);
    }
  }, 200);

  const handleJourneyUpdate = debounce(
    async ({ theme, font, frequency }: any) => {
      await supabaseClient
        .from("journey")
        .update({
          theme: theme || "dark",
          font: font || "default",
          frequency: frequency || "daily",
        })
        .eq("id", activeTab?.id);

      setActiveTab({
        ...activeTab,
        theme,
        font,
        frequency: frequency || activeTab.frequency,
      });
    },
    1000
  );

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

      handleTabSelection(2, true);

      setJourneyTabs(newTabsToBeRendered);
      setIsOptionsOpened(false);

      if (newTabsToBeRendered && newTabsToBeRendered?.length === 0) {
        setPreviewList([]);
        setTheme("dark");
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

    setActiveTab(null);
    setNotification(null);
    setIsChangingTabs(true);
    setIsReadyToRenderArtboard(false);

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

    const dateStringEnd = DateTime.now().toUTC().toISODate();
    const dateStringStart = DateTime.now()
      .minus({ month: 1 })
      .toUTC()
      .toISODate();

    setIsLoading(false);

    getPreviews(dateStringStart, dateStringEnd, activeTab, {
      forceUpdate: true,
    });

    const { data: notification }: any = await supabaseClient
      .from("notification")
      .select()
      .eq("journey_id", activeTab.id);

    setNotification(notification[0]);
    setIsReadyToRenderArtboard(true);
    setIsChangingTabs(false);
  };

  const handleCreateJourney = debounce(async (e: any, type: any) => {
    const journeyTitle = type === "input" ? e : e?.target?.textContent;
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
      options: any,
      isToShowLoader: boolean = true
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

      isToShowLoader && setIsLoading(true);

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

      isToShowLoader && setIsLoading(false);
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
      setIsLoading(false);

      const { data: notification }: any = await supabaseClient
        .from("notification")
        .select()
        .eq("journey_id", data[0]?.id);

      setNotification(notification[0]);
    }

    setIsLoading(false);
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

  const [isToRunConfetti, setIsToRunConfetti] = useState(false);

  const OnboardingEditor = dynamic(
    () => import("../../components/OnboardingEditor"),
    { ssr: false }
  );

  return (
    <div className={`w-full h-full editor ${cutive.variable}`}>
      <OnboardingEditor
        isInsightsOpened={isInsightsOpened}
        isOptionsOpened={isOptionsOpened}
        isToShowJoyride={isToShowJoyride}
        setIsToShowJoyride={setIsToShowJoyride}
      />
      {isToRunConfetti && (
        <ReactConfetti
          width={window?.innerWidth}
          height={window?.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          tweenDuration={10000}
          colors={["#27DE54", "#5FDB7D", "#3D6D49", "#fff"]}
          className={`!z-50 !fixed pointer-events-none`}
        />
      )}
      <div
        className={classNames(
          "syncer fixed translate-y-[-50px] w-[40px] h-[40px] transition-transform left-0 right-0 m-auto z-[90] inline-flex justify-center rounded-full",
          {
            "active translate-y-[110px]": isLoading,
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
        className={`${font.class} daybadge daybadge-${font.code} fixed z-40 cursor-pointer text-[25px] md:text-[50px] bottom-[10px] right-[10px] md:bottom-[30px] md:right-[30px] py-2 px-4 md:p-4 leading-[30px] md:rounded-3xl rounded-xl text-[#3b3b3b]`}
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
            className="journeynav rounded-2xl md:pr-3 ml-6 md:ml-0"
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
                    <Avatar
                      className="text-white cursor-pointer clear-start avatar"
                      name={username}
                    />
                  )}
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem
                    key="profile"
                    onPress={() => {
                      onOpen();
                      setDefaultPanel("profile");
                    }}
                    startContent={<User className="w-[20px]" />}
                  >
                    Profile
                  </DropdownItem>
                  <DropdownItem
                    key="home"
                    onPress={() => {
                      router.push("/");
                    }}
                    startContent={<ArrowUpRight className="w-[20px]" />}
                  >
                    Go to landing page
                  </DropdownItem>
                  <DropdownItem
                    key="home"
                    onPress={() => {
                      // router.push("/");
                      localStorage.setItem("isOnboardingEditorHidden", "false");
                      localStorage.setItem("isOnboardingOptionsHidden", "false");
                      localStorage.setItem("isOnboardingInsightsHidden", "false");
                      
                      setIsToShowJoyride(true);
                    }}
                    startContent={<CircleHelp className="w-[20px]" />}
                  >
                    See app tour
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    onPress={handleLogout}
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
            <Artboard
              id={1}
              initialState={activeLog?.content}
              setContent={handleContentEdit}
              font={font}
            />
          ) : isChangingTabs ? null : (
            <div className="w-full flex justify-center items-start">
              {!isLoading && (
                <div className="flex flex-col w-full h-full justify-center pl-3 md:pl-12">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={`text-[20px] text-[#fff] mb-[20px] w-400px] max-w-full`}
                  >
                    Choose:
                  </motion.h1>
                  <div className="w-full flex flex-wrap justify-start items-start max-w-[90%]">
                    {[
                      "🏋🏽 Workout on weekdays",
                      "👩🏽‍🦳 Call mom everyday",
                      "🚰 Drink water",
                      "🗣️ To learn a new language",
                      "🧘🏽 Daily meditation",
                      "🍏 Eat fruits",
                      "📚 To read consistently",
                      "🏃‍♂️ Run every morning",
                      "🎨 Practice drawing",
                      "🎸 Learn guitar",
                      "🥗 Eat healthy meals",
                      "🧹 Clean the house",
                      "💼 Work on side project",
                      "🛌 Get 8 hours of sleep",
                      "📝 Journal daily",
                      "🚴‍♂️ Bike to work",
                      "🧑‍💻 Code daily",
                      "🎤 Practice singing",
                      "📅 Plan your week",
                      "💪 Strength training",
                      "🧑‍🍳 Cook new recipes",
                      "🧵 Learn to sew",
                      "🎾 Play tennis",
                      "🎥 Watch documentaries",
                      "🧩 Solve puzzles",
                      "🏃‍♀️ Go for a walk",
                      "📖 Study for exams",
                      "🎹 Practice piano",
                    ].map((text, index) => (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.1,
                          delay: index / 15,
                        }}
                        key={text}
                        className="my-3 mr-2 text-left text-sm md:text-lg bg-[#262626] text-[#fff] hover:bg-[#39d353] hover:text-[#171717] rounded-xl py-2 px-3 md:px-6"
                        onClick={(e) => handleCreateJourney(e, null)}
                      >
                        {text}
                      </motion.button>
                    ))}
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.5,
                    }}
                    className={`text-[20px] text-[#ffffff] mt-10 mb-[20px] leading-[40px] w-[400px] max-w-full`}
                  >
                    Or create yours:
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.5,
                    }}
                    className="flex items-center md:flex-row flex-col"
                  >
                    <input
                      type="email"
                      name="newjourney"
                      placeholder="🚀  New Journey"
                      className="mr-3 px-5 w-full mb-4 outline-none md:w-[300px] text-[#fff] placeholder:text-[#fff] text-left placeholder:opacity-50 h-[70px] border-2 border-[#39d353] rounded-2xl text-[20px]"
                      onChange={handleJourneyName}
                    />
                    <Button
                      isDisabled={!!journeyName ? false : true}
                      variant="bordered"
                      onPress={() => {
                        handleCreateJourney(journeyName, "input");
                      }}
                      className="h-[70px] w-full md:w-auto rounded-2xl font-black text-[20px] bg-[#39d353] border-[#39d353] text-[black] px-6 disabled:bg-[#626262] disabled:text-[#d0d0d0] disabled:border-[#626262]"
                    >
                      Create
                      <ChevronRight className="mr-[-10px]" />
                    </Button>
                  </motion.div>
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
