import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    width: 156,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: "1.5 * $px",
    borderColor: MAIN_COLOR
  },
  containerDisabled: {
    borderColor: "#E6E6E6"
  },
  text: {
    fontSize: 24,
    color: MAIN_COLOR
  },
  textDisabled: {
    color: "#999999"
  }
});
export default styles;
