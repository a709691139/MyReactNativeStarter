import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import OrderService from "services/OrderService";
import { Toast } from "antd-mobile-rn";

interface Props {
  navigation: any;
}
export default class OrderManageBox extends React.PureComponent<Props, any> {
  state = {
    list: [
      {
        name: "待处理",
        img: require("./assets/icon_daichuli.png"),
        route: "Orders",
        param: {
          status: 0
        },
        count: 0
      },
      {
        name: "待取货",
        img: require("./assets/icon_daiquhuo.png"),
        route: "Orders",
        param: {
          status: 1
        },
        count: 0
      },
      {
        name: "送货中",
        img: require("./assets/icon_car.png"),
        route: "Orders",
        param: {
          status: 2
        },
        count: 0
      }
    ],
    loading: true
  };
  timer = null;
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  getData = () => {
    this.setState({ loading: true });
    OrderService.getOrderStatusCounts()
      .then(response => {
        console.log("获取各status的订单数量", response);
        let list = this.state.list.map(v => {
          v.count = response[v.param.status] || 0;
          if (parseInt(v.count) > 99) {
            v.count = 99;
          }
          return v;
        });
        this.setState({
          loading: false,
          list: list
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        Toast.fail(error.message || error, 2);
      });
  };

  startRefleshTimer = () => {
    this.stopRefleshTimer();
    this.timer = setInterval(() => {
      if (this.props.navigation.isFocused()) {
        this.getData();
      }
    }, 60000);
  };
  stopRefleshTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  componentDidMount() {
    this.getData();
    this.startRefleshTimer();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.list.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => this.toOtherPage(v.route, v.param)}
            >
              <Image source={v.img} style={styles.img} />
              <Text style={styles.text}>{v.name}</Text>
              {!!v.count && (
                <View style={styles.badgeBox}>
                  <Text style={styles.badgeBox_text}>{v.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
