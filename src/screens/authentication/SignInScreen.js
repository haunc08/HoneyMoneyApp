// react
import React, { Component } from "react";
import { Text, View, Image, ImageBackground, Alert } from "react-native";

// firebase
import * as firebase from "firebase";

// other packages
import { Notifications } from "expo";
import { Permissions } from "expo-permissions";

// components
import {
  HomoTextInput,
  Button1,
  Button2,
  Button3,
} from "../../components/Basic";

// constants
import { sizeFactor, windowWidth } from "../../constants/ruler";
import { colors } from "../../constants/colors";

class SignInScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      errorMessage: "",
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === "" || this.state.password === "") {
      Alert.alert("Tài khoản hoặc mật khẩu không đúng!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          //console.log(res)
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.signIn();
          //console.log(this.props.isSignedIn);
          //this.props.navigation.navigate('Main')
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
      console.log(this.state.errorMessage);
      Notifications.dismissAllNotificationsAsync();
      this.askPermissions();
    }
  };
  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={require("../../assets/others/background.png")}
          style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
        >
          <View
            style={{
              flex: 1,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/others/logo.png")}
              style={{
                height: sizeFactor * 8,
                width: sizeFactor * 8 * 1.42489270386,
                marginBottom: sizeFactor * 2,
              }}
            />
            <View
              style={{
                backgroundColor: "white",
                padding: sizeFactor,
                alignItems: "center",
                borderWidth: 0,
                borderRadius: sizeFactor,
                marginBottom: sizeFactor * 4,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: sizeFactor * 1.25,
                  fontWeight: "bold",
                  marginBottom: sizeFactor,
                  marginTop: sizeFactor / 2,
                }}
              >
                Đăng nhập
              </Text>
              <HomoTextInput
                label="Email"
                placeholder="example@mail.com"
                leftIconName="email"
                textContentType="email"
                keyboardType="email-address"
                errorMessage=""
                value={this.state.email}
                onChangeText={(val) => this.updateInputVal(val, "email")}
              />
              <HomoTextInput
                label="Mật khẩu"
                placeholder="••••••••••••••••••••••"
                leftIcon={{ name: "lock", color: colors.gray }}
                secureTextEntry={true}
                textContentType="password"
                errorMessage=""
                value={this.state.password}
                onChangeText={(val) => this.updateInputVal(val, "password")}
              />
              <View
                style={{
                  width: windowWidth - sizeFactor * 8,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: sizeFactor / 2,
                }}
              >
                <Button2
                  style={{ width: sizeFactor * 8.5 }}
                  onPress={() => this.props.navigation.navigate("SignUp")}
                >
                  Đăng ký
                </Button2>
                <Button1
                  style={{ width: sizeFactor * 8.5 }}
                  onPress={() => this.userLogin()}
                >
                  Đăng nhập
                </Button1>
              </View>
              <Button3 onPress={() => console.log(firebase.auth().currentUser)}>
                Quên mật khẩu
              </Button3>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default SignInScreen;
