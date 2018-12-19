import { StyleSheet } from "react-native";
import constantStore from "stores/constantStore";
import EStyleSheet from "react-native-extended-stylesheet";

const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  indicator: {
    width: 24,
    height: 24,
    alignSelf: "center",
    marginTop: 13
  },
  footerText: {
    textAlign: "center",
    marginVertical: 15
  },
  emptyView: {
    alignItems: "center",
    width: "100%"
  },
  emptyImage: {
    width: 325 * EStyleSheet.value("$scale"),
    marginTop: 135 * EStyleSheet.value("$scale")
  },
  emptyText: {
    fontSize: 30 * EStyleSheet.value("$scale"),
    marginTop: 60 * EStyleSheet.value("$scale"),
    color: "#999999"
  }
});
export default styles;
