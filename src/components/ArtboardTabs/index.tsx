"use client";

import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
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
  const isMobile = useMediaQuery("only screen and (max-width: 820px)");

  const firsTabs = isMobile
    ? journeyTabs?.slice(0, 1)
    : journeyTabs?.slice(0, 3);
  const lastTabs = isMobile ? journeyTabs?.slice(2) : journeyTabs?.slice(3);

  const tabLimit = isMobile ? 1 : 3

  return (
    <NavbarItem className="justify-center flex items-center">
      {journeyTabs.length > 0 && (
        <Tabs
          aria-label="Journeys"
          items={firsTabs}
          variant="bordered"
          // selectedKey={forcedActiveTab}
          className="relative rounded-xl md:pl-3"
          onSelectionChange={(e) => handleTabSelection(e, false)}
          id="tabs"
        >
          {(item: any) => {
            const key = journeyTabs.findIndex((i: any) => i?.id === item.id);
            return (
              <Tab
                key={key + 1}
                id="tabsButton"
                title={item.name}
                className="flex items-center align-middle"
              >
                {journeyTabs.length > tabLimit ? (
                  <Dropdown className="p-0 h-full">
                    <DropdownTrigger className="p-0 h-full" id="tabsPlus">
                      <div className="border-0 rounded-lg p-0 px-3 py-2 pl-6 ml-[-20px] flex align-middle items-center border-[#222222] bg-[#222222] cursor-pointer	 relative z-10 rounded-l-none border-l-0 h-full">
                        +{lastTabs.length}
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      {lastTabs.map((subitem: any) => {
                        const subKey = journeyTabs.findIndex(
                          (i: any) => i?.id === subitem.id
                        );
                        return (
                          <DropdownItem
                            key={subKey}
                            onClick={(e) => handleTabSelection(subKey, true)}
                          >
                            {subitem.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </Dropdown>
                ) : null}
              </Tab>
            );
          }}
        </Tabs>
      )}
      {journeyTabs.length > 0 && (
        <Button
          onClick={() => handleCreateJourney()}
          className="bg-transparent px-0 border-none min-w-0 h-full pl-2"
          variant="bordered"
        >
          <Plus className="stroke-white" />
          <div className="hidden md:block">New journey</div>
        </Button>
      )}
    </NavbarItem>
  );
};

export default ArtboardTabs;
