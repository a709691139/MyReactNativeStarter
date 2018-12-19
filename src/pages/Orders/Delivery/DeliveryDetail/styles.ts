import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },

  marginBox: { height: 20 },

  orderBox: {
    paddingHorizontal: 30,
    backgroundColor: "#fff",
    paddingTop: 20
  },
  textBox: {
    paddingTop: 10
  },
  textBox_row: {
    flexDirection: "row",
    marginBottom: 30
  },
  textBox_row_label: {
    width: 185,
    fontSize: 28,
    color: "#999999"
  },
  textBox_row_text: {
    flex: 1,
    fontSize: 28,
    color: "#333333"
  },

  statusBox: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    marginBottom: 30
  },
  statusBox_row: {
    flexDirection: "row",
    paddingBottom: 30
  },
  statusBox_rowTitle: {
    marginVertical: 40,
    alignItems: "center",
    paddingBottom: 0
  },
  textBox_row_left: {
    width: 87
  },
  textBox_row_leftText: {
    color: "#333333"
  },
  textBox_row_left_date: {
    fontSize: 28,
    color: "#999999"
  },
  textBox_row_left_time: {
    fontSize: 20,
    color: "#999999",
    marginTop: 5
  },
  textBox_row_center: {
    width: 45,
    height: "100%",
    marginHorizontal: 15
  },
  textBox_row_center_border: {
    width: "1 * $px",
    backgroundColor: "#F1F1F1",
    position: "absolute",
    top: 28,
    height: "100%",
    left: "50%",
    marginLeft: "-1 * $px"
  },
  textBox_row_center_img: {
    width: 45,
    height: 45
  },
  textBox_row_right: {
    flex: 1
  },
  redText: {
    color: "#E9374D"
  },
  textBox_row_right_status: {
    color: "#999999",
    fontSize: 30
  },
  textBox_row_right_text: {
    fontSize: 26,
    color: "#333333",
    marginTop: 15
  },
  textBox_row_right_address: {
    fontSize: 26,
    color: "#E9374D"
  },
  textBox_row_right_address1: {
    color: "#333333"
  },

  statusBox_row_map: {
    flex: 1,
    height: 320
  }
});
export default styles;
