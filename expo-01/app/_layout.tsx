import 'react-native-get-random-values';
import Providers from "@/Providers";
import { Stack } from "expo-router";
import React from "react";
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(
  process.env.EXPO_PUBLIC_PARSE_APP_ID!,
  process.env.EXPO_PUBLIC_PARSE_JS_KEY!
);

Parse.serverURL = 'https://parseapi.back4app.com/';

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}