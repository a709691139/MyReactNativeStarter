import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
    marginHorizontal: 30,
    borderRadius: 10
  },
  topBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    height: 114
  },
  topBox_main: {
    flex: 1
  },
  topBox_main_idBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  topBox_main_idBox_img: {
    width: 28,
    height: 28,
    marginRight: 5
  },
  topBox_main_idBox_text: {
    fontSize: 26,
    color: "#333333"
  },
  topBox_main_time: {
    fontSize: 24,
    color: "#999999"
  },
  topBox_statusBox: {
    justifyContent: "center",
    alignItems: "flex-end"
  },
  topBox_doneImg: {
    width: 119,
    height: 114,
    position: "absolute",
    right: 0,
    top: 0
  },
  topBox_statusBox_text: {
    fontSize: 26,
    color: "#999999"
  },
  topBox_statusTextRed: {
    color: MAIN_COLOR
  },
  topBox_statusBox_text2: {
    color: "#666666",
    fontSize: 26
  },

  goodsBox: {},
  goodsBoxRow: {
    flexDirection: "row",
    height: 150,
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: "rgb(250,250,250)"
  },
  goodsBoxRow_left_imgView: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center"
  },
  goodsBoxRow_left_img: {
    width: 120,
    height: 120
  },
  goodsBoxRow_center: {
    flex: 1,
    marginHorizontal: 30
  },
  goodsBoxRow_center_text: {
    fontSize: 26,
    color: "#333333"
  },
  goodsBoxRow_right: {
    alignItems: "flex-end"
  },
  goodsBoxRow_right_text1: {
    fontSize: 30,
    color: "#333333"
  },
  goodsBoxRow_right_text2: {
    fontSize: 24,
    color: "#999999"
  },

  totalBox: {
    marginHorizontal: 30,
    justifyContent: "center"
    // height: 80
  },
  totalBox_text: {
    fontSize: 24,
    color: "#333333",
    textAlign: "right",
    marginTop: 10
  },
  totalBox_price: {
    marginVertical: 26,
    textAlign: "right"
  },
  totalBox_price_text: {
    color: "#999999",
    fontSize: 22,
    marginRight: 20
  },
  totalBox_textRed: {
    fontSize: 36,
    color: "#E9374D"
  },

  customerBox: {
    margin: 30
  },
  customerBox_row: {
    flexDirection: "row",
    marginBottom: 40
  },
  customerBox_row_right: {
    flex: 1,
    flexDirection: "row"
  },
  customerBox_row_text1: {
    fontSize: 26,
    color: "#999999",
    width: 130
  },
  customerBox_row_text2: {
    fontSize: 26,
    color: "#333333",
    flex: 1
  },
  customerBox_row_text1Red: {
    color: MAIN_COLOR
  },

  contactTitleBox: {
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20
  },
  contactTitleBox_btn: {
    flexDirection: "row",
    alignItems: "center"
  },
  contactTitleBox_btn_text: {
    fontSize: 26,
    color: "#999999",
    marginRight: 15
  },

  contactBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  contactBox_btn: {
    height: 65,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  contactBox_btnBorder: {
    height: 50,
    borderRightWidth: "1 * $px",
    borderColor: "#E5E5E5"
  },
  contactBox_btn_img: {
    width: 44,
    height: 44,
    marginRight: 15
  },
  contactBox_btn_text: {
    fontSize: 26,
    color: "#333333"
  },

  submitBtnBox: {
    marginHorizontal: 30,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  submitBtnBox_btn: {
    height: 60,
    width: 172,
    borderWidth: "1 * $px",
    borderColor: "#999999",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 30
  },
  submitBtnBox_btnRed: {
    backgroundColor: MAIN_COLOR,
    borderColor: MAIN_COLOR
  },
  submitBtnBox_btn_text: {
    fontSize: 26,
    color: "#999999"
  },
  submitBtnBox_btn_textRed: {
    color: "#fff"
  },

  MarginBorderBox: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    height: 20
  },
  MarginBorderBox_border: {
    width: 629,
    borderBottomWidth: "1 * $px",
    // borderStyle: "dashed",
    borderColor: "#F0F0F0"
  },
  MarginBorderBox_point: {
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    width: 20,
    height: 20,
    position: "absolute",
    top: 0
  },
  MarginBorderBox_point_left: {
    left: -10
  },
  MarginBorderBox_point_right: {
    right: -10
  },

  cancelReasonBox: {
    marginHorizontal: 30,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 25
  },
  cancelReasonBox_text1: {
    fontSize: 26,
    color: "#999999",
    width: 130
  },
  cancelReasonBox_text2: {
    fontSize: 26,
    color: MAIN_COLOR,
    flex: 1
  }
});
export default styles;
