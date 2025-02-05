"use client";

import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const OnboardingEditor = ({
  isToShowJoyride,
  setIsToShowJoyride,
  isInsightsOpened,
  isOptionsOpened,
}: any) => {
  useEffect(() => {
    const isOnboardingEditorHidden = localStorage.getItem(
      "isOnboardingEditorHidden"
    );

    if (
      !isInsightsOpened &&
      !isOptionsOpened &&
      isOnboardingEditorHidden !== "true"
    ) {
      setTimeout(() => {
        setIsToShowJoyride(true);
      }, 2000);
    } else {
      setIsToShowJoyride(false);
    }
  }, [isInsightsOpened, isOptionsOpened]);

  const isMobile = window.innerWidth < 768;

  return (
    <Joyride
      nonce="onboarding-editor"
      run={isToShowJoyride}
      callback={(data: any) => {
        if (data.action === "skip") {
          localStorage.setItem("isOnboardingEditorHidden", "true");
        }

        if (data.status === "finished") {
          localStorage.setItem("isOnboardingEditorHidden", "true");
        }
      }}
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
        tooltip: { borderRadius: 15 },
        tooltipContent: { fontWeight: "bold" },
        spotlight: { borderRadius: 20 },
        buttonNext: {
          fontWeight: "bold",
          borderRadius: 15,
          padding: "10px 20px",
          color: "#fff",
        },
        buttonBack: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: isMobile ? '100%' : 'auto',
          marginBottom: isMobile ? 10 : 0,
        },
        buttonSkip: { color: "#171717", marginBottom: isMobile ? 10 : 0, display: "flex", width: isMobile ? '100%' : 'auto', justifyContent: "center", alignItems: "center", textAlign: "center" },  
        tooltipFooter: isMobile
          ? {
              display: "grid",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }
          : {},
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
          target: isMobile ? ".close-sidemenu-button" : ".sidebar",
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

export default OnboardingEditor;
