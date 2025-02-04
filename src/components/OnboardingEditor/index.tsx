"use client";

import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const Onboarding = ({}: any) => {
  const [isToShowJoyride, setIsToShowJoyride] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsToShowJoyride(true);
    }, 2000);
  }, []);
  return (
    <Joyride
      nonce="onboarding-editor"
      run={isToShowJoyride}
      showProgress={true}
      continuous={true}
      styles={{
        options: {
          arrowColor: "#39d353",
          backgroundColor: "#39d353",
          overlayColor: "rgba(0, 0, 0, 0.8)",
          primaryColor: "#171717",
          textColor: "#171717",
          zIndex: 1000,
        },
        tooltip: { borderRadius: 20 },
        tooltipContent: { fontWeight: "bold" },
        spotlight: { borderRadius: 20 },
        buttonNext: {
          fontWeight: "bold",
          borderRadius: 15,
          padding: "10px 20px",
          color: "#fff",
        },
        buttonSkip: { color: "#171717" },
      }}
      showSkipButton={true}
      locale={{
        skip: "Do not show this again",
        back: "Back",
        next: "Next",
        last: "Close",
      }}
      steps={[
        {
          disableBeacon: true,
          target: ".sidebar",
          placement: "right",
          spotlightPadding: 0,
          content: (
            <>
              Here you select the day of the week you want to see your notes.
              There are no future dates, only past dates, because Journeylog is
              a diary, not a planner.
            </>
          ),
          styles: {
            options: {
              width: 400,
            },
          },
        },
        {
          disableBeacon: true,
          target: ".journeynav",
          spotlightPadding: 10,
          content: (
            <>
              Here are the journeys you can create. You can separate them by
              topics, such as: 'Call my mom', 'Study English', 'Exercise',
              'Drink water', etc.
            </>
          ),
          styles: {
            options: {
              width: 500,
            },
          },
        },
        {
          disableBeacon: true,
          target: ".editor-paragraph",
          spotlightPadding: 10,
          content: (
            <>
              This is where you write your notes. It can be text, a common list,
              a checklist, code, or any text format you want.
            </>
          ),
          styles: {
            options: {
              width: 500,
            },
          },
        },
        {
          disableBeacon: true,
          target: ".insights-button",
          spotlightPadding: 10,
          content:
            "Here you track your writing statistics (charts). You can see how many times you wrote and the consistency in which you are building your habit.",
          styles: {
            options: {
              width: 500,
            },
          },
        },
        {
          disableBeacon: true,
          target: ".options-button",
          placement: "left",
          spotlightPadding: 5,
          content:
            "Here you see your journey settings and can choose theme, notifications, font type, or delete that journey.",
          styles: {
            options: {
              width: 400,
            },
          },
        },
      ]}
    />
  );
};

export default Onboarding;
