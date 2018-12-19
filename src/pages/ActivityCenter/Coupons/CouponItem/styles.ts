import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 30,
    marginHorizontal: 30,
    height: 198,
    flexDirection: "row"
  },

  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
  },

  leftBox: {
    width: 476,
    paddingLeft: 40
  },
  leftBox_text1: {
    color: "#E9374D",
    fontSize: 42,
    marginTop: 25
  },
  leftBox_text2: {
    color: "#333333",
    fontSize: 26,
    marginTop: 10
  },
  leftBox_text3: {
    color: "#808080",
    fontSize: 22,
    marginTop: 20
  },

  rightBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rightBox_text1: {
    color: "#E9374D",
    fontSize: 36
  },
  rightBox_text2: {
    fontSize: 20
  },
  rightBox_text3: {
    color: "#E9374D",
    fontSize: 20
    // marginTop: 10
  },
  circularBox: {
    backgroundColor: "#FFEDEF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
