import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { TransactionScreen, EditTransactionScreen } from "../screens";

const TransactionStack = createStackNavigator();

export default class TransactionNavigator extends Component {
  render() {
    return (
      <TransactionStack.Navigator>
        <TransactionStack.Screen
          name="TransactionScreen"
          component={TransactionScreen}
          options={{ headerShown: false }}
        />
        <TransactionStack.Screen
          name="EditTransaction"
          component={EditTransactionScreen}
          options={{ headerShown: true, title: "Chỉnh sửa giao dịch" }}
        />
      </TransactionStack.Navigator>
    );
  }
}
