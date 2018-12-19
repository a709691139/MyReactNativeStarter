import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1,
    alignItems: "center"
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
  },

  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingVertical: 26,
    marginHorizontal: 18,
    marginTop: 18
  },
  item_titleBox: {
    flexDirection: "row"
  },
  item_title: {
    fontSize: 30,
    color: "#333333",
    flex: 1,
    marginBottom: 22
  },
  item_time: {
    fontSize: 20,
    color: "#999999"
  },
  item_content: {
    fontSize: 26,
    color: "#666666",
    lineHeight: 40
  },

  bottomBtn: {
    backgroundColor: MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
    width: 668,
    height: 88,
    borderRadius: 4,
    marginBottom: 22
  },
  bottomBtn_text: {
    color: "#fff",
    fontSize: 30
  }
});
export default styles;
