import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F0F0F0"
  },

  headerRightText: {
    color: MAIN_COLOR
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
