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

  uploadBox: {
    justifyContent: "center",
    alignItems: "center"
  },
  uploadBox_image: {
    width: "100%",
    height: 328
  },
  uploadBox_btn: {
    width: "100%",
    flex: 1,
    height: 328,
    justifyContent: "center",
    alignItems: "center"
  },
  uploadBox_icon: {
    width: 138,
    height: 120
  },
  uploadBox_text: {
    fontSize: 30,
    color: "#CCCCCC",
    marginTop: 40
  },
  uploadBox_text1: {
    fontSize: 24,
    color: "#CCCCCC",
    marginTop: 15
  },

  checkBox: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  checkBox_li: {
    width: 200
    // height: 65
  },
  checkBox_text: {
    marginLeft: 22
  },

  couponItems: {
    flex: 1
  },
  couponItem: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    paddingRight: 13
  },
  couponItemInner: {
    borderWidth: "1 * $px",
    borderColor: "#E9374D",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    borderRadius: 4
  },
  couponItem_text: {
    fontSize: 24,
    color: "#E9374D"
  },
  couponItem_cancelBox: {
    position: "absolute",
    right: 0,
    top: 0
  },
  couponItem_cancelBox_img: {
    width: 26,
    height: 26
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
    fontSize: 30 * EStyleSheet.value("$scale"),
    marginRight: 28 * EStyleSheet.value("$scale"),
    minWidth: 190 * EStyleSheet.value("$scale")
  },
  input: {
    ...InputItemStyle.input,
    paddingLeft: 0,
    fontSize: 28 * EStyleSheet.value("$scale"),
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
    fontSize: 30 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale")
    minWidth: 223 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    width: 430 * EStyleSheet.value("$scale"),
    color: "#999999",
    fontSize: 30 * EStyleSheet.value("$scale"),
    flexDirection: "row"
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
});
