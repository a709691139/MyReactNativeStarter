import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  $color: "#e6e6e6", // 局部变量
  container: {
    width: "80%",
    height: 30,
    marginHorizontal: "10% - 20",
    marginTop: "10%",
    backgroundColor: "$color",
    alignItems: "center",
    padding: "0.5rem"
  },
  header: {
    fontSize: "1rem",
    color: "$fontColor"
  }
});
export default styles;
