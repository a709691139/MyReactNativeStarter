import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";

const styles = EStyleSheet.create({
  selectBtn: {
    flex: 1,
    alignItems: "flex-end"
  },
  selectBtn_img: {
    width: 36,
    height: 36,
    borderRadius: 18
  }
});
export default styles;

export const listItemStyle = StyleSheet.create<any>({
  ...ListItemStyle,
  Item: {
    ...ListItemStyle.Item,
    height: 97 * EStyleSheet.value("$scale"),
    paddingLeft: 28 * EStyleSheet.value("$scale"),
    flex: 1,
    width: "100%"
  } as ViewStyle,
  Line: {
    ...ListItemStyle.Line,
    height: "100%",
    flex: 1
  } as ViewStyle,
  Content: {
    ...ListItemStyle.Content,
    color: "#3D3D3D",
    fontSize: 30 * EStyleSheet.value("$scale")
    // flex: 1
    // width: "80%"
    // marginRight: 30 * EStyleSheet.value("$scale")
    // minWidth: 223 * EStyleSheet.value("$scale"),
  },
  Extra: {
    ...ListItemStyle.Extra
    // textAlign: "left",
    // // // width: 430 * EStyleSheet.value("$scale"),
    // color: "#999999",
    // fontSize: 30 * EStyleSheet.value("$scale"),
    // flexDirection: "row"
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});
