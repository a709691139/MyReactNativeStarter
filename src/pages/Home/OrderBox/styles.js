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
  },
  countBox: {
    height: 38,
    width: 38,
    backgroundColor: "#E9374D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: "1 * $px",
    borderColor: "#E6D5C2",
    borderRadius: 38,
    position: "absolute",
    right: 25,
    top: 25
  },
  countBox_text: {
    fontSize: 22,
    color: "#fff"
  }
});
export default styles;
