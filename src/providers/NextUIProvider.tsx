"use client";

import { NextUIProvider } from "@nextui-org/react";

const NextUIProviders = ({ children }: any) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextUIProviders;
