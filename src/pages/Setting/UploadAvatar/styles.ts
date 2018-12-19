import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: 328
  },
  uploadBox_btn: {
    width: "100%",
    flex: 1,
    height: 328,
    justifyContent: "center",
    alignItems: "center"
  },
  uploadBox_img: {
    width: 138,
    height: 120
  },
  uploadBox_text: {
    fontSize: 30,
    color: "#CCCCCC",
    marginTop: 40
  }
});

export default styles;
