import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  item: {
    height: 105,
    paddingRight: 40,
    marginLeft: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: "1 * $px",
    borderColor: "#F5F5F5"
  },
  item_left: {
    flex: 1
  },
  item_left_text1: {
    fontSize: 28,
    color: "#4D4D4D"
  },
  item_left_text2: {
    marginTop: 10,
    fontSize: 22,
    color: "#999999"
  },
  item_right_text: {
    fontSize: 30,
    color: "#333333"
  }
});
export default styles;
