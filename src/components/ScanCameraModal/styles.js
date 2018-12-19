import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text: {
    color: "black",
    fontSize: 22
  }
});
export default styles;
