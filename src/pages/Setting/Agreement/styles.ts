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
  }
});
export default styles;
