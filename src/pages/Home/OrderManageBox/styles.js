import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  btn: {
    marginBottom: 23,
    width: "25%",
    alignItems: "center",
    paddingHorizontal: 28
  },
  img: {
    width: 86,
    height: 86
  },
  text: {
    color: "#333333",
    fontSize: 24
  },
  badgeBox: {
    borderRadius: 15,
    minWidth: 30,
    height: 30,
    backgroundColor: "#fff",
    borderWidth: "1 * $px",
    borderColor: "#ED3E50",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 3,
    transform: [{ translateX: 16 }]
  },
  badgeBox_text: {
    fontSize: 24,
    color: "#ED3E50"
  }
});
export default styles;
