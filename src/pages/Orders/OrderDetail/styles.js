import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },
  marginBox: {
    height: 20
  },

  addressBox: {
    backgroundColor: "#fff",
    padding: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  addressBox_img: {
    width: 50,
    height: 50,
    marginRight: 35
  },
  addressBox_textBox: {
    flex: 1
  },
  addressBox_text: {
    color: "#333333",
    fontSize: 26
  },
  addressBox_text2: {
    marginTop: 25
  },
  addressBox_text_red: {
    color: "#E9374D"
  },

  toDeliveryPageBtn: {
    backgroundColor: "#fff",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: "1 * $px",
    borderColor: "#E6E6E6"
  },
  toDeliveryPageBtn_img: {
    width: 32,
    height: 30,
    marginRight: 20
  },
  toDeliveryPageBt_text: {
    color: "#333333",
    fontSize: 28
  },

  shopTitleBox: {
    backgroundColor: "#fff",
    padding: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  shopTitleBox_img: {
    width: 26,
    height: 23,
    marginRight: 23
  },
  shopTitleBox_text: {
    color: "#3D3D3D",
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

  priceBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingBottom: 25
  },
  priceBox_border: {
    borderColor: "#E5E5E5",
    borderBottomWidth: "1 * $px"
  },
  priceBox_row: {
    flexDirection: "row",
    marginTop: 25
  },
  priceBox_row_text: { flex: 1, color: "#999999", fontSize: 26 },
  priceBox_row_text2: {
    flex: 0
  },
  priceBox_row_textBlack: {
    color: "#333333",
    fontSize: 28
  },

  orderBox: { backgroundColor: "#fff", paddingHorizontal: 30 },
  orderBox_title: {
    flexDirection: "row",
    paddingVertical: 30,
    alignItems: "center"
  },
  orderBox_title_border: {
    width: 4,
    height: 26,
    backgroundColor: "#E9374D",
    marginRight: 20
  },
  orderBox_title_text: {
    color: "#333333",
    fontSize: 28
  },
  orderBox_row: {
    flexDirection: "row",
    marginBottom: 25
  },
  orderBox_row_text: {
    flex: 1,
    color: "#4D4D4D",
    fontSize: 26
  },
  orderBox_row_text2: {
    flex: 0,
    marginLeft: 30
  },
  orderBox_row_textRed: {
    color: "#E9374D"
  },

  contactBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#E6E6E6",
    borderTopWidth: "1 * $px",
    borderBottomWidth: "1 * $px"
  },
  contactBox_btn: {
    height: 90,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  contactBox_btnBorder: {
    height: "100%",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    paddingVertical: 15
  },
  submitBtnBox_btn: {
    height: 60,
    width: 172,
    borderWidth: "1 * $px",
    borderColor: "#999999",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 35
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
  }
});
export default styles;
