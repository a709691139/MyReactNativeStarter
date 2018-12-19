import React from "react";
import { View, Text, Image, TouchableOpacity, AppState } from "react-native";
import styles from "./styles";
const urlImgBg = require("./assets/bg.png");
import OrderService from "services/OrderService";

interface Props {
  navigation: any;
}
export default class OrderBox extends React.PureComponent<Props, any> {
  state = {
    count: 0
  };
  timer = null;
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  getData = () => {
    OrderService.getOrderRows({
      page: 0,
      rows: 99999,
      status: 0
    })
      .then((response: Response) => {
        console.log("待处理订单", response);
        this.setState({
          loading: false,
          count: response.total
        });
      })
      .catch(error => {
        console.log(error);
        // Toast.fail(error.message || error, 2);
      });
  };
  startRefleshTimer = () => {
    this.stopRefleshTimer();
    this.timer = setInterval(() => {
      this.getData();
    }, 60000);
  };
  stopRefleshTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  _handleAppStateChange = (nextAppState: string) => {
    if (nextAppState == "active") {
      this.startRefleshTimer();
    } else {
      this.stopRefleshTimer();
    }
  };
  componentDidMount() {
    this.getData();
    this.startRefleshTimer();
    AppState.addEventListener("change", this._handleAppStateChange);
  }
  componentWillUnmount() {
    this.stopRefleshTimer();
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.toOtherPage("Orders")}
      >
        <Image source={urlImgBg} style={styles.bg} />
        <View style={styles.container}>
          <Text style={styles.text}>共有{this.state.count}个待处理订单</Text>
          <View style={styles.countBox}>
            <Text style={styles.countBox_text}>{this.state.count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
