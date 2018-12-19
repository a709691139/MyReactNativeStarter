import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff"
  },
  containerContent: {
    paddingHorizontal: 25
  },
  borderBox: {
    borderBottomWidth: "1 * $px",
    borderColor: "#EBEBEB",
    marginTop: 50
  },

  row: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  rowMain: {
    height: 160
  },
  row_label: {
    fontSize: 30,
    width: 150,
    display: "flex",
    justifyContent: "space-between",
    color: "#999999"
  },

  row_content: {
    flex: 1,
    textAlign: "right",
    fontSize: 30,
    color: "#333333"
  },
  price: { fontSize: 80 }
});
export default styles;
