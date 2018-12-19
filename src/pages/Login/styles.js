import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, Dimensions } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import InputItemStyle from "antd-mobile-rn/lib/input-item/style/index.native";

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 72,
    paddingTop: 32,
    height: SCREEN_HEIGHT + " * $px"
    // alignItems: "center",
    // justifyContent: "center"
  },
  form: { marginTop: 135 },
  title: {
    fontSize: 56,
    color: "#383131",
    width: "100%",
    textAlign: "center",
    marginBottom: 80
  },

  modeBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 100
  },
  modeBox_text: {
    fontSize: 36,
    color: "#999999"
  },
  modeBox_text_on: {
    color: "#333333"
  },

  sendCodeBtn: {
    marginLeft: 10
  },
  submitBtn: {
    marginTop: 60
  },
  agreeBox: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    bottom: 32
  },
  agreeBox_text: {
    color: "#CDCDCD",
    fontSize: 24,
    textAlign: "center"
  },
  agreeBox_text_red: {
    color: "#DC5A58"
  }
});
export default styles;

export const inputItemStyle = StyleSheet.create({
  ...InputItemStyle,
  container: {
    ...InputItemStyle.container,
    height: 110 * EStyleSheet.value("$scale"),
    marginLeft: 0,
    borderBottomColor: "#F0F0F0"
  },
  input: {
    ...InputItemStyle.input,
    fontSize: 30 * EStyleSheet.value("$scale"),
    paddingLeft: 0
  }
});

export const anotherLoginBoxStyle = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  titleBox: {
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  titleBox_border: {
    width: "100%",
    height: "1*$px",
    backgroundColor: "#F0F0F0",
    position: "absolute",
    left: 0,
    top: 11
  },
  titleBox_text: {
    height: 30,
    width: 150,
    fontSize: 24,
    color: "#CDCDCD",
    backgroundColor: "#fff",
    textAlign: "center"
  },
  btnsBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnsBox_margin: {
    width: 85
  },
  btn: {
    justifyContent: "center",
    alignItems: "center"
  },
  btn_img: {
    width: 72,
    height: 72
  },
  btn_text: {
    marginTop: 15,
    fontSize: 24,
    color: "#CDCDCD"
  }
});
