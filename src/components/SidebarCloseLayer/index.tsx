"use client";

import classnames from "classnames";

import React from "react";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

const SidebarCloseLayer = ({ isOpened, setIsOpened }: any) => {
  return (
    <div
      className={classnames(
        "cursor-pointer backdrop-blur-sm left-0 bg-opacity-20 z-[43]",
        {
          "w-[100vw] h-[100vh] fixed inset-0": !isOpened,
          "w-[0px] h-[0px] flex items-center justify-center sticky top-[-20px]": isOpened,
        }
      )}
      onClick={() => setIsOpened(!isOpened)}
    >
      <div
        className={classnames(
          "close-sidemenu-button hover:bg-[#2c2c2c] w-[40px] h-[40px] p-2 rounded-xl left-8 top-[50px] md:hidden relative",
          {
            "left-[270px] top-7 isopened": !isOpened,
          }
        )}
      >
        {isOpened ? <ChevronsRight /> : <ChevronsLeft />}
      </div>
    </div>
  );
};

export default SidebarCloseLayer;
