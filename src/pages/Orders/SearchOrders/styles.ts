import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchBar: {
    paddingHorizontal: 30,
    height: 112,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "1 * $px",
    borderColor: "#E5E5E5"
  },
  searchBar_inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 25
  },
  searchBar_icon: {
    tintColor: "#999999",
    width: 44,
    height: 44
  },
  searchBar_input: {
    paddingVertical: 0,
    fontSize: 30,
    flex: 1
  },
  searchBar_cancelText: {
    marginLeft: 30,
    color: "#333333",
    fontSize: 30
  }
});
export default styles;
