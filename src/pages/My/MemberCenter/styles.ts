import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
import { ViewStyle } from "react-native";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
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
