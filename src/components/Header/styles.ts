import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR, HEADER_PADDING_BAR_HEIGHT } = constantStore;

const styles = EStyleSheet.create({
  headerStyle: {
    paddingTop: HEADER_PADDING_BAR_HEIGHT * EStyleSheet.value("$px"),
    height: 88 + HEADER_PADDING_BAR_HEIGHT * EStyleSheet.value("$px"),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#E5E5E5",
    borderBottomWidth: "1 * $px"
  },
  centerView: {
    position: "absolute",
    left: 0,
    top: HEADER_PADDING_BAR_HEIGHT,
    right: 0,
    bottom: 0,
    width: "100%",
    // backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  headerTitleStyle: {
    textAlign: "center"
  }
});
export default styles;
