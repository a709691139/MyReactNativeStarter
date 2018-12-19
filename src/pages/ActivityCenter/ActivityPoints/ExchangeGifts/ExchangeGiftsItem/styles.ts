import EStyleSheet from "react-native-extended-stylesheet";

const styles = EStyleSheet.create({
  item: {
    marginTop: 30,
    marginHorizontal: 30,
    backgroundColor: "#fff",
    borderRadius: 4
  },
  item_main: {
    // flexDirection: "row",
    // alignItems: "center",
    padding: 30
  },

  item_main_title: {
    fontSize: 28,
    color: "#333333"
  },
  item_main_subTitle: {
    fontSize: 24,
    color: "#999999",
    marginTop: 10
  },

  item_main_pointBox: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center"
  },
  item_main_pointBox_text: {
    fontSize: 30,
    color: "#E9374D",
    marginBottom: 10
  },
  item_main_pointBox_btn: {
    marginLeft: 20,
    borderColor: "#E9374D",
    borderWidth: "1 * $px",
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  item_main_pointBox_btn_text: {
    fontSize: 18,
    color: "#E9374D"
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
