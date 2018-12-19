import { Platform, Dimensions, UIManager, StatusBar } from "react-native";
const { height, width } = Dimensions.get("window");
import { resize_rem } from "../utils/CommonUtils";

// const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : 25;
let STATUS_BAR_HEIGHT: number =
  Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
let HEADER_BAR_HEIGHT: number = STATUS_BAR_HEIGHT;
if (Platform.OS === "android") {
  //开启动画
  UIManager.setLayoutAnimationEnabledExperimental(true);
  if (Platform.Version < 21) {
    // 安卓5.0以下没有沉浸式状态条
    HEADER_BAR_HEIGHT = 0;
  }
}
const constantStore = {
  PLATFORM_OS: Platform.OS,
  HEADER_PADDING_BAR_HEIGHT: HEADER_BAR_HEIGHT, // 头部paddingTop高度
  STATUS_BAR_HEIGHT: StatusBar.currentHeight,
  ABOVE_LOLIPOP: Platform.Version && Platform.Version > 19,
  // ROOT_API_URL: "http://192.168.1.254:4082", // 本地局域网测试
  // ROOT_API_URL: "https://www.yizhonhui.com:4082", // 正式服务器
  ROOT_API_URL: __DEV__
    ? "http://192.168.1.254:4082"
    : "https://yzh.jiushoupaotui.com:4082", // 测试域名服务器
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  REM: resize_rem(),
  MAIN_COLOR: "#E9374D", // "#ff9c35",
  SUB_COLOR: "#ff3434"
};
export default constantStore;
