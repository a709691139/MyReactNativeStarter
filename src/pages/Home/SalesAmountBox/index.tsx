import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import shopStore from "stores/shopStore";
import constantStore from "stores/constantStore";
import styles from "./styles";
import { Toast } from "antd-mobile-rn";
import { formatMoney } from "utils/CommonUtils";
import LocalService from "services/LocalService";
import ShopService from "services/ShopService";
// const urlImgBg = require("./assets/bg.png");
const urlImgBg = require("./assets/bg_zhuyaobeijing.png");
const urlImgEye = require("./assets/iconEye.png");
const urlImgEyeClose = require("./assets/iconEyeClose.png");
const urlImgRight = require("./assets/icon_right.png");

interface Props {
  navigation: any;
}
export default class SalesAmountBox extends React.Component<Props, any> {
  state = {
    daySaleAmount: "0",
    monthSaleAmount: "0",
    monthProfit: "0",
    visible: true,
    loading: true
  };
  timer = null;
  constructor(props) {
    super(props);
  }
  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    });
    this.saveIsHideSalesAmount(this.state.visible);
  };
  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  format = (str: string, visible: boolean) => {
    str = formatMoney(str);
    if (!visible) {
      str = str.replace(/\w|./g, "*");
    }
    return str;
  };
  getData = () => {
    this.setState({ loading: true });
    ShopService.getSalesAmount()
      .then(response => {
        console.log("当日销售额", response);
        this.setState({
          daySaleAmount: response.daySaleAmount,
          monthSaleAmount: response.monthSaleAmount,
          monthProfit: response.monthProfit,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        // Toast.fail(error.message || error, 2);
      });
  };
  getIsHideSalesAmount = () => {
    LocalService.getIsHideSalesAmount()
      .then(response => {
        this.setState({
          visible: !response.flag
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  saveIsHideSalesAmount = (flag: boolean) => {
    LocalService.saveIsHideSalesAmount(flag)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };
  startRefleshTimer = () => {
    this.stopRefleshTimer();
    this.timer = setInterval(() => {
      if (this.props.navigation.isFocused()) {
        if (shopStore.checkStatus == "1") {
          this.getData();
        }
      }
    }, 60000);
  };
  stopRefleshTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  componentDidMount() {
    this.getData();
    this.startRefleshTimer();
    // this.getIsHideSalesAmount();
  }
  render() {
    // shopStore.checkStatus = "0";
    return (
      <View style={styles.container}>
        <Image source={urlImgBg} style={styles.bg} />
        {shopStore.checkStatus == "1" && (
          <View style={styles.contentBox}>
            <View style={styles.text1View}>
              <Text style={styles.text1}>本日销售额(元)</Text>
            </View>
            <Text style={styles.text2}>
              {this.format(this.state.daySaleAmount, this.state.visible)}
            </Text>
            <View style={styles.bottomView}>
              <Text style={styles.text3}>
                当月销售额
                {this.format(this.state.monthSaleAmount, this.state.visible)}
              </Text>
              <Text style={styles.text3}>
                当月利润
                {this.format(this.state.monthProfit, this.state.visible)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btnToWater}
              activeOpacity={0.8}
              onPress={() => this.toOtherPage("Journal")}
            >
              <Text style={styles.btnToWater_text}>查看流水</Text>
              <Image source={urlImgRight} style={styles.btnToWater_img} />
            </TouchableOpacity>
          </View>
        )}
        {shopStore.checkStatus == "0" && (
          <Text
            style={styles.noSuccess}
            onPress={() => this.toOtherPage("QualificationStatusDetail")}
          >
            待审核
          </Text>
        )}
        {shopStore.checkStatus == "2" && (
          <Text
            style={styles.noSuccess}
            onPress={() => this.toOtherPage("QualificationStatusDetail")}
          >
            审核不通过
          </Text>
        )}
        {shopStore.checkStatus == "3" && (
          <Text
            style={styles.noSuccess}
            onPress={() => this.toOtherPage("Qualification")}
          >
            申请入驻
          </Text>
        )}
      </View>
    );
  }
}
/* 
<TouchableOpacity activeOpacity={0.8} onPress={this.toggleVisible}>
              <Image
                source={this.state.visible ? urlImgEye : urlImgEyeClose}
                style={styles.text1View_img}
              />
            </TouchableOpacity> */
