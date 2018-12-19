import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { STATUS_BAR_HEIGHT, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  searchBar: {
    // paddingTop: STATUS_BAR_HEIGHT,
    height: 90,

    paddingHorizontal: 30,
    // height: 112,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: "1 * $px",
    borderColor: "#E5E5E5"
  },
  searchBar_inputBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 25,
    marginRight: 20
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

  emptyView: {
    alignItems: "center",
    width: "100%"
  },
  emptyImage: {
    width: 325,
    marginTop: 135
  },
  emptyText: {
    fontSize: 30,
    marginTop: 60,
    color: "#999999"
  },

  noMoreBox: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30
  },
  noMoreBox_border: {
    width: 185,
    borderBottomWidth: "1 * $px",
    borderColor: "#999999",
    position: "absolute"
  },
  noMoreBox_border_left: {
    left: 0
  },
  noMoreBox_border_right: {
    right: 0
  },
  noMoreBox_text: {
    fontSize: 26,
    color: "#999999"
  }
});
export default styles;
