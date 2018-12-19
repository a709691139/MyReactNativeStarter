import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  marginBox: {
    height: 30
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

export const inputItemStyle = StyleSheet.create<any>({
  ...InputItemStyle,
  container: {
    ...InputItemStyle.container,
    height: 97 * EStyleSheet.value("$scale"),
    paddingLeft: 0,
    marginLeft: 28 * EStyleSheet.value("$scale")
  },
  text: {
    ...InputItemStyle.text,
    color: "#999999",
    fontSize: 26 * EStyleSheet.value("$scale"),
    // marginRight: 28 * EStyleSheet.value("$scale"),
    minWidth: 223 * EStyleSheet.value("$scale")
  },
  input: {
    ...InputItemStyle.input,
    paddingLeft: 0,
    fontSize: 26 * EStyleSheet.value("$scale"),
    color: "#999999"
  }
});

export const listItemStyle = StyleSheet.create<any>({
  ...ListItemStyle,
  Item: {
    ...ListItemStyle.Item,
    height: 97 * EStyleSheet.value("$scale"),
    paddingLeft: 28 * EStyleSheet.value("$scale")
  } as ViewStyle,
  Line: {
    ...ListItemStyle.Line,
    height: "100%",
    flex: 1
  } as ViewStyle,
  Content: {
    ...ListItemStyle.Content,
    color: "#999999",
    fontSize: 26 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale")
    minWidth: 223 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    width: 430 * EStyleSheet.value("$scale"),
    color: "#999999",
    fontSize: 26 * EStyleSheet.value("$scale"),
    flexDirection: "row"
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});
