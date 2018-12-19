import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text } from "react-native";
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import Header from "./Header";
import SalesAmountBox from "./SalesAmountBox";
// import PurchaseGoodBox from "./PurchaseGoodBox";
import GoodManageBox from "./GoodManageBox";
import OrderManageBox from "./OrderManageBox";
import SaleManageBox from "./SaleManageBox";
// import OrderBox from "./OrderBox";
// import TodayJounal from "./TodayJounal";
import userStore from "stores/userStore";
import goodsStore from "stores/goodsStore";
import PullFlatList from "components/PullList/PullFlatList";
import pushNotificationStore from "stores/pushNotificationStore";

// const urlNewOrder = require("../../assets/newOrder.mp3");
// const urlCancelOrder = require("../../assets/cancelOrder.mp3");
// const urlCompletedOrder = require("../../assets/completedOrder.mp3");
// import Sound from "react-native-sound";

import ListPopover from "components/ListPopover";

interface Props {
  navigation: any;
}
@observer
export default class Home extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
    title: "首页"
  });
  timer = null;
  state = {
    loading: false,
    language: "js"
  };
  refs: any = [];
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  onRefresh = () => {
    // 下拉刷新
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
      this.refs["SalesAmountBox"].getData();
      this.refs["SalesAmountBox"].startRefleshTimer();
      // this.refs["OrderBox"].getData();
      // this.refs["OrderBox"].startRefleshTimer();
      // this.refs["TodayJounal"].getData();
      // this.refs["TodayJounal"].startRefleshTimer();
      this.refs["OrderManageBox"].getData();
      this.refs["OrderManageBox"].startRefleshTimer();

      let promise = new Promise(resolve => {
        setTimeout(() => {
          this.setState({ loading: false });
          resolve();
        }, 500);
      });
      return promise;
    }
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      goodsStore.getTypes();
      goodsStore.getProviderList();
      goodsStore.getGoodRows(true).catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
    }, 1000);
    // 登录成功后 查询回调通知
    pushNotificationStore.checkOpenNotification();

    // setTimeout(() => {
    //   Sound.setCategory("Playback", false);
    //   let whoosh = new Sound(
    //     urlNewOrder,
    //     error => {
    //       if (error) {
    //         console.log("failed to load the sound", error);
    //         return;
    //       }
    //       // loaded successfully
    //       console.log(
    //         "duration in seconds: " +
    //           whoosh.getDuration() +
    //           "  number of channels: " +
    //           whoosh.getNumberOfChannels()
    //       );
    //       whoosh.play(() => {
    //         console.log("playend");
    //         whoosh.release();
    //       });
    //     },
    //     () => {}
    //   );
    // }, 1500);

    // whoosh.setVolume(1);
    // whoosh.setNumberOfLoops(1);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  renderItem = ({ item, separators, index }) => {
    return null;
  };
  ListFooterComponent = () => {
    return (
      <View style={styles.contentBox}>
        <SalesAmountBox
          navigation={this.props.navigation}
          ref="SalesAmountBox"
        />
        <View style={styles.titleBox}>
          <View style={styles.titleBox_border} />
          <Text style={styles.titleBox_text}>
            商品管理 <Text style={styles.titleBox_text2}>GOODS</Text>
          </Text>
        </View>
        <GoodManageBox navigation={this.props.navigation} />
        <View style={styles.marginBox} />
        <View style={styles.titleBox}>
          <View style={styles.titleBox_border} />
          <Text style={styles.titleBox_text}>
            订单管理 <Text style={styles.titleBox_text2}>ORDER</Text>
          </Text>
        </View>
        <OrderManageBox
          ref="OrderManageBox"
          navigation={this.props.navigation}
        />
        <View style={styles.marginBox} />
        <View style={styles.titleBox}>
          <View style={styles.titleBox_border} />
          <Text style={styles.titleBox_text}>
            促销活动 <Text style={styles.titleBox_text2}>SALES</Text>
          </Text>
        </View>
        <SaleManageBox navigation={this.props.navigation} />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} />
        <PullFlatList
          style={styles.container}
          data={[{ key: "1" }]}
          refreshing={this.state.loading}
          hadMore={false}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          ListFooterComponent={this.ListFooterComponent()}
        />
      </View>
    );
  }
}

/* 
<View style={styles.titleBox}>
          <View style={styles.titleBox_border} />
          <Text style={styles.titleBox_text}>
            小易帮手 <Text style={styles.titleBox_text2}>NICE</Text>
          </Text>
        </View>
        <View style={styles.marginBox} />
        <View style={styles.row1}>
          <PurchaseGoodBox
            navigation={this.props.navigation}
            ref="PurchaseGoodBox"
          />
          <OrderBox navigation={this.props.navigation} ref="OrderBox" />
        </View>
        <View style={styles.marginBox} />
        <View style={[styles.titleBox, { marginBottom: 0 }]}>
          <View style={styles.titleBox_border} />
          <Text
            style={styles.titleBox_text}
            onPress={() => this.toOtherPage("Journal")}
          >
            今日流水 <Text style={styles.titleBox_text2}>GOOD</Text>
          </Text>
        </View>
        <TodayJounal navigation={this.props.navigation} ref="TodayJounal" /> */
