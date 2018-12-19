import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import styles, { listItemStyle, inputItemStyle } from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import { InputItem, Toast, List, Modal } from "antd-mobile-rn";
import WalletService from "services/WalletService";
import FormItem from "components/FormItem";
import BankCardUtils from "utils/BankCardUtils";
import HeaderButtons from "components/HeaderButtons";

interface navigationParams {
  mode?: "add" | "edit";
  id?: number;
  fnSuccess: () => {};
}
interface Props {
  navigation: any;
}
@observer
export default class BankCardDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "新增银行卡"),
    headerRight: navigation.getParam("headerRight", <View />)
  });
  formItemRefs = [];
  nameList: Array<any> = [
    "id",
    "bankAccountName",
    "bankName",
    "bankCard",
    "isDefault"
  ];
  constructor(props) {
    super(props);
    const getParam: Function = this.props.navigation.getParam;
    this.state = {
      mode: getParam("mode", "add"),
      id: getParam("id", 0),
      bankAccountName: "",
      bankName: "",
      bankCard: "",
      isDefault: "0"
    };
    console.log(this.state);
    let title = "银行卡";
    if (this.state.mode == "add") {
      title = "新增" + "银行卡";
    } else if (this.state.mode == "edit") {
      title = "编辑" + "银行卡";
    }
    this.props.navigation.setParams({
      title,
      headerRight:
        this.state.mode == "edit" ? (
          <HeaderButtons>
            <HeaderButtons.ChildButton onPress={this.remove}>
              <Text style={styles.headerRightText}>解绑</Text>
            </HeaderButtons.ChildButton>
          </HeaderButtons>
        ) : (
          <View />
        )
    });
  }
  remove = () => {
    Modal.alert("解绑银行卡", "", [
      {
        text: "取消",
        onPress: () => {}
      },
      {
        text: "确定",
        onPress: () => {
          Toast.loading("loading..");
          WalletService.removeBankCard(this.state.id)
            .then(response => {
              console.log("removeBankCard", response);
              Toast.hide();
              this.props.navigation.getParam("fnSuccess", () => {})();
              this.props.navigation.goBack();
            })
            .catch(error => {
              console.log(error);
              Toast.fail(error.message || error, 2);
            });
        }
      }
    ]);
  };
  changeBackCard = (bankCard: string) => {
    this.setState({
      bankCard: bankCard
    });
  };
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  getDetailById = (id: number) => {
    Toast.loading("加载中..");
    WalletService.getBankCardDetail(id)
      .then(response => {
        console.log("getDetailById", response);
        let state = {};
        Object.keys(response).map((v, i) => {
          if (typeof response[v] == "number") {
            response[v] = response[v].toString();
          }
        });
        // if (response.imgUrl && response.imgUrl.indexOf("http") == -1) {
        //   response.imgUrl = constantStore.ROOT_API_URL + response.imgUrl;
        // }
        this.nameList.map(key => {
          state[key] = response[key];
        });
        this.setState(state);
        Toast.hide();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
        this.props.navigation.goBack();
      });
  };
  submit = async () => {
    let sendData: Object = {};
    let nameList: Array<string> = this.nameList;

    let errorMessage = "";
    Object.keys(this.formItemRefs).map(key => {
      const formItemRef = this.formItemRefs[key];
      if (!errorMessage) {
        // console.log(formItemRef.getMessage());
        let formItemRefValid: boolean = formItemRef.checkValid();
        if (!formItemRefValid) {
          errorMessage = formItemRef.getMessage();
        }
      }
    });
    if (errorMessage) {
      console.log("校验不通过", errorMessage);
      Toast.info(errorMessage, 2);
      return;
    }
    Toast.loading("提交中..");
    let promise = null;
    switch (this.state.mode) {
      case "add":
        promise = WalletService.addBankCard;
        break;
      case "edit":
        promise = WalletService.editBankCard;
        break;
      default:
        break;
    }
    nameList.map(key => {
      sendData[key] = this.state[key];
    });

    Toast.loading("提交中..");
    try {
      const bankBin: any = await BankCardUtils.getBankBin(this.state.bankCard);
      // {"cardType":"DC","bank":"CCB","key":"6227003320232234322","messages":[],"validated":true,"stat":"ok"}
      // {bankName: "中国建设银行", bankCode: "CCB", cardType: "DC", cardTypeName: "储蓄卡"}
      console.log("getBankBin", bankBin);
      if (bankBin.bankCode != "ICBC") {
        Toast.info("只能选择工商银行卡", 2);
        return;
      }
      sendData["bankName"] = bankBin.bankName;
      console.log(sendData);
      await promise(sendData).then(response => {
        console.log("提交成功", response);
        Toast.success("保存成功", 1);
        this.props.navigation.getParam("fnSuccess", () => {})();
        this.props.navigation.goBack();
      });
    } catch (error) {
      console.log(error);
      Toast.info(error.message || error, 2);
    }
  };

  componentDidMount() {
    if (this.state.mode != "add") {
      this.getDetailById(this.state.id);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.titleBox_text}>
            请绑定本人
            <Text style={styles.titleBox_text_red}>工商银行银行卡</Text>
            ，确保您的用卡安全
          </Text>
        </View>
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["bankAccountName"] = ref;
            }}
            value={this.state.bankAccountName}
            required={true}
            message="请填写持卡人姓名"
          >
            <InputItem
              maxLength={20}
              clear
              placeholder="请填写"
              placeholderTextColor="#CCCCCC"
              styles={inputItemStyle}
              value={this.state.bankAccountName}
              onChange={bankAccountName =>
                this.setState({
                  bankAccountName: bankAccountName
                })
              }
            >
              持卡人姓名
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["bankCard"] = ref;
            }}
            value={this.state.bankCard}
            required={true}
            message="请填写银行卡号"
          >
            <InputItem
              maxLength={20}
              clear
              type="number"
              placeholder="请填写"
              placeholderTextColor="#CCCCCC"
              styles={inputItemStyle}
              value={this.state.bankCard}
              onChange={this.changeBackCard}
            >
              银行卡号
            </InputItem>
          </FormItem>
          <List.Item
            styles={listItemStyle}
            extra={
              <Switch
                value={this.state.isDefault == "1"}
                onTintColor="rgba(0,0,0,.1)"
                thumbTintColor={
                  this.state.isDefault == "1" ? "#E4374D" : undefined
                }
                onValueChange={(checked: boolean) => {
                  this.setState({
                    isDefault: checked ? "1" : "0"
                  });
                }}
              />
            }
          >
            设为默认银行卡
          </List.Item>
        </List>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.submit}
          style={styles.bottomBtn}
        >
          <Text style={styles.bottomBtn_text}>保存</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
