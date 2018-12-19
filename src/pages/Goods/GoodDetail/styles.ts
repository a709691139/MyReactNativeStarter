import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR, HEADER_PADDING_BAR_HEIGHT, SCREEN_HEIGHT } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

const styles = EStyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff"
    // height: SCREEN_HEIGHT
  },
  headerStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    top: 0,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: "#333333"
  },
  headerBtnImg: {
    height: 70,
    width: 70
  },

  marginBox: {
    height: 20,
    backgroundColor: "#F5F5F5"
  },

  listHeader: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    paddingHorizontal: 30
  },
  listHeader_icon: {
    marginRight: 10,
    height: 26,
    width: 6,
    backgroundColor: "#FF5E5F"
  },
  listHeader_text: {
    color: "#333333",
    fontSize: 28
  },

  TextareaItem: {
    paddingHorizontal: 30
  },

  checkBtn: {
    width: 136,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: "#FB6E6F"
  },
  checkBtn_text: {
    color: "#fff",
    fontSize: 28
  },

  picContainer: {
    justifyContent: "center",
    minHeight: 88 + HEADER_PADDING_BAR_HEIGHT * EStyleSheet.value("$px")
  },
  uploadImage: {
    width: "100%",
    height: 720
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
  },

  systemMatchPicBox: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center"
  },
  systemMatchPicBox_imgBox: {
    width: 720 / 4,
    height: 720 / 4,
    borderRadius: 4,
    borderWidth: "1*$px",
    borderColor: "#F5F5F5",
    marginRight: 25
  },
  systemMatchPicBox_img: {
    width: 720 / 4,
    height: 720 / 4
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
    minWidth: 150 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    width: 516 * EStyleSheet.value("$scale"),
    color: "#3D3D3D",
    fontSize: 26 * EStyleSheet.value("$scale"),
    flexDirection: "row",
    flex: 1
  },
  column: {
    ...ListItemStyle.column,
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  }
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
    color: "#3D3D3D"
  }
});
