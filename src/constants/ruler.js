import { Dimensions } from "react-native";

export const sizeFactor = windowWidth / 25.7;
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const managerCategoryWidth = (windowWidth - 5 * sizeFactor) / 4;
export const managerCategoryHeight = (windowWidth - 5 * sizeFactor) / 4;
