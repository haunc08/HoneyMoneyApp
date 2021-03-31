import React, { Component } from "react";
import { Modal } from "react-native";
import {
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  Icon,
  SearchBar,
  ButtonGroup,
  Overlay,
  Input,
  Divider,
} from "react-native-elements";
import { FlatList, TextInput } from "react-native-gesture-handler";
import TextTicker from "react-native-text-ticker";
import toMoneyString from "./toMoneyString";
import { styles } from "../constants/styles";
import { colors } from "../constants/colors";
import {
  sizeFactor,
  windowWidth,
  windowHeight,
  managerCategoryWidth,
  managerCategoryHeight,
} from "./ruler";

export class String extends Component {
  render() {
    return (
      <TextTicker
        style={[styles.string, this.props.style]}
        duration={5000}
        loop
        bounce
        repeatSpacer={50}
      >
        {this.props.children}
      </TextTicker>
    );
  }
}

export class Heading extends Component {
  render() {
    return (
      <String style={[styles.heading, this.props.style]}>{this.props.children}</String>
    );
  }
}

export class Title extends Component {
  render() {
    return <Text style={[styles.title, this.props.style]}>{this.props.children}</Text>;
  }
}

export class PositiveNumber extends Component {
  render() {
    return (
      <String style={[styles.positiveNumber, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class NegativeNumber extends Component {
  render() {
    return (
      <String style={[styles.negativeNumber, this.props.style]}>
        {this.props.children}
      </String>
    );
  }
}

export class HomoTextInput extends Component {
  render() {
    return (
      <Input
        label="Text Input"
        placeholder="Placeholder"
        leftIcon={{
          name: this.props.leftIconName,
          color: colors.gray,
        }}
        labelStyle={{ color: colors.gray }}
        leftIconContainerStyle={{ marginRight: sizeFactor / 2 }}
        containerStyle={styles.homoTextInputContainerStyle}
        inputContainerStyle={styles.homoTextInputInputContainerStyle}
        errorStyle={styles.homoTextInputErrorStyle}
        {...this.props}
      />
    );
  }
}

export class TransactionMonthSummary extends Component {
  render() {
    return (
      <View style={styles.transactionMonthSummaryContainerStyle}>
        <View style={styles.transactionMonthSummaryStyle}>
          <Icon
            name="chevron-left"
            type="material-community"
            color={colors.gray3}
            size={sizeFactor * 2}
            style={{ marginTop: 2, opacity: this.props.leftChevronOpacity }}
          />
          <Text style={styles.cardHeader1}>{this.props.month}</Text>
          <Icon
            name="chevron-right"
            type="material-community"
            color={colors.gray3}
            size={sizeFactor * 2}
            style={{ marginTop: 2, opacity: this.props.rightChevronOpacity }}
          />
        </View>
        <Row>
          <String style={{ color: colors.gray }}>Tổng thu</String>
          <String>{this.props.openBalance}</String>
        </Row>
        <Row>
          <String style={{ color: colors.gray }}>Tổng chi</String>
          <String>{this.props.endBalance}</String>
        </Row>
        <Divider style={{ marginBottom: sizeFactor }} />
        <Row style={{ marginBottom: sizeFactor * 0.5 }}>
          <String style={{ fontWeight: "bold" }}>Thay đổi</String>
          <String style={{ fontWeight: "bold", color: this.props.changeColor }}>
            {this.props.change}
          </String>
        </Row>
      </View>
    );
  }
}

export class ScreenView extends Component {
  render() {
    return (
      <SafeAreaView style={[styles.background, this.props.style]}>
        <KeyboardAvoidingView behavior="height" enabled={true}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.screenView}>{this.props.children}</View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export class NormalCard extends Component {
  render() {
    return (
      <View style={[styles.normalCard, this.props.style]}>{this.props.children}</View>
    );
  }
}

export class SimpleCarousel extends Component {
  render() {
    return (
      <ScrollView
        ref={(ref) => {
          this.scrollref = ref;
        }}
        horizontal
        snapToInterval={Math.ceil(windowWidth - sizeFactor * 2)}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.simpleCarousel}
        onScroll={this.props.onScroll}
      >
        {this.props.children}
      </ScrollView>
    );
  }
}

export class Row extends Component {
  render() {
    return <View style={[styles.row, this.props.style]}>{this.props.children}</View>;
  }
}

export class RowLeft extends Component {
  render() {
    return <View style={[styles.rowLeft, this.props.style]}>{this.props.children}</View>;
  }
}

export class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.button,
          {
            backgroundColor: this.props.backgroundColor,
          },
          this.props.style,
        ]}
      >
        <String
          style={{
            color: this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class Button1 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button1, this.props.style]}
      >
        <String style={styles.button1String}>{this.props.children}</String>
      </TouchableOpacity>
    );
  }
}

export class Button2 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button2, this.props.style]}
      >
        <String style={[styles.button2String, this.props.textStyle]}>
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class Button3 extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.button3, this.props.style]}
      >
        <String style={[styles.button3String, this.props.textStyle]}>
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class OutlineButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.outlineButton,
          { borderColor: this.props.color },
          this.props.style,
        ]}
        onPress={this.props.onPress}
      >
        <String
          style={{
            color: this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class ToggleButton extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[
          styles.toggleButton,
          {
            backgroundColor: choosed == "true" ? this.props.color : this.props.background,
            borderColor: this.props.color,
          },
          this.props.style,
        ]}
      >
        <String
          style={{
            color: choosed == "true" ? this.props.background : this.props.color,
            fontWeight: "bold",
          }}
        >
          {this.props.children}
        </String>
      </TouchableOpacity>
    );
  }
}

