import React from "react";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  PixelRatio
} from "react-native";
const { height, width } = Dimensions.get("window");

interface Props {
  setModalVisible: Function;
}
export default class Update extends React.Component<Props, any> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  alertText(text) {
    alert(text);
  }

  setModalVisible() {
    const { setModalVisible } = this.props;
    if (setModalVisible) {
      setModalVisible();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerBox}>
          <Text style={styles.title}>检查更新</Text>
          <Text style={styles.subtitle}>当前版本1.0.0</Text>
          <Text style={styles.subtitle}>最新版本1.0.1</Text>
          <View style={styles.progressBox}>
            <View style={styles.progressBar} />
          </View>
          <View style={styles.ul}>
            <Text style={styles.li}>1、修正bug</Text>
            <Text style={styles.li}>2、提高性能</Text>
            <Text style={styles.li}>3、增加功能吧</Text>
          </View>
          <TouchableHighlight
            underlayColor="#fff"
            style={styles.button_cancel}
            onPress={this.setModalVisible.bind(this)}
          >
            <Text style={styles.button_cancel_text}>取消更新</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.7)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  innerBox: {
    justifyContent: "center",
    width: 300,
    backgroundColor: "#fff",
    // borderRadius:8,
    paddingTop: 15,
    paddingBottom: 50,
    paddingLeft: 15,
    paddingRight: 15,
    position: "relative"
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    color: "#edae22"
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#4e4e4e"
  },
  ul: {
    marginTop: 35
  },
  li: {
    fontSize: 16,
    marginBottom: 8,
    color: "#222222"
  },
  button_cancel: {
    position: "absolute",
    right: 15,
    bottom: 15
  },
  button_cancel_text: {
    color: "#005bd7",
    fontSize: 20
  },
  progressBox: {
    height: 3,
    position: "absolute",
    width: 300,
    left: 0,
    marginTop: 17,
    backgroundColor: "#a1a1a1"
  },
  progressBar: {
    flex: 1,
    width: 50,
    backgroundColor: "#ffc341"
  }
});
