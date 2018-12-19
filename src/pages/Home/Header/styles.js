import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { HEADER_PADDING_BAR_HEIGHT, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    paddingTop: HEADER_PADDING_BAR_HEIGHT,
    height: 100 + HEADER_PADDING_BAR_HEIGHT * EStyleSheet.value("$px"),
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 32
  },
  avatarBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    marginRight: 22
  },
  avatar: {
    width: 60,
    height: 60
  },
  text: {
    color: "#313747",
    fontSize: 38,
    flex: 1
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 44,
    height: "100%",
    width: 60
  },
  btn_img: {
    width: 44,
    height: 44
  }
});
export default styles;
