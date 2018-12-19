import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import ListItemStyle from "antd-mobile-rn/lib/list/style/index.native";
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },

  marginBox: {
    height: 30,
    backgroundColor: "#F5F5F5"
  },
  tipsBox: {
    height: 60,
    paddingLeft: 30,
    justifyContent: "center"
  },
  tipsBox_text: {
    fontSize: 20,
    color: "#E9374D"
  },

  photosBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingBottom: 50
  },
  photoBox: {
    width: 330,
    marginLeft: 30
  },
  photoBox_title: {
    fontSize: 26,
    color: "#333333",
    marginVertical: 35
  },
  photoBox_picBox: {
    borderWidth: "1 * $px",
    borderColor: "#CCCCCC",
    backgroundColor: "#F9F9F9",
    width: 330,
    height: 242,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden"
  },
  uploadImage: {
    width: "100%",
    height: "100%"
  },
  photoBox_picBox_upload: {
    alignItems: "center",
    justifyContent: "center"
  },
  photoBox_picBox_upload_img: {
    width: 64,
    height: 64
  },
  photoBox_picBox_upload_text: {
    fontSize: 22,
    color: "#808080",
    marginTop: 8
  },

  agreeBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 120
  },
  agreeBox_checkBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center"
  },
  agreeBox_checkImg: {
    width: 25,
    height: 25
  },
  agreeBox_text: {
    color: "#999999",
    fontSize: 24
  },
  agreeBox_text_red: {
    color: MAIN_COLOR
  },

  submitBtn: {
    width: 670,
    height: 88,
    backgroundColor: MAIN_COLOR,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 45
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
    minWidth: 220 * EStyleSheet.value("$scale")
  },
  Extra: {
    ...ListItemStyle.Extra,
    textAlign: "left",
    color: "#999999",
    fontSize: 30 * EStyleSheet.value("$scale"),
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
    fontSize: 30 * EStyleSheet.value("$scale"),
    // marginRight: 30 * EStyleSheet.value("$scale"),
    minWidth: 220 * EStyleSheet.value("$scale")
  },
  input: {
    ...InputItemStyle.input,
    paddingLeft: 0,
    fontSize: 30 * EStyleSheet.value("$scale"),
    color: "#999999"
  }
});
