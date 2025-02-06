"use client";

import React, { useEffect, useState } from "react";
import Joyride from "react-joyride";

const OnboardingOptions = ({ isInsightsOpened }: any) => {
  const [isToShowOnboarding, setiIsToShowOnboarding] = useState(false);

  const isOnboardingOptionsHidden = localStorage.getItem(
    "isOnboardingOptionsHidden"
  );

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isInsightsOpened && isOnboardingOptionsHidden !== "true") {
      setTimeout(() => {
        setiIsToShowOnboarding(true);
      }, 500);
    }
  }, [isInsightsOpened]);
  return (
    <Joyride
      nonce="onboarding-options"
      run={isToShowOnboarding}
      showProgress={true}
      continuous={true}
      callback={(data: any) => {
        if (data.action === "skip") {
          localStorage.setItem("isOnboardingOptionsHidden", "true");
        }

        if (data.status === "finished") {
          localStorage.setItem("isOnboardingOptionsHidden", "true");
        }
      }}
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
          fontStyle: "un",
          width: isMobile ? "100%" : "auto",
          marginBottom: isMobile ? 10 : 0,
        },
        buttonSkip: {
          color: "#196f27",
          textDecoration: "underline",
          marginBottom: isMobile ? 5 : 0,
          display: "flex",
          width: isMobile ? "100%" : "auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        tooltipFooter: isMobile
          ? {
              display: "grid",
              flexDirection: "column",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 0,
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
          target: ".theme",
          placement: "bottom",
          spotlightPadding: 15,
          content: (
            <>
              Here you can choose the theme of your journey. Try clicking on one
              of the themes to see how it looks.
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
          spotlightPadding: 15,
          content: (
            <>
              Here you define the frequency of this journey. This will determine
              how often you will receive notifications. It can be daily, weekly,
              or monthly. This will also define the charts for this journey.
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
          target: ".notifications",
          placement: "bottom",
          spotlightPadding: 15,
          content: (
            <>
              Here, you can choose how you want to receive notifications about
              your journey. You can choose to receive them via SMS, Email, or
              WhatsApp. Available only for PRO users.
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
          target: ".actions",
          placement: "bottom",
          spotlightPadding: 15,
          content: (
            <>
              Here you can choose the actions you want to take on your journey:
              Finish the journey, pause, or delete.
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

export default OnboardingOptions;
