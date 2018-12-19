import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 125
  },
  title: {
    marginTop: 20,
    fontSize: 34,
    color: "#333333"
  },
  content: {
    lineHeight: 55,
    marginTop: 50,
    fontSize: 24,
    color: "#666666"
  },
  bottomBox: {
    position: "absolute",
    bottom: 55
  },
  bottomBox_text: {
    marginTop: 10,
    fontSize: 24,
    color: "#999999",
    textAlign: "center"
  }
});
export default styles;
