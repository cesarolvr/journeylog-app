"use client";

import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const OnboardingInsights = ({ isInsightsOpened }: any) => {
  const [isToShowOnboarding, setiIsToShowOnboarding] = useState(false);

  const isOnboardingInsightsHidden = localStorage.getItem("isOnboardingInsightsHidden");

  useEffect(() => {
    if (isInsightsOpened && isOnboardingInsightsHidden !== "true") {
      setTimeout(() => {
        setiIsToShowOnboarding(true);
      }, 500);
    }
  }, [isInsightsOpened]);
  return (
    <Joyride
      nonce="onboarding-insights"
      run={isToShowOnboarding}
      showProgress={true}
      callback={(data: any) => {
        if (data.action === "skip") {
          localStorage.setItem("isOnboardingInsightsHidden", "true");
        }

        if (data.status === "finished") {
          localStorage.setItem("isOnboardingInsightsHidden", "true");
        }
      }}
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
              Here are some metrics that will give you insights about your journey. Days in a row, days with any note filled (whatever it is), and days since your journey started.
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
          target: ".frequency-item",
          placement: "bottom",
          spotlightPadding: 10,
          content: (
            <>
              With this chart (similar to Github), you can see the distribution of the days you made the most progress in your journey.
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
              Here is the consistency of your progress over the last 30 days. The shade of the filled bar corresponds to the number of notes you made on a particular day.
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
              It's like the consistency chart above, but focused on the last 7 days and more detailed about the length of the note for that day.
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
