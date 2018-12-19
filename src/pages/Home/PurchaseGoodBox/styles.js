import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    width: 334,
    height: 200,
    borderRadius: 6
  },
  bg: {
    width: 334,
    height: 200,
    position: "absolute"
  },
  text: {
    color: "#fff",
    fontSize: 22,
    marginLeft: 30,
    marginTop: 70
  }
});
export default styles;
