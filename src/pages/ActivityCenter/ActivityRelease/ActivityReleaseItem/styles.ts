import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  item: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#fff",
    borderRadius: 4
  },
  item_main: {
    flexDirection: "row",
    alignItems: "center",
    padding: 30
  },

  item_main_left: {
    flex: 1
  },
  item_main_left_title: {
    fontSize: 34,
    color: "#333333"
  },
  item_main_left_subTitle: {
    fontSize: 24,
    color: "#333333",
    marginVertical: 25
  },
  item_main_left_text: {
    fontSize: 24,
    color: "#666666",
    marginBottom: 10
  },

  item_main_right: {
    borderColor: "#B3B3B3",
    borderWidth: "1 * $px",
    width: 250,
    height: 250
  },
  item_main_right_img: {
    width: "100%",
    height: "100%"
  },

  item_bottomBtns: {
    borderTopWidth: "1 * $px",
    borderColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 88,
    alignItems: "center",
    paddingHorizontal: 30
  },
  item_bottomBtns_btn: {
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1 * $px",
    borderColor: "#B3B3B3",
    borderRadius: 4,
    marginLeft: 30
  },
  item_bottomBtns_btn1: {
    borderColor: "#E9374D"
  },
  item_bottomBtns_btn2: {
    borderColor: "#E9374D",
    backgroundColor: "#E9374D"
  },
  item_bottomBtns_btn_text: {
    fontSize: 24,
    color: "#B3B3B3"
  },
  item_bottomBtns_btn_text1: {
    color: "#E9374D"
  },
  item_bottomBtns_btn_text2: {
    color: "#fff"
  }
});
export default styles;
