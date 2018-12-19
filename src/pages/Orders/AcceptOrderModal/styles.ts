import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    width: 678,
    height: 463,
    borderRadius: 4,
    padding: 50
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 30,
    color: "#333333",
    textAlign: "center",
    marginBottom: 50
  },

  contentBox: {
    flex: 1
  },

  checkBoxList: {},
  checkBox: {
    marginBottom: 35,
    flexDirection: "row",
    alignItems: "center"
  },
  checkBox_text: {
    color: "#333333",
    fontSize: 30,
    flex: 1,
    marginLeft: 30
  },

  TextInput: {
    flex: 1,
    fontSize: 30,
    textAlignVertical: "top",
    borderWidth: "1 * $px",
    borderColor: "#EBEBEB",
    borderRadius: 4,
    backgroundColor: "#FAFAFA",
    padding: 25,
    width: "100%"
  },

  bottomBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 35
  },
  bottomBox_btn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 75
  },
  bottomBox_btn_text: {
    fontSize: 30,
    color: "#333333"
  },
  bottomBox_btn_textRed: {
    color: MAIN_COLOR
  }
});
export default styles;
