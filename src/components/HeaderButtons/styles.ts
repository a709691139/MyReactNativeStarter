import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 88,
    height: 88
  },
  ChildButton: {
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
