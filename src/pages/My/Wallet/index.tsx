import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import Header from "components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import WithoutDataView from "components/WithoutDataView";
import WalletService from "services/WalletService";
import { Toast } from "antd-mobile-rn";
import WalletItem from "./WalletItem";

interface Props {
  navigation: any;
}
@observer
export default class Wallet extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null
  });
  state = {
    list: [
      // {
      //   id: 62,
      //   walletTradeCode: "WT20180831023057313001",
      //   tradeName: "提现到银行卡100元",
      //   shopId: 1,
      //   shopWalletId: 2,
      //   balance: 98930.0,
      //   tradeType: 2,
      //   tradeSubType: 201,
      //   description: "提现D20180831023057296001申请",
      //   outTradeNo: "D20180831023057296001",
      //   createTime: "2018-08-31 14:30:57",
      //   money: 100.0,
      //   tradeSubTypeName: "提现"
      // }
    ],
    loading: true,
    moneny: 0,
    withdrawingMoney: 0,
    isPageFocus: true
  };
  timer: any = null;
  pageFocusSubscription: any;
  pageBlurSubscription: any;
  constructor(props) {
    super(props);
    this.pageFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        console.log("didFocus", payload);
        this.getData();
        this.startRefleshTimer();
        this.setState({
          isPageFocus: true
        });
      }
    );
    this.pageBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      payload => {
        this.setState({
          isPageFocus: false
        });
      }
    );
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  getData = async () => {
    this.setState({
      loading: true
    });
    try {
      const moneyResponse: any = await WalletService.getWallet();
      console.log("钱包余额", moneyResponse);
      const listResponse: any = await WalletService.getWalletTradeRows({
        page: 1,
        rows: 7
      });
      console.log("钱包记录", listResponse);
      const withdrawingMoney: any = await WalletService.withdrawingMoney();
      console.log("提现中的总金额", withdrawingMoney);
      this.setState({
        loading: false,
        moneny: moneyResponse.balance,
        list: listResponse.list,
        withdrawingMoney
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
      Toast.fail(error.message || error, 2);
    }
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
  componentDidMount() {
    this.startRefleshTimer();
  }
  componentWillUnmount() {
    this.stopRefleshTimer();
    this.pageFocusSubscription && this.pageFocusSubscription.remove();
    this.pageBlurSubscription && this.pageBlurSubscription.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isPageFocus && (
          <StatusBar
            barStyle="default"
            translucent={true}
            backgroundColor="transparent"
          />
        )}
        <Image source={require("./assets/bg.png")} style={styles.bg} />
        <Header
          {...whiteThemeNavigationOptions}
          headerStyle={{
            ...whiteThemeNavigationOptions.headerStyle,
            borderBottomWidth: 0,
            backgroundColor: "transparent"
          }}
          headerTitleStyle={{
            ...whiteThemeNavigationOptions.headerTitleStyle,
            color: "#fff"
          }}
          headerTintColor="#fff"
          title="钱包"
          navigation={this.props.navigation}
        />
        <View style={styles.momeyBox}>
          <Text style={styles.momeyBox_text1}>{this.state.moneny}</Text>
          <Text style={styles.momeyBox_text2}>总余额(元)</Text>
          {!!this.state.withdrawingMoney && (
            <Text style={styles.momeyBox_text2}>
              {this.state.withdrawingMoney}
              元已在提现申请中
            </Text>
          )}
        </View>
        <View style={styles.mainBox}>
          <View style={styles.mainBox_title}>
            <Text style={styles.mainBox_title_text}>余额明细</Text>
          </View>
          <ScrollView style={styles.mainBox_list}>
            {this.state.list.map((v, i) => {
              return (
                <WalletItem
                  key={i}
                  item={v}
                  navigation={this.props.navigation}
                />
              );
            })}
            {this.state.list.length == 0 &&
              !this.state.loading && <WithoutDataView text="暂无数据" />}
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mainBox_bottomBox}
            onPress={() => {
              this.toOtherPage("WalletBalanceList");
            }}
          >
            <Text
              style={[
                styles.mainBox_bottomBox_text,
                styles.mainBox_bottomBox_text1
              ]}
            >
              查看更多
            </Text>
            <Ionicons
              name="ios-arrow-forward"
              style={styles.mainBox_bottomBox_text}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBox_btn}
            onPress={() => {
              this.toOtherPage("WalletWithdrawCash");
            }}
          >
            <Text style={styles.bottomBox_btn_text}>提现</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
