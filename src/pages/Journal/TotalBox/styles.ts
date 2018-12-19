import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";

const styles = EStyleSheet.create({
  container: {
    height: 330,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center"
  },
  bg: {
    width: 720,
    height: 294,
    top: 20,
    position: "absolute"
  },
  text1View: {
    marginTop: 80,
    flexDirection: "row",
    alignItems: "center"
  },
  text1View_img: {
    width: 44,
    height: 44,
    marginLeft: 8
  },
  text1: {
    color: "#fff",
    fontSize: 26
  },
  text2: {
    color: "#fff",
    fontSize: 70,
    marginTop: 25
  }
});
export default styles;
