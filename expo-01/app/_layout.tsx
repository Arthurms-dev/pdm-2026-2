import Providers from "@/Providers";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}