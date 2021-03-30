// react
import React from 'react';
import { StyleSheet, Text, View, YellowBox, LogBox } from 'react-native';

// firebase
//import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseConfig } from "./src/database";

// other packages
import { NavigationContainer } from "@react-navigation/native";

// navigators
import {
  AuthenticationNavigator,
  MainNavigator
} from "./src/navigators"

// screens
import { WalletScreen } from './src/screens';


if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function DisplayedScreens() {
  const [user, loading, error] = useAuthState(firebase.auth());
  //const user = true;
  if (user) {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    )
  }
  return(
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  )
}

export default function App() {
  //ignore all warning
  LogBox.ignoreAllLogs(true)

  return (
    <DisplayedScreens/>
  );
}
