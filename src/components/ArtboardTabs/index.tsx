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
import classNames from "classnames";

const ArtboardTabs = ({
  journeyTabs,
  handleTabSelection,
  handleCreateJourney,
  onOpenModal,
  setDefaultPanel,
  isPro,
}: any) => {
  const isMobile = useMediaQuery("only screen and (max-width: 820px)");

  const tabLimit = isMobile ? 1 : 3;

  const firsTabs = journeyTabs?.slice(0, tabLimit);
  const lastTabs = journeyTabs?.slice(tabLimit);

  return (
    <NavbarItem className="artboard-tabs justify-center flex items-center">
      {journeyTabs.length > 0 && (
        <Tabs
          aria-label="Journeys"
          items={firsTabs}
          variant="bordered"
          className="relative rounded-xl"
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
                className={classNames(
                  `artboart-tab flex items-center align-middle max-w-[120px] text-left tabJourney text-ellipsis`,
                  {
                    "overflow-hidden active": journeyTabs.length === tabLimit,
                  }
                )}
              >
                {journeyTabs.length > tabLimit ? (
                  <Dropdown className="p-0 h-full">
                    <DropdownTrigger className="p-0 h-full" id="tabsPlus">
                      <div className="extra border-0 rounded-lg p-0 px-3 py-2 pl-6 ml-[-20px] flex align-middle items-center border-[#222222] cursor-pointer	 relative z-10 rounded-l-none border-l-0 h-full">
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
                            onClick={(e) => {
                              return handleTabSelection(subKey + 1, true);
                            }}
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
          onClick={() => {
            if (isPro) {
              handleCreateJourney();
            } else {
              if (journeyTabs.length < 2) {
                handleCreateJourney();
              } else {
                onOpenModal();
                setDefaultPanel("subscription");
              }
            }
          }}
          className="button-new-journey w-auto bg-transparent px-0 border-none min-w-0 h-full pl-2"
          variant="bordered"
        >
          <Plus />
          <div className="hidden md:block">New journey</div>
        </Button>
      )}
    </NavbarItem>
  );
};

export default ArtboardTabs;
