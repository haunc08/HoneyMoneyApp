import { colors } from "./colors";
import {
  sizeFactor,
  windowWidth,
  windowHeight,
  managerCategoryWidth,
  managerCategoryHeight,
} from "./ruler";

export const styles = StyleSheet.create({
  //String
  string: {
    fontSize: sizeFactor,
    marginBottom: sizeFactor * 0.75,
  },
  //Heading
  heading: {
    fontSize: sizeFactor * 1.25,
    fontWeight: "bold",
    marginBottom: sizeFactor * 0.75,
    color: colors.gray,
    textTransform: "uppercase",
  },
  //Title
  title: {
    fontSize: sizeFactor * 1.75,
    fontWeight: "bold",
    marginVertical: sizeFactor,
    marginHorizontal: sizeFactor * 1.25,
    color: "black",
  },
  //PositiveNumber
  positiveNumber: {
    fontWeight: "bold",
    color: colors.greenDark,
    fontSize: sizeFactor * 1.25,
  },
  //NegativeNumber
  negativeNumber: {
    fontWeight: "bold",
    color: colors.redDark,
    fontSize: sizeFactor * 1.25,
  },
  //HomoTextInput
  homoTextInputContainerStyle: {
    width: windowWidth - sizeFactor * 6,
    padding: 0,
  },
  homoTextInputInputContainerStyle: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  homoTextInputErrorStyle: {
    color: colors.red,
    alignSelf: "flex-end",
  },
  //TransactionMonthSummary
  transactionMonthSummaryContainerStyle: {
    width: windowWidth - sizeFactor * 2,
    paddingHorizontal: sizeFactor,
    paddingTop: sizeFactor,
  },
  transactionMonthSummaryStyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: sizeFactor * 0.75,
    alignItems: "center",
  },
  cardHeader1: {
    fontWeight: "bold",
    fontSize: sizeFactor * 1.5,
    marginHorizontal: sizeFactor / 2,
  },
  //ScreenView
  background: {
    flex: 1,
    backgroundColor: colors.gray6,
  },
  screenView: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  //RoundedView
  roundedView: {
    backgroundColor: "white",
    borderRadius: sizeFactor,
    margin: sizeFactor,
    marginTop: 0,
    paddingHorizontal: sizeFactor,
    paddingTop: sizeFactor,
  },
  //SimpleCarousel
  simpleCarousel: {
    backgroundColor: "white",
    borderRadius: sizeFactor,
    margin: sizeFactor,
    marginTop: 0,
  },
  //Row
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  //RowLeft
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  //Button
  button: {
    justifyContent: "center",
    borderWidth: 0,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //Button1
  button1: {
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: colors.blue,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  button1String: {
    color: "white",
    fontWeight: "bold",
  },
  //Button2
  button2: {
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: colors.gray6,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.6,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  button2String: {
    color: "black",
    fontWeight: "bold",
  },
  //Button3
  button3: {
    justifyContent: "center",
    paddingHorizontal: sizeFactor,
    flexDirection: "row",
  },
  button3String: {
    color: colors.blue,
    fontWeight: "bold",
  },
  //OutlineButton
  outlineButton: {
    justifyContent: "center",
    borderWidth: 1.25,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.75,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //ToggleButton
  toggleButton: {
    justifyContent: "center",
    borderWidth: 1,
    paddingHorizontal: sizeFactor,
    borderRadius: 9999,
    paddingTop: sizeFactor * 0.75,
    flexDirection: "row",
    marginBottom: sizeFactor,
  },
  //ColorSelectButton
  colorSelectButton: (thecolor, selected) => {
    return {
      width: (windowWidth - 10 * sizeFactor) / 9,
      height: (windowWidth - 10 * sizeFactor) / 9,
      borderRadius: (windowWidth - 6 * sizeFactor) / 4.5,
      backgroundColor: thecolor,
      opacity: selected == thecolor ? 1 : 0.2,
      marginBottom: sizeFactor * 0.75,
    };
  },
  //ManagerCategory
  managerCategoryContainer: {
    height: managerCategoryHeight + sizeFactor / 2,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  managerCategoryChoosed: (choosed) => {
    return {
      alignSelf: "center",
      marginBottom: sizeFactor / 2,
      width: managerCategoryWidth,
      height: managerCategoryHeight,
      opacity: choosed ? 1 : 0,
      position: "absolute",
    };
  },
  managerCategoryImage: {
    alignSelf: "center",
    marginBottom: sizeFactor / 2,
    marginTop: sizeFactor * 0.24,
    marginLeft: sizeFactor * 0.03,
    opacity: 1,
    width: managerCategoryWidth - sizeFactor * 1.25,
    height: managerCategoryHeight - sizeFactor * 1.25,
  },
  managerCategoryStringContainer: {
    width: managerCategoryWidth,
    alignItems: "center",
  },
  managerCategoryString: (choosed) => {
    return {
      fontSize: sizeFactor * 0.75,
      fontWeight: choosed ? "bold" : "normal",
      color: choosed ? colors.blue : "black",
    };
  },
});
