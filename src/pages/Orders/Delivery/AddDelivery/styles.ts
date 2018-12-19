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

  serviceBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  serviceBox_btn: {
    width: 160,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: "1 * $px",
    borderColor: "#999999"
  },
  serviceBox_btn2: {
    marginLeft: 40
  },
  serviceBox_btn_on: {
    borderColor: "#E9374D"
  },
  serviceBox_btn_text: {
    color: "#999999",
    fontSize: 24
  },
  serviceBox_btn_text_on: {
    color: "#E9374D"
  },

  bottomBox: {
    height: 100,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center"
  },
  bottomBox_money: {
    color: "#E9374D",
    fontSize: 36,
    flex: 1,
    paddingHorizontal: 35
  },
  bottomBox_moneyDetailBtn: {
    marginRight: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  bottomBox_moneyDetailBtn_img: {
    height: 44,
    width: 44
  },
  bottomBox_moneyDetailBtn_text: {
    color: "#999999",
    fontSize: 26
  },
  bottomBox_submitBtn: {
    width: 220,
    height: "100%",
    backgroundColor: "#E9374D",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomBox_submitBtn_text: {
    color: "#fff",
    fontSize: 30
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
    color: "#3D3D3D",
    fontSize: 30 * EStyleSheet.value("$scale"),
    marginRight: 28 * EStyleSheet.value("$scale"),
    minWidth: 190 * EStyleSheet.value("$scale")
  },
  input: {
    ...InputItemStyle.input,
    paddingLeft: 0,
    fontSize: 30 * EStyleSheet.value("$scale"),
    color: "#3D3D3D"
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
    color: "#3D3D3D",
    fontSize: 30 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale")
    minWidth: 223 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    width: 430 * EStyleSheet.value("$scale"),
    color: "#3D3D3D",
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
