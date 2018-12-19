import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 40
  },

  input: {
    padding: 0,
    fontSize: 24,
    color: "#666666",
    backgroundColor: "#F0F2F5",
    height: "100%",
    width: 77,
    textAlign: "center"
  },

  btn: {
    height: "100%",
    width: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  btn_text: {
    fontSize: 35,
    color: "#666666"
  }
});
export default styles;
