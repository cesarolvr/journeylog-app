"use client";

import React from "react";
import { useMediaQuery, useMediaQueries } from "@react-hook/media-query";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Plus } from "lucide-react";

const ArtboardTabs = ({
  journeyTabs,
  handleTabSelection,
  handleCreateJourney,
}: any) => {
  const isMobile = useMediaQuery("only screen and (max-width: 718px)");

  const firsTabs = isMobile ? journeyTabs.slice(0, 2) : journeyTabs.slice(0, 3);
  const lastTabs = isMobile ? journeyTabs.slice(2) : journeyTabs.slice(3);

  return (
    <NavbarItem className="justify-center flex items-center">
      {journeyTabs.length > 0 && (
        <Tabs
          aria-label="Journeys"
          items={firsTabs}
          variant="bordered"
          className="relative rounded-xl"
          onSelectionChange={handleTabSelection}
          id="tabs"
        >
          {(item: any) => (
            <Tab
              key={item.id}
              id="tabsButton"
              title={item.name}
              className="flex items-center align-middle"
            >
              <Dropdown className="p-0 h-full">
                <DropdownTrigger className="p-0 h-full" id="tabsPlus">
                  <div className="border-0 rounded-lg p-0 px-3 py-2 pl-6 ml-[-20px] flex align-middle items-center border-[#373737] bg-[#373737] cursor-pointer	 relative z-10 rounded-l-none border-l-0 h-full">
                    +{lastTabs.length}
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {lastTabs.map((item: any) => {
                    return (
                      <DropdownItem
                        key={item.id}
                        onClick={(e) => handleTabSelection(item.id)}
                      >
                        {item.name}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </Tab>
          )}
        </Tabs>
      )}
      <Button
        onClick={handleCreateJourney}
        className="bg-transparent px-0 pl-1 md:pl-2 border-none min-w-0 h-full"
        variant="bordered"
      >
        <Plus className="stroke-white" />{" "}
        <div className="hidden md:block">New journey</div>
      </Button>
    </NavbarItem>
  );
};

export default ArtboardTabs;
