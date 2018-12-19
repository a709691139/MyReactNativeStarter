import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  webviewBox: {
    flex: 1
  },
  webview: {
    flex: 1
  },
  webviewBox_centerPositionBox: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#fff",
    borderWidth: "1*$px",
    borderColor: "#D9D7D5",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  webviewBox_centerPositionBox_img: {
    width: 40,
    height: 40
  }
});
export default styles;
