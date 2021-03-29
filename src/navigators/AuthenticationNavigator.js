import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import {
    SignInScreen,
    SignUpScreen,
}
from "../screens"

const Stack = createStackNavigator();

export default class AuthenticationScreensNavigator extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="SignIn"
                    component={SignInScreen} />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen} />
            </Stack.Navigator>
        );
    }
}
