import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import WalletService from "services/WalletService";
import { Toast } from "antd-mobile-rn";

// 需要传参 id
interface Props {
  navigation: any;
}
@observer
export default class BalanceDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "交易明细",
    headerRight: <View />
  });
  state = {
    data: {
      // id: null,
      // walletTradeCode: "WT20180831023057313001",
      // tradeName: "提现D20180831023057296001申请",
      // shopId: null,
      // shopWalletId: null,
      // balance: 98930,
      // tradeType: 2, // 	交易状态，1收款，2付款
      // tradeSubType: 201, // 交易子类型，101：订单收款，102：提现失败退款，201：提现到银行卡
      // description: null,
      // outTradeNo: null,
      // createTime: "2018-08-31 14:30:57",
      // money: 100, // 金额，都为正数
      // tradeSubTypeName: "提现",
      // obj: {
      //   id: 23,
      //   drawDepositCode: "D20180831023057296001",
      //   shopId: 1,
      //   mobile: "13712345678",
      //   bankAccountName: "张三",
      //   bankName: "中国建设银行",
      //   bankCard: "6217001210024455893",
      //   amount: 100,
      //   status: 1,
      //   rejectReason: null,
      //   launchTime: "2018-08-31 14:30:57",
      //   transferredTime: null,
      //   createTime: "2018-08-31 14:30:57",
      //   servicePrice: 1,
      //   sellerGetPrice: 99,
      //   serviceChargePercent: 1,
      //   bankcardId: null,
      //   statusName: "提现申请",
      //   drawDepostSummary: "提现到银行卡100.00元"
      // }
    }
  };

  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  getData = () => {
    WalletService.getWalletTradeDetail(this.props.navigation.getParam("id"))
      .then(response => {
        console.log("获取钱包交易row详情", response);
        this.setState({
          data: response || {}
        });
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  componentDidMount() {
    console.log("id", this.props.navigation.getParam("id"));
    this.getData();
  }
  render() {
    let data: any = this.state.data;
    let withDrawCash = data ? data.obj : null;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}
      >
        <View style={[styles.row, styles.rowMain]}>
          <Text style={styles.row_label}>金额</Text>
          <Text style={[styles.row_content, styles.rowMain_content]}>
            {data.tradeType == 1 ? "+" : "-"}
            {data.money && data.money.toFixed(2)}
          </Text>
        </View>
        <View style={styles.borderBox} />
        <View style={styles.row}>
          <Text style={styles.row_label}>交易号</Text>
          <Text style={styles.row_content}>{data.walletTradeCode}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>交易时间</Text>
          <Text style={styles.row_content}>{data.createTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>交易名称</Text>
          <Text style={styles.row_content}>
            {data.tradeName || data.description}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>类型</Text>
          <Text style={styles.row_content}>{data.tradeSubTypeName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row_label}>账户余额</Text>
          <Text style={styles.row_content}>{data.balance}</Text>
        </View>
        {!data.orderId &&
          withDrawCash && (
            <View>
              <View style={styles.borderBox} />
              <View style={styles.row}>
                <Text style={styles.row_label}>提现编号</Text>
                <Text style={styles.row_content}>
                  {withDrawCash.drawDepositCode}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.row_label}>提现状态</Text>
                <Text style={styles.row_content}>
                  {withDrawCash.statusName}
                </Text>
              </View>
              {!!withDrawCash.rejectReason && (
                <View style={styles.row}>
                  <Text style={styles.row_label}>失败原因</Text>
                  <Text style={styles.row_content}>
                    {withDrawCash.rejectReason}
                  </Text>
                </View>
              )}
              <View style={styles.row}>
                <Text style={styles.row_label}>发起时间</Text>
                <Text style={styles.row_content}>
                  {withDrawCash.createTime}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.row_label}>到账时间</Text>
                <Text style={styles.row_content}>
                  {withDrawCash.transferredTime
                    ? withDrawCash.transferredTime
                    : "未到账"}
                </Text>
              </View>
            </View>
          )}
      </ScrollView>
    );
  }
}
