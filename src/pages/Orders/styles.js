import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },
  list: {
    flex: 1,
    width: "100%"
  },

  noMoreBox: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30
  },
  noMoreBox_border: {
    width: 185,
    borderBottomWidth: "1 * $px",
    borderColor: "#999999",
    position: "absolute"
  },
  noMoreBox_border_left: {
    left: 0
  },
  noMoreBox_border_right: {
    right: 0
  },
  noMoreBox_text: {
    fontSize: 26,
    color: "#999999"
  }
});
export default styles;
