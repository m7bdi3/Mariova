"use client";
import React from "react";
import { r3f } from "@/lib/helpers/global";

export const Three = ({ children }: { children: React.ReactNode }) => {
  return <r3f.In>{children}</r3f.In>;
};
