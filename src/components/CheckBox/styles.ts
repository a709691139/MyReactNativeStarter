import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  container: {},

  btn: {
    // height: "100%",
    // width: 60,
    flexDirection: "row",
    alignItems: "center"
    // justifyContent: "center"
  },
  btn_img: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  btn_text: {
    fontSize: 26,
    color: "#3D3D3D"
  }
});
export default styles;
