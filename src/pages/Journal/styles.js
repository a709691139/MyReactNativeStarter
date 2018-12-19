import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  emptyView: {
    alignItems: "center",
    width: "100%"
  },
  emptyImage: {
    width: 528,
    height: 271,
    marginTop: 120
  },
  emptyText: {
    fontSize: 30,
    marginTop: 30,
    color: "#CCCCCC"
  }
});
export default styles;
