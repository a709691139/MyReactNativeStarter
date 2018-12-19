import EStyleSheet from "react-native-extended-stylesheet";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  submitBtn: {
    width: 400,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 45,
    borderWidth: "1 * $px",
    borderColor: "#E9374D"
  },
  submitBtn_text: {
    color: "#E9374D",
    fontSize: 30
  },

  progressBox: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "center"
  },
  progressBox_border: {
    backgroundColor: "#E9374D",
    height: 6,
    width: 432 / 2,
    position: "absolute",
    top: 44 / 2 - 6,
    left: "50%"
  },
  progressBox_border_grey: {
    backgroundColor: "#E6E6E6"
  },

  progressBox_li: {
    width: 215,
    alignItems: "center",
    justifyContent: "center"
  },
  progressBox_li_point: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    width: 44,
    height: 44
  },
  progressBox_li_point_text: {
    fontSize: 30,
    color: "#fff"
  },
  progressBox_li_point_text_grey: {
    color: "#B3B3B3"
  },
  progressBox_li_text: {
    fontSize: 26,
    color: "#4D4D4D",
    marginTop: 20
  },

  statusImg: {
    width: 393,
    height: 272,
    marginTop: 148
  },

  statusTitle: {
    fontSize: 50,
    color: "#E9374D",
    marginTop: 100
  },
  statusTitle_grey: {
    color: "#3D3D3D"
  },

  remark: {
    fontSize: 30,
    color: "#808080",
    flex: 1,
    marginTop: 35
  }
});
export default styles;
