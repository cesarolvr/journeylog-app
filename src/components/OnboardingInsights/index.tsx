"use client";

import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const OnboardingInsights = ({ isInsightsOpened }: any) => {
  const [isToShowOnboarding, setiIsToShowOnboarding] = useState(false);

  useEffect(() => {
    if (isInsightsOpened) {
      setTimeout(() => {
        setiIsToShowOnboarding(true);
      }, 1000);
    }
  }, [isInsightsOpened]);
  return (
    <Joyride
      nonce="onboarding-insights"
      run={isToShowOnboarding}
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
          target: ".inarow",
          placement: "bottom",
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
          target: ".frequency",
          placement: "bottom",
          spotlightPadding: 10,
          content: (
            <>
              Here you select the day of the week you want to see your notes.
              There are no future dates, only past dates, because Journeylog is
              a diary, not a planner.
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
          target: ".consistency",
          placement: "bottom",
          spotlightPadding: 10,
          content: (
            <>
              Here you select the day of the week you want to see your notes.
              There are no future dates, only past dates, because Journeylog is
              a diary, not a planner.
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
          target: ".density",
          placement: "bottom",
          spotlightPadding: 10,
          content: (
            <>
              Here you select the day of the week you want to see your notes.
              There are no future dates, only past dates, because Journeylog is
              a diary, not a planner.
            </>
          ),
          styles: {
            options: {
              width: 500,
            },
          },
        },
      ]}
    />
  );
};

export default OnboardingInsights;
