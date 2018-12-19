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
    justifyContent: "center"
  },

  row: {
    width: 734,
    height: 348,
    position: "relative"
  },
  bg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0
  },
  row_title: {
    // height: 85,
    position: "absolute",
    left: "21%",
    top: "15%"
    // justifyContent: "center"
  },
  row_title_text1: {
    fontSize: 36,
    color: "#fff"
  },
  row_title_text2: {
    fontSize: 24,
    color: "#fff"
  },
  row_number: {
    fontSize: 48,
    color: "#fff",
    position: "absolute",
    left: "71%",
    top: "51%"
  },
  row_name: {
    fontSize: 36,
    color: "#fff",
    position: "absolute",
    left: "78%",
    top: "38%"
  }
});
export default styles;
