import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
import { ViewStyle } from "react-native";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },
  headerRightText: {
    color: MAIN_COLOR
  },
  list: {
    flex: 1,
    width: "100%"
  },

  item: {
    padding: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#f0f0f0"
  },
  item_text: {
    fontSize: 30,
    color: "#333333"
  },
  rowBack: {
    width: 120,
    height: "100%",
    backgroundColor: MAIN_COLOR,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0
  } as ViewStyle,
  rowBack_text: {
    fontSize: 28,
    color: "#fff"
  }
});
export default styles;
