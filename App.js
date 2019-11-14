// MODULE IMPORTS
import React, { useState, useEffect } from 'react';
import { Notifications } from 'expo';
import * as Permissions from "expo-permissions";
// FILE IMPORTS
import Root from "./navigation/tab"


export default App = () => {
  const [token, setToken] = useState("")
  const register = async () => {
    const { status } = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    )
    if (status !== 'granted') {
      return;
    }
    const value = await Notifications.getExpoPushTokenAsync()
    setToken(value)
  }
  useEffect(() => {
    register()
  }, [])
  return (
    <Root />
  );
}