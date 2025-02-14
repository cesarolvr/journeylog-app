import { useState } from "react";
import { getLocalTimeZone, today as todayDate } from "@internationalized/date";

// Custom fonts
import { Reenie_Beanie, Nunito_Sans, Cutive_Mono } from "next/font/google";
import { DateTime } from "luxon";
const reenie = Reenie_Beanie({ subsets: ["latin"], weight: "400" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: "400" });
const cutive = Cutive_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cutive",
});

const useEditor = ({ user }: any) => {

  // States
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
  const [dateSelected, setDateSelected]: any = useState(todayDate(getLocalTimeZone()));
  const [isOptionsOpened, setIsOptionsOpened]: any = useState(false);
  const [isInsightsOpened, setIsInsightsOpened]: any = useState(false);
  const [notification, setNotification]: any = useState(null);

  const today = DateTime.now().toUTC().toJSDate();
  const dayWithPad = `0${today.getDate()}`.slice(-2);
  const monthWithPad = `0${today.getMonth() + 1}`.slice(-2);
  const initialDateSelected = `${today.getFullYear()}-${monthWithPad}-${dayWithPad}`;
  const [selectedDay, setSelectedDay] = useState(initialDateSelected);
  const [isToRunConfetti, setIsToRunConfetti] = useState(false);


  // Props
  const username = user?.user_metadata?.full_name
    ?.split(" ")
    ?.slice(0, -1)
    ?.join(" ");
  const todayNote = new Date(
    dateSelected?.year,
    dateSelected?.month - 1,
    dateSelected?.day
  );

  // Handlers
  const getUser = () => user;

  return {
    states: {
      journeyTabs, setJourneyTabs,
      activeTab, setActiveTab,
      activeLog, setActiveLog,
      isOpened, setIsOpened,
      previewList, setPreviewList,
      forcedActiveTab, setForcedActiveTab,
      isLoading, setIsLoading,
      journeyName, setJourneyName,
      isToShowJoyride, setIsToShowJoyride,
      font, setFont,
      isReadyToRenderArtboard, setIsReadyToRenderArtboard,
      isChangingTabs, setIsChangingTabs,
      dateSelected, setDateSelected,
      isOptionsOpened, setIsOptionsOpened,
      isInsightsOpened, setIsInsightsOpened,
      notification, setNotification,
      selectedDay, setSelectedDay,
      isToRunConfetti, setIsToRunConfetti
    },
    fonts: {
      reenie, nunito, cutive
    },
    baseProps: {
      username,
      today,
      todayNote,
      getUser
    }

  }

}

export default useEditor;