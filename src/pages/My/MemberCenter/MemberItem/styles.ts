import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 30,
    marginHorizontal: 30,
    padding: 30
  },

  userBox: {
    flexDirection: "row"
  },
  userBox_avatar: {
    width: 130,
    height: 130,
    marginRight: 30
  },
  userBox_main: {
    justifyContent: "center",
    flex: 1
  },
  userBox_main_text1: {
    fontSize: 36,
    color: "#333333"
  },
  userBox_main_text2: {
    fontSize: 24,
    color: "#666666",
    marginTop: 20
  },
  userBox_main_text3: {
    fontSize: 24,
    color: "#666666",
    marginTop: 20
  },
  userBox_rightBtn: {
    marginLeft: 15,
    height: 38,
    width: 38
  },

  numberBox: {
    marginTop: 30,
    backgroundColor: "#F5F5F5",
    height: 90,
    flexDirection: "row",
    alignItems: "center"
  },
  numberBox_li: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  numberBox_li_img: {
    width: 30,
    height: 30,
    marginRight: 12
  },
  numberBox_li_text: {
    // flex: 1,
    fontSize: 30,
    color: "#666666"
  },

  remarkText: {
    marginTop: 30
  }
});
export default styles;
