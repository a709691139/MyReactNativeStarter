import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 244
  },
  bg: {
    width: 720,
    height: 244,
    position: "absolute",
    top: 0
  },
  contentBox: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 60
  },
  text1View: {
    marginTop: 40,
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
    fontSize: 64,
    marginTop: 3,
    marginBottom: 5
  },
  bottomView: {
    flexDirection: "row"
  },
  text3: {
    color: "#fff",
    fontSize: 26,
    marginRight: 40
  },
  text4: {
    color: "#fff",
    fontSize: 26
  },
  btnToWater: {
    flexDirection: "row",
    alignItems: "center",
    right: "10%",
    top: "22%",
    position: "absolute"
  },
  btnToWater_text: {
    fontSize: 24,
    color: "#fff"
  },
  btnToWater_img: {
    width: 22,
    height: 22,
    marginLeft: 7
  },

  noSuccess: {
    fontSize: 60,
    color: "#fff",
    marginBottom: 10
  }
});
export default styles;
