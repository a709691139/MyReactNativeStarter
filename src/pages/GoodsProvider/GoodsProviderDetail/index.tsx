import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import styles, { inputItemStyle } from "./styles";
import GoodsService from "services/GoodsService";
import goodsStore from "stores/goodsStore";
import { whiteThemeNavigationOptions } from "pages/index";
import { Toast, Modal, InputItem, List } from "antd-mobile-rn";
import commonRegexp from "utils/commonRegexp";

// 需要传参 id, mode: "edit"|"add"
interface navigationParams {
  mode?: "add" | "edit";
  id?: number;
}
interface Props {
  navigation: any;
}
export default class GoodsProviderDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "供应商编辑"),
    headerRight: <View />
  });
  state = {
    uploading: false,
    mode: "add" || "edit",
    name: "",
    contacts: "",
    phone: "",
    remark: ""
  };
  nameList = [];
  constructor(props) {
    super(props);
    this.nameList = ["name", "contacts", "phone", "remark"];
    this.state.mode = this.props.navigation.getParam("mode", "add");
    this.props.navigation.setParams({
      title: this.state.mode == "add" ? "供应商新增" : "供应商编辑"
    });
  }

  getDetailById = async (id: number) => {
    try {
      Toast.loading("加载中..");
      const response: any = await goodsStore.getProviderDetailById(id);
      console.log("getGoodProviderDetailById", response);
      let state = {};
      Object.keys(response).map((v, i) => {
        if (typeof response[v] == "number") {
          response[v] = response[v].toString();
        }
      });
      this.nameList.map(key => {
        state[key] = response[key];
      });
      this.setState(state);
      Toast.hide();
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
      this.props.navigation.goBack();
    }
  };
  submit = async () => {
    let errorWord: string = "";
    if (!this.state.name) {
      errorWord = "请输入公司名称或店铺名称";
    } else if (
      this.state.phone &&
      !commonRegexp.allPhone.test(this.state.phone)
    ) {
      errorWord = "请输入正确的联系人电话";
    }
    if (errorWord) {
      Toast.info(errorWord, 1);
      return false;
    }
    try {
      let sendData: Object = {};
      let succussMsg: string = "";
      this.nameList.map(key => {
        sendData[key] = this.state[key];
      });
      Toast.loading("提交中..");
      if (this.state.mode == "add") {
        succussMsg = "新增成功";
        await goodsStore.asynAddProvider(sendData);
      } else {
        succussMsg = "修改成功";
        sendData["id"] = this.props.navigation.getParam("id");
        await goodsStore.asyncUpdateProvider(sendData);
      }
      this.props.navigation.goBack();
      Toast.show(succussMsg);
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };
  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    if (this.state.mode == "edit") {
      this.getDetailById(this.props.navigation.getParam("id"));
    }
    // });
  }
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <List>
          <InputItem
            maxLength={20}
            clear
            placeholder="请输入公司名称或店铺名称（必填）"
            placeholderTextColor="#CCCCCC"
            styles={inputItemStyle}
            value={this.state.name}
            onChange={name =>
              this.setState({
                name
              })
            }
          >
            供应商名称
          </InputItem>
          <InputItem
            maxLength={20}
            clear
            placeholder="请输入联系人姓名"
            placeholderTextColor="#CCCCCC"
            styles={inputItemStyle}
            value={this.state.contacts}
            onChange={contacts =>
              this.setState({
                contacts
              })
            }
          >
            联系人
          </InputItem>
          <InputItem
            maxLength={20}
            clear
            placeholder="请输入联系人电话"
            placeholderTextColor="#CCCCCC"
            styles={inputItemStyle}
            value={this.state.phone}
            type="number"
            onChange={phone =>
              this.setState({
                phone
              })
            }
          >
            联系电话
          </InputItem>
          <InputItem
            maxLength={20}
            clear
            placeholder="请输入备注"
            placeholderTextColor="#CCCCCC"
            styles={inputItemStyle}
            value={this.state.remark}
            onChange={remark =>
              this.setState({
                remark
              })
            }
          >
            备注
          </InputItem>
        </List>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.submitBtn}
          onPress={() => this.submit()}
        >
          <Text style={styles.submitBtn_text}>保存</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
