import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentBox: {
    minHeight: `100 * $vh`
  },
  marginBox: {
    backgroundColor: "#F0F0F0",
    height: 30
  },
  titleBox: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 28,
    paddingHorizontal: 28
  },
  titleBox_border: {
    backgroundColor: MAIN_COLOR,
    width: 6,
    height: 30,
    marginRight: 15
  },
  titleBox_text: {
    color: "#333333",
    fontSize: 30
  },
  titleBox_text2: {
    color: "#CCCCCC",
    fontSize: 34
  },

  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 60
  }
});
export default styles;
