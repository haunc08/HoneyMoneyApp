// react
import React, { Component } from "react";
import { View, } from "react-native";

// other packages
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native-gesture-handler";
import ActionButton from "react-native-circular-action-menu";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Icon, } from "react-native-elements";

// screens
import {
    TransactionScreen,
    ReportScreen,
    WalletScreen,
    SettingScreen,
}
from "../screens"

import {
    colors,
} from "../constants/colors"

//Navigator
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Transactions";

    switch (routeName) {
        case "Transactions":
            return "Các giao dịch";
        case "Report":
            return "Báo cáo";
        case "Wallet":
            return "Các ví";
        case "Settings":
            return "Tùy chỉnh";
    }
}

export default class TabBarNavigator extends Component {
    render() {
        this.props.navigation.setOptions({ headerTitle: getHeaderTitle(this.props.route) });
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Transactions") {
                            iconName = "swap-horizontal";
                        } else if (route.name === "Settings") {
                            iconName = "settings";
                        } else if (route.name === "Report") {
                            iconName = "chart-timeline-variant";
                        } else if (route.name === "Wallet") {
                            iconName = "credit-card-outline";
                        }

                        // You can return any component that you like here!
                        return (
                            <Icon
                                name={iconName}
                                type="material-community"
                                color={color}
                                size={25}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    // activeTintColor: colors.greenDark,
                    // inactiveTintColor: colors.dark,
                    keyboardHidesTabBar: true,
                    showIcon: true,
                    style: {
                        backgroundColor: "white",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 55,
                    },
                    labelStyle: {
                        marginBottom: 4,
                        fontSize: 11,
                    },
                }}
            >
                <Tab.Screen
                    name="Transactions"
                    component={TransactionScreen}
                    options={{ title: "Các giao dịch" }}
                />

                <Tab.Screen 
                    name="Report"
                    component={ReportScreen}
                    options={{ title: "Báo cáo" }}
                />
                <Tab.Screen
                    name="Add"
                    component={ActionButton}
                    options={{
                        tabBarButton: (props) => (
                            <View
                                style={{
                                    width: 60,
                                }}
                            >
                                <ActionButton
                                    // buttonColor={colors.yellow}
                                    size={60}
                                    degrees={315}
                                    onPress={() => {}}
                                    //onOverlayPress={()=>{console.log("a")}}
                                    icon={
                                        <Icon
                                            name="plus"
                                            type="material-community"
                                            color="white"
                                            size={35}
                                        />
                                    }
                                    radius={80}
                                >
                                    <ActionButton.Item buttonColor="#transparent">
                                        <View></View>
                                    </ActionButton.Item>

                                    <ActionButton.Item
                                        buttonColor={colors.greenDark}
                                        size={50}
                                        title="Thu"
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("WalletNavigator",
                                                    {screen: "AddTransactionScreen", params:{typeID: "003"} }
                                                );
                                            }}
                                        >
                                            <Icon
                                                name="database-plus"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>

                                    <ActionButton.Item
                                        buttonColor={colors.indigo}
                                        size={50}
                                        title="Chuyển ví"
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("WalletNavigator",
                                                    {screen: "WalletTransferScreen"}
                                                );
                                            }}
                                        >
                                            <Icon
                                                name="wallet"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>
                                    <ActionButton.Item buttonColor="#F55555" size={50} title="Chi">
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate("WalletNavigator",
                                                    {screen: "AddTransactionScreen", params:{typeID: "002"} }
                                                );
                                            }}
                                        >
                                            <Icon
                                                name="database-minus"
                                                type="material-community"
                                                color="white"
                                            />
                                        </TouchableOpacity>
                                    </ActionButton.Item>

                                    <ActionButton.Item buttonColor="#transparent">
                                        <View></View>
                                    </ActionButton.Item>
                                </ActionButton>
                            </View>
                        ),
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name="Wallet"
                    //component={BudgetScreen}
                    component={WalletScreen}
                    options={{ title: "Các ví" }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingScreen}
                    options={{ title: "Tùy chỉnh" }}
                />
            </Tab.Navigator>
        );
    }
}