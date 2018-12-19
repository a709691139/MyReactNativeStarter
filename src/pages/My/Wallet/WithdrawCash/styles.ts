import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { TextStyle, ViewStyle } from "react-native";

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F5F5F5"
  } as ViewStyle,
  bankInfo: {
    marginTop: 30,
    padding: 30,
    backgroundColor: "#fff",
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center"
  } as ViewStyle,
  leftText: {
    marginLeft: 30
  },
  bankName: { fontSize: 34, color: "#333333", paddingBottom: 5 },
  des: { fontSize: 26, color: "#999999" },
  iconRight: {
    fontSize: 40,
    position: "absolute",
    right: 20,
    alignItems: "center"
  } as TextStyle,
  moneyBox: {
    marginTop: 30,
    padding: 30,
    backgroundColor: "#fff"
  },
  moneyLine: { marginTop: 30, flexDirection: "row", alignItems: "center" },
  moneyIcon: { fontSize: 54, color: "#333" },
  input: {
    paddingLeft: 20,
    fontSize: 28,
    flex: 1
  },
  allBtn: {
    position: "absolute",
    right: 0,
    fontSize: 30,
    color: "#6394FF"
  },

  img: {
    height: 60,
    width: 60
  },
  bottomBox: {
    width: "100%",
    marginTop: 30,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomBox_btn: {
    backgroundColor: MAIN_COLOR,
    width: 670,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  bottomBox_btn_text: {
    fontSize: 30,
    color: "#fff"
  },
  tip: { height: 80, textAlign: "center", fontSize: 26, color: "#999999" },
  redTip: { color: "#E9374D" }
});
export default styles;
