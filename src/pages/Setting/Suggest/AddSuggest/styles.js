import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: 40
  },
  textInput: {
    fontSize: 30,
    borderLeftWidth: "1* $px",
    borderRightWidth: "1* $px",
    borderColor: "#E4E4E4"
  },
  button: {
    marginTop: 40
  }
});

export default styles;
