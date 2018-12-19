import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: "1*$px",
    borderColor: "#F0F0F0"
  },
  item_main: {
    flex: 1,
    justifyContent: "center"
  },
  item_main_text1: {
    fontSize: 26,
    color: "#000"
  },
  item_main_text2: {
    fontSize: 20,
    color: "#B1B1B1"
  },
  item_right: {
    width: 40
  }
});
export default styles;