export class AddWalletButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon
          name="credit-card-plus-outline"
          type="material-community"
          color={this.props.color}
          size={sizeFactor * 2}
          style={{ marginRight: sizeFactor / 2 }}
        />
      </TouchableOpacity>
    );
  }
}

export class ColorSelectButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.colorSelectButton(this.props.color, this.props.selected)} />
      </TouchableOpacity>
    );
  }
}

export class CategoryInManagerScreen extends Component {
  render() {
    var choosed = this.props.choosed;
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={{ marginRight: sizeFactor }}>
          <View style={styles.managerCategoryManager}>
            <Image
              source={require("../assets/categories/choosed.png")}
              style={styles.managerCategoryChoosed(this.props.choosed)}
            ></Image>
            <Image source={this.props.source} style={styles.managerCategoryImage}></Image>
          </View>
          <View style={[managerCategoryStringContainer, this.props.stringContainerStyle]}>
            <String style={managerCategoryString(this.props.choosed)}>
              {this.props.children}
            </String>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export class CategoryTable extends Component {
  render() {
    return <View style={this.props.style}>{this.props.rows}</View>;
  }
}

export class ChooseWalletList extends Component {
  render() {
    const Item = ({ name, color }) => <WalletRow name={name} color={color} />;
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={item.onPress}>
        <Item name={item.name} color={item.color} />
      </TouchableOpacity>
    );
    return <FlatList data={this.props.data} renderItem={renderItem} />;
  }
}

export class TransactionsFullList extends Component {
  render() {
    const Item = ({ date, dayOfWeek, month, change, list }) => (
      <NormalCard>
        <Row style={{ alignItems: "center", marginBottom: sizeFactor }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <String
              style={{
                marginBottom: 0,
                fontSize: sizeFactor * 2,
                marginRight: sizeFactor,
                marginTop: 0,
              }}
            >
              {date}
            </String>
            <View>
              <String
                style={{
                  fontSize: sizeFactor * 0.75,
                  marginBottom: 0,
                  fontWeight: "bold",
                  color: colors.gray,
                }}
              >
                {dayOfWeek}
              </String>
              <String
                style={{
                  fontSize: sizeFactor * 0.75,
                  marginBottom: 0,
                  color: colors.gray,
                }}
              >
                {month}
              </String>
            </View>
          </View>
          <String style={{ marginBottom: 0, fontWeight: "bold" }}>{change}</String>
        </Row>
        <LooseDivider />
        <View style={{ marginBottom: sizeFactor / 2 }}>
          <TransactionsList data={list} />
        </View>
      </NormalCard>
    );
    const renderItem = ({ item }) => (
      <Item
        date={item.date}
        dayOfWeek={item.dayOfWeek}
        month={item.month}
        change={toMoneyString(item.change)}
        list={item.list}
      />
    );
    return (
      <FlatList
        data={this.props.data}
        renderItem={renderItem}
        ListEmptyComponent={this.props.ListEmptyComponent}
      />
    );
  }
}
