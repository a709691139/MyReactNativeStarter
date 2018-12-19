import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  flatList: {
    height: 450
  },
  title: {
    marginBottom: 5,
    fontSize: 24
  },

  container: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: "1 *$px",
    borderColor: "#F5F5F8",
    flexDirection: "row",
    alignItems: "center"
  },
  colorRed: {
    color: "#FB6E6F"
  },
  imageView: {
    marginRight: 15
  },
  imageView_img: {
    width: 108,
    height: 108
  },
  centerView: {
    flex: 1,
    marginRight: 15
  },
  centerView_text1: {
    fontSize: 28,
    color: "#333333"
  },
  centerView_text2: {
    fontSize: 22,
    color: "#666666"
  },
  centerView_priceBox: {
    flexDirection: "row",
    marginTop: 5
  },
  centerView_priceBox_text1: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#FB6F6F",
    paddingHorizontal: 10,
    borderColor: "#FB6F6F",
    borderWidth: "1*$px",
    borderRightWidth: 0,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2
  },
  centerView_priceBox_text2: {
    fontSize: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderColor: "#FB6F6F",
    borderWidth: "1*$px",
    borderLeftWidth: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  rightView: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end"
  },
  rightView_text1: {
    fontSize: 22,
    color: "#999999"
  },
  rightView_text2: {
    fontSize: 26,
    color: "#999999",
    marginTop: 5
  }
});
export default styles;
