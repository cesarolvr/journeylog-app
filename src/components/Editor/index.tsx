"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import * as motion from "motion/react-client";

// Libs components
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
import {
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  Copy,
  LogOut,
  Trash,
  User,
} from "lucide-react";
import ReactConfetti from "react-confetti";
import dynamic from "next/dynamic";

// Components
import Artboard from "../Artboard";
import Sidebar from "../Sidebar";
import SidebarCloseLayer from "../SidebarCloseLayer";
import ArtboardHeader from "../ArtboardHeader";
import ArtboardTabs from "../ArtboardTabs";
import ArtboardOptions from "../ArtboardOptions";
import ArtboardInsights from "../ArtboardInsights";

// Custom hook
import useEditor from "./hooks";
import useEditorHandlers from "./handlers";
import { getDaysDetailsInMonth, isValidDate, formatNaturalDate } from "@/utils";
import { CalendarDate } from "@internationalized/date";
import { DateTime } from "luxon";

// Static props
export const EMPTY_STATE = `{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

const Editor = ({
  user,
  subscriptionInfo,
  onOpen,
  handleLogout,
  setTheme,
  setDefaultPanel,
}: any) => {
  // Libs hooks
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [canShowToast, setCanShowToast] = useState(true);

  // Custom hook
  const { states, fonts, baseProps } = useEditor({ user });

  // Components fonts
  const { reenie, cutive, nunito } = fonts;

  // Components states
  const {
    journeyTabs,
    setJourneyTabs,
    activeTab,
    setActiveTab,
    activeLog,
    setActiveLog,
    isOpened,
    setIsOpened,
    previewList,
    setPreviewList,
    forcedActiveTab,
    setForcedActiveTab,
    isLoading,
    setIsLoading,
    journeyName,
    setJourneyName,
    isToShowJoyride,
    setIsToShowJoyride,
    font,
    setFont,
    isReadyToRenderArtboard,
    setIsReadyToRenderArtboard,
    isChangingTabs,
    setIsChangingTabs,
    dateSelected,
    setDateSelected,
    isOptionsOpened,
    setIsOptionsOpened,
    isInsightsOpened,
    setIsInsightsOpened,
    notification,
    setNotification,
    selectedDay,
    setSelectedDay,
    isToRunConfetti,
    setIsToRunConfetti,
    isLoadingData,
    setIsLoadingData,
  } = states;

  // Base props
  const { username, today, todayNote, getUser } = baseProps;
  const { subscription } = subscriptionInfo;
  const isPro = subscription === "habit_creator";
  const profilePic = user?.user_metadata?.avatar_url;

  // Handlers
  const {
    handleSwitchNotifications,
    handleJourneyName,
    handleJourneyNameEdit,
    handleJourneyDeletion,
    handleTabSelection,
    getTabs,
    handleJourneyUpdate,
    handleCreateJourney,
    getInsights,
    getPreviews,
    getLogs,
    handleLogRemotion,
    handleContentEdit,
    handleCopyToClipboard,
  } = useEditorHandlers({
    isToRunConfetti,
    setIsToRunConfetti,
    setIsLoading,
    setIsReadyToRenderArtboard,
    setActiveLog,
    setIsChangingTabs,
    setPreviewList,
    activeLog,
    today,
    previewList,
    setForcedActiveTab,
    setIsOptionsOpened,
    dateSelected,
    setTheme,
    setJourneyTabs,
    journeyTabs,
    setJourneyName,
    notification,
    setDefaultPanel,
    onOpen,
    isPro,
    setActiveTab,
    setNotification,
    getUser,
    activeTab,
    supabaseClient,
    setCanShowToast,
    canShowToast,
    setIsLoadingData,
    isLoadingData,
  });

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

  const OnboardingEditor = dynamic(
    () => import("../../components/OnboardingEditor"),
    { ssr: false }
  );

  const customToday = DateTime.now().toUTC().toJSDate();

  const [days, setDays] = useState([]);

  const [lastMonthLoaded, setLastMonthLoaded] = useState(
    customToday.getMonth() + 1
  );
  const [lastYearLoaded, setLastYearLoaded] = useState(
    customToday.getFullYear()
  );

  const handleGoToDate = (date: string) => {
    setIsReadyToRenderArtboard(false);
    setActiveLog(null);
    const [day, month, year] = date.split("/").map(Number);

    const newDate = new CalendarDate(year, month, day);

    if (month !== lastMonthLoaded || year !== lastYearLoaded) {
      const newDays: any = getDaysDetailsInMonth(month, year);
      setLastMonthLoaded(month);
      setLastYearLoaded(year);
      setDays(newDays);
    }

    const monthWithPad = `0${month}`.slice(-2);
    const dayWithPad = `0${day}`.slice(-2);
    const id = `${year}-${monthWithPad}-${dayWithPad}`;

    setDateSelected(newDate);
    setSelectedDay(id);

    setTimeout(async () => {
      const element = document.querySelector(`#day-${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      const res = await getLogs(activeTab.id, id);
      if (res) {
        setActiveLog(res);
      }

      setIsReadyToRenderArtboard(true);
      setIsInsightsOpened(false);
    }, 100);
  };

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
        userInfo={user}
        isLoading={isLoading}
        onOpenModal={onOpen}
        subscriptionInfo={subscriptionInfo}
        setDefaultPanel={setDefaultPanel}
      />
      <ArtboardInsights
        setIsInsightsOpened={setIsInsightsOpened}
        isInsightsOpened={isInsightsOpened}
        journeyTabs={journeyTabs}
        getInsights={getInsights}
        activeTab={activeTab}
        isLoading={isLoading}
        previewList={previewList}
        subscriptionInfo={subscriptionInfo}
        onOpenModal={onOpen}
        setDefaultPanel={setDefaultPanel}
        handleGoToDate={handleGoToDate}
      />
      <SidebarCloseLayer isOpened={isOpened} setIsOpened={setIsOpened} />
      <Sidebar
        font={font}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        isBlocked={journeyTabs && journeyTabs?.length < 1}
        setActiveLog={setActiveLog}
        activeLog={activeLog}
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
        days={days}
        setDays={setDays}
        lastMonthLoaded={lastMonthLoaded}
        lastYearLoaded={lastYearLoaded}
        setLastMonthLoaded={setLastMonthLoaded}
        setLastYearLoaded={setLastYearLoaded}
        setCanShowToast={setCanShowToast}
      />
      <div
        className={`${font.class} daybadge daybadge-${font.code} fixed z-40 cursor-pointer text-[25px] md:text-[50px] bottom-[10px] right-[10px] md:bottom-[30px] md:right-[30px] leading-[30px] md:rounded-3xl rounded-xl text-[#3b3b3b]`}
        onClick={() => setIsOpened(!isOpened)}
      >
        <Dropdown className="bg-[#202020]">
          <DropdownTrigger>
            <Button className="text-[25px] md:text-[35px] py-2 px-4 md:px-4 md:py-7 bg-[#282828] rounded-2xl">
              {todayNote.toLocaleString("default", { month: "short" })},{" "}
              {dateSelected?.day}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            disabledKeys={
              activeLog?.content ? [] : ["export", "copy", "delete"]
            }
            items={[
              {
                icon: <Copy />,
                key: "copy",
                label: "Copy as text",
                handler: handleCopyToClipboard,
              },
              {
                icon: <Trash />,
                key: "delete",
                handler: handleLogRemotion,
                label: `Delete log for ${formatNaturalDate(
                  new Date(
                    dateSelected.year,
                    dateSelected.month - 1,
                    dateSelected.day
                  )
                )}`,
              },
            ]}
          >
            {({ key, icon, label, handler }) => (
              <DropdownItem
                key={key}
                onPress={() => {
                  handler && handler();
                }}
                className={` ${key === "delete" ? "text-danger" : ""}`}
                color={key === "delete" ? "danger" : "default"}
              >
                <div className="flex items-center my-[3px]">
                  {icon}
                  <p className="ml-2">{label}</p>
                </div>
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
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
            {journeyTabs && journeyTabs?.length > 0 && (
              <ArtboardTabs
                journeyTabs={journeyTabs}
                handleTabSelection={handleTabSelection}
                handleCreateJourney={handleCreateJourney}
                forcedActiveTab={forcedActiveTab}
                isPro={isPro}
                onOpenModal={onOpen}
                setDefaultPanel={setDefaultPanel}
              />
            )}
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
                        src={profilePic}
                        fallback={username}
                      ></Avatar>
                    </div>
                  ) : (
                    <Avatar
                      className="text-white cursor-pointer clear-start avatar"
                      src={profilePic}
                      name={username}
                      fallback={username}
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
                    key="tour"
                    onPress={() => {
                      // router.push("/");
                      localStorage.setItem("isOnboardingEditorHidden", "false");
                      localStorage.setItem(
                        "isOnboardingOptionsHidden",
                        "false"
                      );
                      localStorage.setItem(
                        "isOnboardingInsightsHidden",
                        "false"
                      );

                      setIsToShowJoyride(true);
                    }}
                    className="text-[#39d353]"
                    startContent={
                      <CircleHelp className="w-[20px] stroke-[#39d353]" />
                    }
                  >
                    View the tour again
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
                <div className=" flex flex-col w-full h-full justify-center pl-3 md:pl-12">
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
                  <div className="choose w-full flex flex-wrap justify-start items-start max-w-[90%]">
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
                        className="my-3 mr-2 text-left text-sm md:text-lg bg-[#262626] text-[#fff] hover:bg-[#39d353] hover:text-[#171717] hover:!scale-105 rounded-xl py-2 px-3 md:px-6 transition-all duration-200"
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
                    className="customone flex items-center md:flex-row flex-col"
                  >
                    <input
                      type="email"
                      name="newjourney"
                      placeholder="🚀  New Journey"
                      className="mr-3 px-5 w-full outline-none md:w-[300px] text-[#fff] placeholder:text-[#fff] text-left placeholder:opacity-50 h-[70px] border-2 border-[#39d353] rounded-2xl text-[20px]"
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
