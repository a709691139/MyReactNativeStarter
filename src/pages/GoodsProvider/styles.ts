import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
import { ViewStyle } from "react-native";
const {
  STATUS_BAR_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  REM,
  MAIN_COLOR
} = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },
  list: {
    flex: 1,
    width: "100%"
  },

  searchBar: {
    paddingHorizontal: 30,
    height: 112,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  searchBar_inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 690,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 25
    // marginRight: 20
  },
  searchBar_icon: {
    tintColor: "#999999",
    width: 44,
    height: 44
  },
  searchBar_input: {
    fontSize: 30,
    paddingVertical: 0,
    flex: 1
    // width: 340
  },
  searchBar_btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 75
  },
  searchBar_btn_img: {
    width: 44,
    height: 44
  },

  item: {
    padding: 30,
    backgroundColor: "#fff",
    marginBottom: 30
  },
  item_topBox: {
    flexDirection: "row"
  },
  titleBox: {
    flex: 1
  },
  titleBox_title: {
    fontSize: 36,
    color: "#333333"
  },
  titleBox_row: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  titleBox_row_text: {
    fontSize: 26,
    color: "#4d4d4d",
    marginLeft: 20
  },
  titleBox_linearGradient: {
    width: 94,
    height: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  titleBox_linearGradient_text: {
    fontSize: 18,
    color: "#fff"
  },
  titleBox_rightBox: {
    flexDirection: "row"
  },
  titleBox_rightBox_btn: {
    width: 41,
    height: 41,
    marginLeft: 45
  },
  item_imgsBox: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  item_imgsBox_img: {
    width: 154,
    height: 154
  },
  remarkBox: {
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 25,
    marginTop: 30,
    backgroundColor: "#F5F5F5"
  },
  remarkBox_text: {
    fontSize: 26,
    color: "#333333"
  },

  contextStyle: {
    margin: 50,
    flex: 1
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 400,
    paddingHorizontal: 5,
    paddingVertical: 10
  } as ViewStyle,
  triggerStyle: {
    flexDirection: "row",
    paddingHorizontal: 10
  },
  overlayStyle: {
    left: 90,
    marginTop: 20
  },
  // 在 iOS 上弹出层有阴影，Android 上没有，
  // 详细：http://facebook.github.io/react-native/releases/0.39/docs/shadow-props.html#shadowcolor
  androidOverlayStyle: {
    borderWidth: 1,
    borderColor: "#ccc"
  }
});
export default styles;
