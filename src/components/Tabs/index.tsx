"use client";

import React from "react";
import { Button, NavbarItem, Tab, Tabs } from "@nextui-org/react";
import { Plus } from "lucide-react";

const ArtboardTabs = ({
  journeyTabs,
  handleTabSelection,
  handleCreateJourney,
}: any) => {
  return (
    <NavbarItem className="justify-center flex">
      {journeyTabs.length > 0 ? (
        <Tabs
          aria-label="Journeys"
          items={journeyTabs}
          variant="bordered"
          className="relative rounded-xl"
          onSelectionChange={handleTabSelection}
        >
          {(item: any) => <Tab key={item.id} title={item.name}></Tab>}
        </Tabs>
      ) : null}

      <Button
        onClick={handleCreateJourney}
        className="bg-transparent px-3 md:pl-4 border-none min-w-0"
        variant="bordered"
      >
        <Plus className="stroke-white" />{" "}
        <div className="hidden md:block">New journey</div>
      </Button>
    </NavbarItem>
  );
};

export default ArtboardTabs;
