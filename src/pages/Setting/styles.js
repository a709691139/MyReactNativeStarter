import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f2f2f2"
  },
  marginBox: {
    marginTop: 30
  },
  logoutBox: {
    alignSelf: "center",
    marginBottom: 30
  },
  logoutBox_btn: {
    width: 668,
    height: 88,
    backgroundColor: "#E9374D",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  logoutBox_text: {
    color: "#fff",
    fontSize: 30
  },
  addressText: {
    width: 500 - 30
  }
});
export default styles;

export const listItemStyle = StyleSheet.create({
  ...ListItemStyle,
  Item: {
    ...ListItemStyle.Item,
    height: 97 * EStyleSheet.value("$scale"),
    paddingLeft: 28 * EStyleSheet.value("$scale")
  },
  Line: {
    ...ListItemStyle.Line,
    height: "100%",
    flex: 1
  },
  Content: {
    ...ListItemStyle.Content,
    color: "#3D3D3D",
    fontSize: 26 * EStyleSheet.value("$scale"),
    marginRight: 54 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    width: 500 * EStyleSheet.value("$scale"),
    color: "#666666",
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
