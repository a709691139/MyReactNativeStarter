import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Toast, Modal, Picker } from "antd-mobile-rn";
import styles from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import IconIonicon from "react-native-vector-icons/Ionicons";
import WalletService from "services/WalletService";
const urlImgGongshang = require("./assets/img_gongshang.png");

interface Props {
  navigation: any;
}
@observer
export default class WithdrawCash extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "提现",
    headerRight: <View />
  });
  state = {
    loading: true,
    bankCardList: [],
    selectedBankCardIndex: 0,
    money: "0",
    withdrawMoney: undefined
  };
  pageFocusSubscription: any;

  constructor(props) {
    super(props);
    this.pageFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        console.log("didFocus", payload);
        this.getData();
      }
    );
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  showActionSheet = () => {
    let list: Array<any> = this.state.bankCardList.map((v, i) => {
      return {
        text: v.bankName + "(" + v.bankCard.substr(v.bankCard.length - 4) + ")",
        onPress: () => {
          this.setState({
            selectedBankCardIndex: i
          });
        }
      };
    });
    Modal.operation(list.concat(list).concat(list));
  };
  addBankCard = () => {
    this.toOtherPage("BankCardDetail", {
      mode: "add",
      fuSuccess: this.getData
    });
  };
  submit = () => {
    console.log(this.state);
    let errorMsg = "";
    if (!this.state.withdrawMoney) {
      errorMsg = "请输入提现金额";
    } else if (this.state.withdrawMoney) {
      if (parseInt(this.state.withdrawMoney) > parseInt(this.state.money)) {
        errorMsg = "您的余额只剩<=" + parseInt(this.state.money);
      } else if (parseInt(this.state.withdrawMoney) < 50) {
        errorMsg = "只能提现50元及以上金额";
      }
    } else if (!this.state.bankCardList.length) {
      errorMsg = "请先新增银行卡";
    }
    if (errorMsg.length) {
      Toast.show(errorMsg);
      return;
    }
    Toast.loading("加载中..");
    WalletService.withdrawCash({
      amount: this.state.withdrawMoney,
      bankcardId: this.state.bankCardList[this.state.selectedBankCardIndex].id
    })
      .then(response => {
        console.log("withdrawCash", response);
        Toast.success("提交成功", 1);
        this.props.navigation.goBack();
        // this.toOtherPage("WalletWithdrawCashDetail");
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  getData = async () => {
    try {
      const bankCardResponse: any = await WalletService.getBankCards({
        page: 1,
        rows: 9999
      });
      console.log("银行卡列表", bankCardResponse);
      const moneyResponse: any = await WalletService.getWallet();
      console.log("钱包余额", moneyResponse);
      this.setState({
        loading: false,
        money: moneyResponse.balance.toString(),
        bankCardList: bankCardResponse.list.map((v, i) => {
          return {
            ...v,
            label:
              v.bankName + "(" + v.bankCard.substr(v.bankCard.length - 4) + ")",
            value: i
          };
        }),
        selectedBankCardIndex: bankCardResponse.list.reduce(
          (pre, next, index) => {
            if (next.isDefault == 1) {
              pre = index;
            }
            return pre;
          },
          0
        )
      });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
      Toast.fail(error.message || error, 2);
    }
  };
  componentWillUnmount() {
    this.pageFocusSubscription && this.pageFocusSubscription.remove();
  }
  render() {
    const CustomChildren = (props: any) => (
      <TouchableOpacity activeOpacity={0.8} onPress={props.onClick}>
        {props.children}
      </TouchableOpacity>
    );
    let { bankCardList, selectedBankCardIndex } = this.state;
    let selectedBankCard = bankCardList[selectedBankCardIndex];
    return (
      <View style={styles.container}>
        {this.state.bankCardList.length ? (
          <Picker
            title="选择地区"
            data={this.state.bankCardList}
            cols={1}
            value={[selectedBankCardIndex]}
            onChange={(array: any) =>
              this.setState({ selectedBankCardIndex: array[0] })
            }
            onOk={(array: any) =>
              this.setState({ selectedBankCardIndex: array[0] })
            }
          >
            <CustomChildren>
              <View style={styles.bankInfo}>
                <Image source={urlImgGongshang} style={styles.img} />
                <View style={styles.leftText}>
                  <Text style={styles.bankName}>
                    {selectedBankCard.bankName}
                  </Text>
                  <Text style={styles.des}>
                    尾号
                    {selectedBankCard
                      ? selectedBankCard.bankCard.substr(
                          selectedBankCard.bankCard.length - 4
                        )
                      : null}{" "}
                    储蓄卡
                  </Text>
                </View>
                <IconIonicon
                  name="ios-arrow-forward"
                  color="#999999"
                  style={styles.iconRight}
                />
              </View>
            </CustomChildren>
          </Picker>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.addBankCard}
            style={styles.bankInfo}
          >
            <View style={styles.leftText}>
              <Text style={styles.bankName}>新增银行卡</Text>
              <Text style={styles.des}>您暂无已绑定的银行卡</Text>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.moneyBox}>
          <Text>提现金额</Text>
          <View style={styles.moneyLine}>
            <Text style={styles.moneyIcon}>¥</Text>
            <TextInput
              style={styles.input}
              value={this.state.withdrawMoney}
              onChange={e => {
                this.setState({ withdrawMoney: e.nativeEvent.text });
              }}
              onBlur={() => {
                this.setState({
                  withdrawMoney: parseFloat(this.state.withdrawMoney)
                    .toFixed(2)
                    .toString()
                });
              }}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              placeholder={`可转出到卡${this.state.money}元`}
              placeholderTextColor="#C0C5CC"
            />
            <Text
              style={styles.allBtn}
              onPress={() => {
                this.setState({
                  withdrawMoney: this.state.money.toString()
                });
              }}
            >
              全部提现
            </Text>
          </View>
        </View>

        <View style={styles.bottomBox}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBox_btn}
            onPress={this.submit}
          >
            <Text style={styles.bottomBox_btn_text}>提交申请</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.tip}>
          <Text>每次提现</Text>
          <Text style={styles.redTip}>50元或以上</Text>
        </Text>
      </View>
    );
  }
}
