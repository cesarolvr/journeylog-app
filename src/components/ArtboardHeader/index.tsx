"use client";

import React, { useEffect, useState } from "react";
import { IndentDecrease, LucideBarChart } from "lucide-react";

const ArtboardHeader = ({
  handleJourneyNameEdit,
  activeTab,
  setIsInsightsOpened,
  setIsOptionsOpened,
  isInsightsOpened,
  isOptionsOpened,
}: any) => {
  const [journeyName, setJourneyName] = useState("");

  useEffect(() => {
    if (activeTab?.name) {
      setJourneyName(activeTab?.name);
    }
  }, [activeTab?.name]);

  return (
    <div className="flex items-center justify-between bg-[#171717] md:bg-transparent rounded-xl z-[50] sticky top-[53px]">
      <input
        className="px-1 w-full md:py-2 text-2xl text-ellipsis mt-3 mb-3 bg-transparent outline-none max-w-[400px]"
        value={journeyName || activeTab?.name || ""}
        onChange={(e) => {
          setJourneyName(e?.target?.value);
          handleJourneyNameEdit(e);
        }}
        onFocus={(e) => {
          e?.currentTarget?.setSelectionRange(
            e?.currentTarget?.value?.length,
            e?.currentTarget?.value?.length
          );
        }}
      />
      {activeTab ? (
        <div className="flex">
          <div
            className="cursor-pointer mr-2 flex justify-center items-center border-1 border-[#39D353] rounded-xl p-1 py-2 w-[50px] flex-shrink-0"
            onClick={() => {
              setIsInsightsOpened(!isInsightsOpened);
            }}
          >
            <LucideBarChart />
          </div>
          <div
            className="cursor-pointer rounded-xl hover:bg-[#2c2c2c] p-1 w-[50px] flex justify-center py-2 items-center flex-shrink-0"
            onClick={() => {
              setIsOptionsOpened(!isOptionsOpened);
            }}
          >
            <IndentDecrease />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ArtboardHeader;
