// react
import React, { Component } from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import { BudgetScreen, AddBudgetScreen, EditBudgetScreen } from "../screens";

const Stack = createStackNavigator();

export default class BudgetNavigator extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
        <Stack.Screen
          name="AddBudgetScreen"
          component={AddBudgetScreen}
          options={{ headerShown: true, title: "Thêm hạn mức" }}
        />
        <Stack.Screen
          name="EditBudgetScreen"
          component={EditBudgetScreen}
          options={{
            headerShown: true,
            title: "Xem hạn mức",
          }}
        />
      </Stack.Navigator>
    );
  }
}
