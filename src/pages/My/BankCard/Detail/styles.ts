import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F5F5"
    // alignItems: "center"
  },

  titleBox: {
    height: 90,
    padding: 30,
    width: "100%"
  },
  titleBox_text: {
    fontSize: 24,
    color: "#999999"
  },
  titleBox_text_red: {
    color: "#E9374D"
  },

  bottomBtn: {
    marginTop: 30,
    backgroundColor: MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: 668,
    height: 88,
    borderRadius: 4,
    marginBottom: 22,
    alignSelf: "center"
  } as ViewStyle,
  bottomBtn_text: {
    color: "#fff",
    fontSize: 30
  }
});
export default styles;

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
    fontSize: 28 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale")
    // minWidth: 150 * EStyleSheet.value("$scale"),
    flex: 1
  },
  Extra: {
    ...ListItemStyle.Extra,
    color: "#999999",
    fontSize: 26 * EStyleSheet.value("$scale"),
    flexDirection: "row"
  }
  // column: {
  //   ...ListItemStyle.column,
  //   flex: 0,
  //   flexDirection: "row",
  //   alignItems: "center"
  // }
});

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
    // width: 225 * EStyleSheet.value("$scale"),
    color: "#3D3D3D",
    fontSize: 28 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale"),
    minWidth: 150 * EStyleSheet.value("$scale")
  },
  input: {
    ...InputItemStyle.input,
    paddingLeft: 0,
    fontSize: 28 * EStyleSheet.value("$scale"),
    color: "#3D3D3D",
    textAlign: "right"
  }
});
