"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Ellipsis } from "lucide-react";

const ArtboardHeader = ({
  handleJourneyDeletion,
  handleJourneyNameEdit,
  activeTab,
}: any) => {
  const [journeyName, setJourneyName] = useState("");

  useEffect(() => {
    if (activeTab?.name) {
      setJourneyName(activeTab?.name);
    }
  }, [activeTab?.name]);

  return (
    <div className="flex items-center justify-between">
      <input
        className="px-4 py-2 text-3xl mt-3 mb-5 bg-transparent"
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
        <Popover className="flex justify-center">
          <PopoverTrigger>
            <Ellipsis className="mr-3" />
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {() => (
              <div className="px-1 py-2 w-full">
                <Button
                  className="bg-danger-300 text-white w-full"
                  onClick={() => handleJourneyDeletion(activeTab)}
                >
                  Delete Journey
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
};

export default ArtboardHeader;
