import 'react-native-get-random-values';
import Providers from "@/Providers";
import { Stack } from "expo-router";
import React from "react";
import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  'COLOQUE_AQUI_O_SEU_APPLICATION_ID', 
  'COLOQUE_AQUI_A_SUA_JAVASCRIPT_KEY'  
);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default function RootLayout() {
  return (
    <Providers>
      <Stack />
    </Providers>
  );
}