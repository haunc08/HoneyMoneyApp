// react
import React, { useEffect } from "react";
import { LogBox } from "react-native";

// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { firebase, firebaseConfig } from "./src/database";

// redux
import { Provider } from "react-redux";
import configureStore from "./src/redux/store";

// other packages
import { NavigationContainer } from "@react-navigation/native";

// navigators
import { AuthenticationNavigator, MainNavigator } from "./src/navigators";
import admob, { MaxAdContentRating } from "@react-native-firebase/admob";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

console.disableYellowBox = true;

function DisplayedScreens() {
  const [user, loading, error] = useAuthState(firebase.auth());

  // useEffect(() => {
  //   if (user) {
  //     admob()
  //       .setRequestConfiguration({
  //         // Update all future requests suitable for parental guidance
  //         maxAdContentRating: MaxAdContentRating.PG,
  //         // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //         tagForChildDirectedTreatment: true,
  //         // Indicates that you want the ad request to be handled in a
  //         // manner suitable for users under the age of consent.
  //         tagForUnderAgeOfConsent: true,
  //       })
  //       .then(() => {
  //         // Request config successfully set!
  //       });
  //   }
  // }, []);
  //const user = true;
  if (user) {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  //ignore all warning
  LogBox.ignoreAllLogs(true);

  return (
    <Provider store={configureStore}>
      <DisplayedScreens />
    </Provider>
  );
}
