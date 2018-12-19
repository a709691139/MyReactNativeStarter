import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";

const styles = EStyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 35,
    paddingRight: 25,
    borderColor: "#F5F5F8",
    borderBottomWidth: "1*$px",
    paddingVertical: 30
  },
  journalItem_icon: {
    width: 56,
    height: 56,
    marginRight: 28
  },
  journalItem_center: {
    flex: 1
  },
  journalItem_center_text1: {
    fontSize: 32,
    color: "#333333"
  },
  journalItem_center_text2: {
    fontSize: 24,
    color: "#999999"
  },
  journalItem_center_text3: {
    fontSize: 24,
    color: "#999999"
  },
  journalItem_right: {
    width: 210,
    marginLeft: 15,
    justifyContent: "space-between"
  },
  journalItem_right_text1: {
    fontSize: 32,
    color: "#333333",
    textAlign: "right"
  },
  journalItem_right_text2: {
    fontSize: 24,
    color: "#999999",
    textAlign: "right"
  },

  sectionHeader: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  sectionHeader_text: {
    fontSize: 32,
    color: "#333333",
    marginRight: 10
  },
  sectionHeader_img: {
    width: 30,
    height: 30
  }
});
export default styles;
