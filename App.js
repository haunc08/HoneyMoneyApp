import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import * as firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { NavigationContainer } from "@react-navigation/native";
import {
  AuthenticationNavigator,
  MainNavigator
} from "./src/navigators"
import { WalletScreen } from './src/screens';

function DisplayedScreens() {
  //const [user, loading, error] = useAuthState(firebase.auth());
  const user = true;
  if (user) {
      return (
      <NavigationContainer>
        <MainNavigator>

        </MainNavigator>
      </NavigationContainer>
      );
    }
    return(
    <NavigationContainer>
      <AuthenticationNavigator>

      </AuthenticationNavigator>
    </NavigationContainer>)
  }

export default function App() {
  YellowBox.ignoreWarnings(["Animated: `useNativeDriver`"]);
  //ignore all warning
  console.disableYellowBox = true;

  return (
    <DisplayedScreens/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
