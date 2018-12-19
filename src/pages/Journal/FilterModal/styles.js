import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
const { HEADER_PADDING_BAR_HEIGHT, MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: HEADER_PADDING_BAR_HEIGHT
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "#333333",
    marginVertical: 25
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  dateBox: {
    width: 320,
    borderWidth: 1,
    borderColor: "#E5E4E3",
    borderRadius: 4
  },
  iconDate: {
    width: 30,
    height: 30
  },

  btnsBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    marginTop: 45
  },
  btnsBox_btn: {
    width: 215,
    height: 65,
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    marginLeft: 25
  },
  btnsBox_btn_text: {
    fontSize: 24,
    color: "#333333"
  },

  bottomBox: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  bottomBox_btn: {
    flex: 1,
    height: 86,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomBox_btnRed: {
    backgroundColor: "#E9374D"
  },
  bottomBox_btn_text: {
    fontSize: 30,
    color: "#333333"
  },
  bottomBox_btn_textRed: {
    color: "#fff"
  }
});
export default styles;

export const listItemStyle = StyleSheet.create({
  ...ListItemStyle,
  Item: {
    ...ListItemStyle.Item,
    height: 60 * EStyleSheet.value("$scale"),
    alignItems: "center"
  },
  Body: {
    ...ListItemStyle.Body,
    borderWidth: 1,
    borderColor: "#E5E4E3",
    borderRadius: 4
  },
  Line: {
    ...ListItemStyle.Line,
    height: "100%",
    flex: 1
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    color: "#333333",
    fontSize: 28 * EStyleSheet.value("$scale"),
    flexDirection: "row",
    flex: 1,
    marginLeft: 15 * EStyleSheet.value("$scale")
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});
