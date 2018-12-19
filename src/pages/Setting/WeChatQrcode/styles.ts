import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 45
  },
  image: {
    width: 500,
    height: 500,
    marginBottom: 30,
    marginTop: 30
  },
  btn: {
    width: "100%",
    height: 88,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  btn_text: {
    color: "#fff",
    fontSize: 30
  }
});

export default styles;
