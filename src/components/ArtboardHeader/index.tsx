"use client";

import React from "react";
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
  return (
    <div className="flex items-center justify-between">
      <p
        className="px-4 py-2 text-3xl mt-3 mb-5"
        contentEditable="true"
        onInput={handleJourneyNameEdit}
        suppressContentEditableWarning={true}
      >
        {activeTab?.name}
      </p>
      {activeTab ? (
        <Popover className="flex justify-center">
          <PopoverTrigger>
            <Ellipsis className="mr-3" />
          </PopoverTrigger>
          <PopoverContent className="w-[240px]">
            {(titleProps) => (
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
