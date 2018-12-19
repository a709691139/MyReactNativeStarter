import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff"
  },

  title: {
    color: "#3D3D3D",
    fontSize: 54,
    marginVertical: 25,
    marginLeft: 30
  },

  myBox: {
    width: "100%",
    height: 308,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 73
  },
  myBox_bg: {
    width: 750,
    height: 308,
    position: "absolute",
    left: 0,
    top: 0
  },
  myBox_avatar: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    marginRight: 35
  },
  myBox_textBox: {
    justifyContent: "center"
  },
  myBox_textBox_text1: {
    fontSize: 36,
    color: "#fff"
  },
  myBox_textBox_text2: {
    marginTop: 18,
    fontSize: 24,
    color: "#fff"
  },

  list: {
    marginTop: 70
  },
  list_li: {
    flexDirection: "row",
    alignItems: "center",
    height: 75,
    paddingHorizontal: 30,
    marginBottom: 40
  },
  list_li_icon: {
    width: 36,
    height: 36
  },
  list_li_text: {
    color: "#333333",
    fontSize: 30,
    flex: 1,
    marginRight: 20,
    marginLeft: 30
  },
  list_li_extra: {
    color: "#E9374D",
    fontSize: 26,
    marginRight: 20
  }
});
export default styles;
