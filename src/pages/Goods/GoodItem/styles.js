import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 30,
    marginLeft: 30,
    flexDirection: "row"
  },
  containerSelect: {
    marginLeft: 0
  },

  selectBtn: {
    width: 90,
    alignItems: "center",
    justifyContent: "center"
  },
  left_imgView: {
    width: 160,
    height: 160,
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  left_img: {
    width: 160,
    height: 160
  },

  main: {
    flex: 1,
    borderBottomWidth: "1 * $px",
    borderColor: "#E0E0E0"
  },

  main_titleBox: {
    flexDirection: "row"
  },
  main_title: {
    flex: 1,
    color: "#333333",
    fontSize: 30
  },
  main_statusBox: {
    backgroundColor: "#FDEBED",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    width: 72,
    height: 30,
    marginRight: 10,
    marginTop: 7
  },
  main_statusBoxOn: {
    backgroundColor: MAIN_COLOR
  },
  main_statusBox_text: {
    color: MAIN_COLOR,
    fontSize: 18
  },
  main_statusBox_textOn: { color: "#fff" },

  main_countBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  main_countBox_text: {
    fontSize: 24,
    color: "#666666"
  },
  main_countBox_textBorder: {
    width: "1*$px",
    backgroundColor: "#CCCCCC",
    height: "75%",
    marginHorizontal: 15
  },

  main_price: {
    color: MAIN_COLOR,
    fontSize: 20,
    marginTop: 45
  },
  main_price2: {
    fontSize: 26
  },
  main_price_selectMode: {
    marginTop: 15,
    marginBottom: 25
  },

  bottomBtnsBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    paddingRight: 45
  },
  bottomBtnsBox_btn: {
    width: 140,
    height: 50,
    borderRadius: 25,
    borderColor: "#B3B3B3",
    borderWidth: "1 * $px",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  bottomBtnsBox_btn_text: {
    color: "#3D3D3D",
    fontSize: 26,
    textAlign: "center"
  }
});
export default styles;
