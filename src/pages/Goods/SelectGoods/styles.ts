import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  headerRightText: {
    color: "#333333",
    fontSize: 28
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff"
  },

  searchBar: {
    height: 112,
    paddingHorizontal: 30,
    // height: 112,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  searchBar_inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 690,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 25
    // marginRight: 20
  },
  searchBar_icon: {
    tintColor: "#999999",
    width: 44,
    height: 44
  },
  searchBar_input: {
    fontSize: 30,
    paddingVertical: 0,
    flex: 1
    // width: 340
  },
  searchBar_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 75
  },
  searchBar_btn_img: {
    width: 44,
    height: 44
  },

  bottomBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    borderTopWidth: "1*$px",
    borderColor: "#E0E0E0",
    height: 98
  },
  bottomBox_flex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottomBox_btn: {
    height: 60,
    width: 150,
    marginLeft: 20,
    backgroundColor: "#E9374D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  bottomBox_btnRed: {
    backgroundColor: "#E9374D"
  },
  bottomBox_btn_text: {
    fontSize: 24,
    color: "#fff"
  },
  bottomBox_allSelectBtn: {
    flexDirection: "row",
    alignItems: "center"
  },
  bottomBox_allSelectBtn_text: {
    fontSize: 30,
    color: "#666",
    marginLeft: 20
  }
});
export default styles;
