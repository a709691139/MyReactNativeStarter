import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  btn: {
    marginBottom: 23,
    width: "50%",
    alignItems: "center",
    paddingHorizontal: 28
  },
  img: {
    width: 348,
    height: 162
  }
});
export default styles;
