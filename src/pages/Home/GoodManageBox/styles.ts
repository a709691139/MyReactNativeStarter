import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
import { ViewStyle, TextStyle } from "react-native";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  } as ViewStyle,
  btn: {
    marginBottom: 23,
    width: "25%",
    alignItems: "center",
    paddingHorizontal: 28
  },
  img: {
    width: 86,
    height: 86
  },
  text: {
    color: "#333333",
    fontSize: 24
  }
});
export default styles;
