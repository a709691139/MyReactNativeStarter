import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, StyleSheetProperties } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, MAIN_COLOR } = constantStore;
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 72,
    paddingTop: 32,
    height: SCREEN_HEIGHT + " * $px"
    // justifyContent: "center"
  },

  submitBtn: {
    marginTop: 60
  }
});
export default styles;

export const inputItemStyle = StyleSheet.create({
  ...InputItemStyle,
  container: {
    ...InputItemStyle.container,
    height: 110 * EStyleSheet.value("$scale"),
    marginLeft: 0,
    borderBottomColor: "#F0F0F0"
  },
  input: {
    ...InputItemStyle.input,
    fontSize: 30 * EStyleSheet.value("$scale"),
    paddingLeft: 0
  }
});
