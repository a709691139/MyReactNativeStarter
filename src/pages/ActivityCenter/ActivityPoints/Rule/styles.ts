import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  marginBox: {
    height: 30
  },

  extraBox: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "flex-end",
    // alignItems: "center"
    // backgroundColor: "#999",
    // width: 200
  },

  checkBox: {
    // flex: 1,
    // flexDirection: "column",
    justifyContent: "center",
    marginLeft: 90
  },
  checkBox_li: {
    width: "100%",
    height: 65
    // height: 65
  },
  checkBox_text: {
    marginLeft: 40
  },

  submitBtn: {
    width: 670,
    height: 88,
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 45
  },
  submitBtn_text: {
    color: "#fff",
    fontSize: 32
  }
});
export default styles;

export const listItemStyle = StyleSheet.create<any>({
  ...ListItemStyle,
  Item: {
    // ...ListItemStyle.Item,
    backgroundColor: "#fff",
    minHeight: 97 * EStyleSheet.value("$scale"),
    paddingLeft: 28 * EStyleSheet.value("$scale"),
    alignItems: "center",
    height: "auto"
  } as ViewStyle,
  Line: {
    ...ListItemStyle.Line,
    flexDirection: "row",
    alignItems: "center"
    // height: 200
    // height: "100%",
    // flex: 1
  } as ViewStyle,
  Content: {
    ...ListItemStyle.Content,
    color: "#3D3D3D",
    flex: 1,
    fontSize: 26 * EStyleSheet.value("$scale")
    // marginRight: 30 * EStyleSheet.value("$scale")
    // minWidth: 223 * EStyleSheet.value("$scale"),
    // flex: 1,
    // backgroundColor: "#bbb"
  },
  Extra: {
    ...ListItemStyle.Extra,
    // width: 430 * EStyleSheet.value("$scale"),
    color: "#999999",
    fontSize: 26 * EStyleSheet.value("$scale"),
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#bbb"
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});
