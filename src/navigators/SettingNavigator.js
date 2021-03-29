// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
    SettingScreen,
    SettingAlertScreen,
    SettingNameScreen,
    SettingPasswordScreen,
}
from "../screens"

// navigators
import CategoryNavigator from './CategoryNavigator';

const SettingStack = createStackNavigator();

export default class SettingScreensNavigator extends Component {
    render() {
        return (
            <SettingStack.Navigator>
                <SettingStack.Screen
                    name="SettingScreen"
                    component={SettingScreen}
                    options={{ headerShown: false }}
                />
                <SettingStack.Screen
                    name="SettingNameScreen"
                    component={SettingNameScreen}
                    options={{ headerShown: false, title: "" }}
                />
                <SettingStack.Screen
                    name="SettingPasswordScreen" 
                    component={SettingPasswordScreen} 
                    options={{headerShown: false, title: ""}}/>
                <SettingStack.Screen
                    name="SettingAlertScreen"
                    component={SettingAlertScreen}
                    options={{ headerShown: false, title: "" }}
                />
                <SettingStack.Screen
                    name="CategoryNavigator"
                    component={CategoryNavigator}
                    options={{ headerShown: false, title: "" }}
                />
            </SettingStack.Navigator>
        );
    }
}
