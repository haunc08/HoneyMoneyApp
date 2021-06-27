// react
import React, { Component, useEffect, useState } from "react";
import { View, Image, Alert } from "react-native";

// firebase
import { firebase } from "../../database";

// redux
import { connect } from "react-redux";

// components
import {
  String,
  ScreenView,
  HomoTextInput,
  Button1,
  Space,
} from "../../components/Basic";

// constants
import { colors, sizeFactor, styles, windowWidth } from "../../constants";
import { Picker } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { TextInput } from "react-native";

const API_KEY = "1ec65cb486056ac5fbf5a45fb5dd9eee";

export const ExchangeScreen = () => {
  const currencies = ["VND", "USD", "EUR", "JPY", "AUD"];
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(-1);
  const [amount, setAmount] = useState();
  const calculate = () => {
    if (!amount) return null;
    try {
      fetch(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}&symbols=USD,AUD,GBP,JPY,CNY,VND&format=1`
        // `https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json`
      )
        .then((response) => response.json())
        .then((json) => {
          if (currencies[from] === "EUR") {
            setConvertedAmount(amount * json.rates[currencies[to]]);
            return;
          }
          if (currencies[to] === "EUR") {
            setConvertedAmount(amount / json.rates[currencies[from]]);
            return;
          }
          setConvertedAmount(
            (amount * json.rates[currencies[to]]) / json.rates[currencies[from]]
          );
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert(
        "Đã có lỗi xảy ra",
        "Vui lòng kiểm tra lại internet và dữ liệu đã nhập."
      );
    }
  };

  return (
    <ScreenView style={{ backgroundColor: "white" }}>
      <View
        style={{
          margin: sizeFactor,
          alignItems: "center",
          marginTop: sizeFactor * 2,
        }}
      >
        <Image
          source={require("../../assets/others/exchange.png")}
          style={[
            styles.hugeCategory,
            {
              opacity: 1,
              width: styles.hugeCategory.height - sizeFactor * 1.25,
              height: styles.hugeCategory.height - sizeFactor * 1.25,
              marginBottom: sizeFactor,
            },
          ]}
        />

        <String style={{ fontWeight: "bold", fontSize: sizeFactor * 1.5 }}>
          Chuyển đổi ngoại tệ
        </String>
      </View>
      <View
        style={{
          alignItems: "center",
          marginHorizontal: sizeFactor * 3,
          marginVertical: sizeFactor,
        }}
      >
        <HomoTextInput
          label="Tiền tệ gốc"
          placeholder="Nhập số tiền"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={(value) => {
            setAmount(value);
          }}
        />
        <ButtonGroup
          containerStyle={{ marginTop: -10 }}
          onPress={(index) => {
            setFrom(index);
          }}
          selectedIndex={from}
          buttons={currencies}
          disabled={[to]}
          // containerStyle={{ width: windowWidth - sizeFactor * 6 }}
        />
        <Space loose />
        <HomoTextInput
          label="Tiền tệ đích"
          placeholder=""
          keyboardType="decimal-pad"
          value={convertedAmount.toString()}
        />
        <ButtonGroup
          containerStyle={{ marginTop: -10 }}
          onPress={(index) => {
            setTo(index);
          }}
          selectedIndex={to}
          buttons={currencies}
          disabled={[from]}
          // containerStyle={{ width: windowWidth - sizeFactor * 6 }}
        />
      </View>
      <View
        style={{
          alignItems: "stretch",
          marginHorizontal: sizeFactor * 3,
          marginVertical: sizeFactor * 2,
        }}
      >
        <Button1
          onPress={() => {
            calculate();
          }}
        >
          Chuyển đổi
        </Button1>
      </View>
    </ScreenView>
  );
};

export default ExchangeScreen;
