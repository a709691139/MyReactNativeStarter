import EStyleSheet from "react-native-extended-stylesheet";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "#F0F0F0",
    flex: 1
  },

  item: {
    backgroundColor: "#fff",
    padding: 30,
    paddingBottom: 0
  },
  itemBorder: {
    borderBottomWidth: "1 * $px",
    borderColor: "rgba(224,224,224,1)",
    marginTop: 30
  },
  itemRow: {
    flexDirection: "row"
  },
  itemRow1: { marginTop: 30 },
  itemRow_label: {
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: 'center',
    marginRight: 30,
    height: 35,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginTop: 3
  },
  itemRow_label1: {
    backgroundColor: "#47D276"
  },
  itemRow_label_text: {
    color: "#fff",
    fontSize: 24
  },
  itemRow_right_text: {
    flex: 1,
    color: "rgba(102,102,102,1)",
    fontSize: 30
  },
  itemRow_time: {
    color: "#999999",
    fontSize: 24,
    marginTop: 30,
    width: "100%",
    textAlign: "right"
  }
});

export default styles;
