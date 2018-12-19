import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
const { HEADER_PADDING_BAR_HEIGHT, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: HEADER_PADDING_BAR_HEIGHT
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 25,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "#333333",
    marginVertical: 30
  },

  btnsBox: {
    flexDirection: "row",
    // justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%"
  },
  btnsBox_btn: {
    width: 215,
    height: 65,
    borderRadius: 4,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    marginLeft: 25
  },
  btnsBox_btnOn: {
    backgroundColor: MAIN_COLOR
  },
  btnsBox_btn_text: {
    fontSize: 24,
    color: "#333333"
  },
  btnsBox_btn_textOn: {
    color: "#fff"
  },

  bottomBox: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  bottomBox_btn: {
    flex: 1,
    height: 86,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomBox_btnRed: {
    backgroundColor: "#E9374D"
  },
  bottomBox_btn_text: {
    fontSize: 30,
    color: "#333333"
  },
  bottomBox_btn_textRed: {
    color: "#fff"
  }
});
export default styles;
