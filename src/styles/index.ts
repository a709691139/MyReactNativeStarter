import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";

// https://github.com/vitalets/react-native-extended-stylesheet#rem-units
const { height, width } = Dimensions.get("window");
// 设置全局样式 变量
const $scale = width / 750; // 默认用 iphone6的设计图宽度
const $vw = width / 100 / $scale;
const $vh = height / 100 / $scale;

EStyleSheet.build({
  $rem: 16,
  $scale: $scale,
  $px: 1 / $scale, // 真实像素，borderBottomWidth: "1 * $px",
  $vw: $vw, // 1vw = 1%屏幕宽度  width: "60 * $vw",
  $vh: $vh, // 1vh = 1%屏幕高度
  $fontColor: "black"
});
// 单独抽出 变量
// EStyleSheet.value('$rem');
// console.log({
//   width: width,
//   $rem: 16,
//   $scale: $scale,
//   $px: 1 / $scale, // 真实像素，borderBottomWidth: "1 * $px",
//   $vw: $vw, // 1vw = 1%屏幕宽度  width: "60 * $vw",
//   $vh: $vh, // 1vh = 1%屏幕高度
//   $fontColor: "black"
// });
// 热更新样式
if (module.hot) {
  module.hot.accept(() => {
    EStyleSheet.clearCache();
    EStyleSheet.build();
  });
}
export default EStyleSheet;
/* 
const styles = EStyleSheet.create({
  $color: "#e6e6e6", // 局部变量
  container: {
    width: "80%",
    height: 30,
    marginHorizontal: "10% - 20",
    marginTop: "10%",
    backgroundColor: "$color",
    alignItems: "center",
    padding: "0.5rem"
  },
  header: {
    fontSize: "1rem",
    color: "$fontColor"
  }
}); */

// 传入自定义变量
/* let getStyle = function(scale = 1) {
  return EStyleSheet.create({
    $scale: scale,
    button: {
      width: 100,
      height: 20,
      marginLeft: 10
    }
  });
};
 */
// child行样式，解析数量和index
/* <View key={index} style={EStyleSheet.child(childStyles, 'row', index, items.length)}></View> */
/* const childStyles = EStyleSheet.create({
  row: {
    fontSize: "1.5rem",
    borderTopWidth: 1
  },
  "row:nth-child-odd": {
    backgroundColor: "white"
  },
  "row:nth-child-even": {
    backgroundColor: "gray"
  },
  "row:first-child": {
    borderBottomWidth: 1
  },
  "row:last-child": {
    borderBottomWidth: 2
  }
});
 */
