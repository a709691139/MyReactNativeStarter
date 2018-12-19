import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";

const styles = EStyleSheet.create({
  emptyView: {
    alignItems: "center",
    width: "100%"
  },
  emptyImage: {
    width: 325,
    marginTop: 135
  },
  emptyText: {
    fontSize: 36,
    marginTop: 60,
    color: "#999999"
  }
});
export default styles;
