import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
