import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F5F5",
    alignItems: "center"
  },
  bg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 544,
    left: 0
  },

  momeyBox: {
    height: 320,
    alignItems: "center",
    justifyContent: "center"
  },

  momeyBox_text1: {
    fontSize: 80,
    color: "#fff"
  },
  momeyBox_text2: {
    marginTop: 10,
    fontSize: 28,
    color: "#fff"
  },

  mainBox: {
    flex: 1,
    width: 690,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  mainBox_title: {
    height: 110,
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    borderBottomWidth: "1 * $px",
    borderColor: "#F7F7F7"
  },
  mainBox_title_text: {
    fontSize: 30,
    color: "#333333"
  },
  mainBox_list: {
    flex: 1
  },

  mainBox_bottomBox: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  mainBox_bottomBox_text: {
    fontSize: 24,
    color: "#4D4D4D"
  },
  mainBox_bottomBox_text1: {
    marginRight: 15
  },

  bottomBox: {
    width: "100%",
    marginTop: 30,
    height: 150,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomBox_btn: {
    backgroundColor: MAIN_COLOR,
    width: 670,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  bottomBox_btn_text: {
    fontSize: 30,
    color: "#fff"
  }
});
export default styles;
