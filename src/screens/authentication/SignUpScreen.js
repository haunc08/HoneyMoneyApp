// react
import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";

// firebase
//import { categoryRef, userRef, walletRef } from "../components/DataConnect";
import * as firebase from "firebase";

// components
import { HomoTextInput, Button1, Button2 } from "../../components/Basic";

// constants
import { colors, sizeFactor, windowWidth, styles } from "../../constants";

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert("Thông báo", errorMessage);
    }
  }, [errorMessage]);

  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const registerUser = () => {
    if (email === "" || password === "") {
      setErrorMessage("Không thể để trống email hoặc password!");
      Alert.alert("Thông báo", errorMessage);
    } else {
      setIsLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          //console.log(this.state.displayName);

          res.user
            .updateProfile({
              displayName: displayName,
            })
            .then(() => {
              firebase
                .database()
                .ref("users/" + firebase.auth().currentUser.uid + "/profile")
                .set({ name: firebase.auth().currentUser.displayName });
              //this.addDefaultDatabase();
            });
          console.log("User registered successfully!");

          reset();
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          // set isLoading to false b/c if not, SignUpScreen will return Loading screen and stay there
          setIsLoading(false);

          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Tài khoản đã được sử dụng.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Email không hợp lệ!");
          } else if (error.code === "auth/weak-password") {
            setErrorMessage(
              "Mật khẩu không hợp lệ, tối thiểu phải có 6 ký tự!"
            );
          }
          Alert.alert("Thông báo", errorMessage);
          //console.error(error.code);
        });
    }

    //this.addDefaultWallet();
  };

  if (isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
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
          <View
            style={{
              backgroundColor: "white",
              padding: sizeFactor,
              alignItems: "center",
              borderWidth: 0,
              borderRadius: sizeFactor,
              marginBottom: sizeFactor,
              marginTop: sizeFactor / 2,
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
              Đăng ký tài khoản
            </Text>
            <HomoTextInput
              label="Họ và tên"
              placeholder="Tên Của Bạn"
              leftIcon={{ name: "person", color: colors.gray }}
              textContentType="name"
              errorMessage=""
              value={displayName}
              onChangeText={(val) => setDisplayName(val)}
            />
            <HomoTextInput
              label="Email"
              placeholder="example@mail.com"
              leftIcon={{ name: "email", color: colors.gray }}
              textContentType="emailAddress"
              keyboardType="email-address"
              errorMessage=""
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
            <HomoTextInput
              label="Mật khẩu"
              placeholder="••••••••••••••••••••••"
              leftIcon={{ name: "lock", color: colors.gray }}
              textContentType="password"
              secureTextEntry={true}
              errorMessage=""
              value={password}
              onChangeText={(val) => setPassword(val)}
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
                onPress={() => navigation.navigate("SignIn")}
              >
                Hủy bỏ
              </Button2>
              <Button1
                style={{ width: sizeFactor * 8.5 }}
                onPress={() => registerUser()}
              >
                Xác nhận
              </Button1>
            </View>
          </View>
          <Text style={{ color: colors.white }}>
            Bằng việc tạo tài khoản, bạn đã chấp nhận
          </Text>
          <Text style={{ color: colors.white }}>
            các Điều khoản và Điều kiện của chúng tôi.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;

// export default class SignUpScreen extends Component {
//   constructor() {
//     super();
//     this.state = {
//       displayName: "",
//       email: "",
//       password: "",
//       isLoading: false,
//     };
//   }

//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   };

//   // addDefaultCategories = () => {
//   //     let uid = 'none';
//   //     if(firebase.auth().currentUser) {
//   //         uid = firebase.auth().currentUser.uid;
//   //     }
//   //     //const userCategoryRef = userRef.ref('Category/');
//   //     categoryRef.on('value', (snapshot) => {
//   //         snapshot.forEach(element => {
//   //             userRef.child(uid).child('Category/').push({
//   //                 CategoryName: element.toJSON().CategoryName,
//   //                 Icon: element.toJSON().Icon,
//   //                 ParentID: element.toJSON().ParentID,
//   //                 TypeID: element.toJSON().TypeID,
//   //                 IsDeleted: false
//   //             })
//   //             //userRef.child('Category').push(element);
//   //             //console.log(element);
//   //         });
//   //     });
//   //     //console.log(userCategoryRef);
//   // }

//   // addDefaultWallet = () => {
//   //     let uid = 'none';
//   //     if(firebase.auth().currentUser) {
//   //         uid = firebase.auth().currentUser.uid;
//   //     }

//   //     walletRef.on('value', (snapshot) => {
//   //         snapshot.forEach(element => {
//   //             //const color = typeof(element.toJSON().color) === 'undefined' ? "#ffff" : element.toJSON().color;

//   //             userRef.child(uid).child('Wallet/').push({
//   //                 color: element.toJSON().color,
//   //                 date: element.toJSON().date,
//   //                 isDefault: element.toJSON().isDefault,
//   //                 money: element.toJSON().money,
//   //                 name: element.toJSON().name,
//   //             })

//   //             //console.log(element);
//   //         });
//   //     });
//   // }

//   // addDefaultDatabase = () => {
//   //     this.addDefaultCategories();
//   //     this.addDefaultWallet();
//   // }

//   registerUser = () => {
//     if (this.state.email === "" || this.state.password === "") {
//       Alert.alert("Enter details to signup!");
//     } else {
//       this.setState({
//         isLoading: true,
//       });
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .then((res) => {
//           //console.log(this.state.displayName);

//           res.user
//             .updateProfile({
//               displayName: this.state.displayName,
//             })
//             .then(() => {
//               firebase
//                 .database()
//                 .ref("users/" + firebase.auth().currentUser.uid + "/profile")
//                 .set({ name: firebase.auth().currentUser.displayName });
//               //this.addDefaultDatabase();
//             });
//           console.log("User registered successfully!");
//           this.setState({
//             isLoading: false,
//             displayName: "",
//             email: "",
//             password: "",
//           });
//           this.props.navigation.navigate("SignIn");
//         })
//         .catch((error) => this.setState({ errorMessage: error.message }));
//     }

//     //this.addDefaultWallet();
//   };

//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       );
//     }

//     return (
//       <View
//         style={{
//           flex: 1,
//         }}
//       >
//         <ImageBackground
//           source={require("../../assets/others/background.png")}
//           style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
//         >
//           <View
//             style={{
//               flex: 1,
//               alignContent: "center",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "white",
//                 padding: sizeFactor,
//                 alignItems: "center",
//                 borderWidth: 0,
//                 borderRadius: sizeFactor,
//                 marginBottom: sizeFactor,
//                 marginTop: sizeFactor / 2,
//               }}
//             >
//               <Text
//                 style={{
//                   alignSelf: "center",
//                   fontSize: sizeFactor * 1.25,
//                   fontWeight: "bold",
//                   marginBottom: sizeFactor,
//                   marginTop: sizeFactor / 2,
//                 }}
//               >
//                 Đăng ký tài khoản
//               </Text>
//               <HomoTextInput
//                 label="Họ và tên"
//                 placeholder="Tên Của Bạn"
//                 leftIcon={{ name: "person", color: colors.gray }}
//                 textContentType="name"
//                 errorMessage=""
//                 value={this.state.displayName}
//                 onChangeText={(val) => this.updateInputVal(val, "displayName")}
//               />
//               <HomoTextInput
//                 label="Email"
//                 placeholder="example@mail.com"
//                 leftIcon={{ name: "email", color: colors.gray }}
//                 textContentType="emailAddress"
//                 keyboardType="email-address"
//                 errorMessage=""
//                 value={this.state.email}
//                 onChangeText={(val) => this.updateInputVal(val, "email")}
//               />
//               <HomoTextInput
//                 label="Mật khẩu"
//                 placeholder="••••••••••••••••••••••"
//                 leftIcon={{ name: "lock", color: colors.gray }}
//                 textContentType="password"
//                 secureTextEntry={true}
//                 errorMessage=""
//                 value={this.state.password}
//                 onChangeText={(val) => this.updateInputVal(val, "password")}
//               />

//               <View
//                 style={{
//                   width: windowWidth - sizeFactor * 8,
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginTop: sizeFactor / 2,
//                 }}
//               >
//                 <Button2
//                   style={{ width: sizeFactor * 8.5 }}
//                   onPress={() => this.props.navigation.navigate("SignIn")}
//                 >
//                   Hủy bỏ
//                 </Button2>
//                 <Button1
//                   style={{ width: sizeFactor * 8.5 }}
//                   onPress={() => this.registerUser()}
//                 >
//                   Xác nhận
//                 </Button1>
//               </View>
//             </View>
//             <Text style={{ color: colors.white }}>
//               Bằng việc tạo tài khoản, bạn đã chấp nhận
//             </Text>
//             <Text style={{ color: colors.white }}>
//               các Điều khoản và Điều kiện của chúng tôi.
//             </Text>
//           </View>
//         </ImageBackground>
//       </View>
//     );
//   }
// }
