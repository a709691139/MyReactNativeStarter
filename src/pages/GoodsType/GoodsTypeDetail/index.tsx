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

// 需要传参 id, mode: "edit"|"add"
interface navigationParams {
  mode?: "add" | "edit";
  id?: number;
}
interface Props {
  navigation: any;
}
export default class GoodsTypeDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "商品分类编辑"),
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
    this.nameList = ["name"];
    this.state.mode = this.props.navigation.getParam("mode", "add");
    this.props.navigation.setParams({
      title: this.state.mode == "add" ? "商品分类新增" : "商品分类编辑"
    });
  }

  getDetailById = async (id: number) => {
    try {
      // Toast.loading("加载中..");
      const response: any = await goodsStore.getTypeDetailById(id);
      console.log("getTypeDetailById", response);
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
      // Toast.hide();
    } catch (error) {
      console.log(error);
      this.props.navigation.goBack();
      Toast.fail(error.message || error, 2);
    }
  };
  submit = async () => {
    let errorWord: string = "";
    if (!this.state.name) {
      errorWord = "请输入商品类型名称";
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
        await goodsStore.asynAddType(sendData);
      } else {
        succussMsg = "修改成功";
        sendData["id"] = this.props.navigation.getParam("id");
        await goodsStore.asyncUpdateType(sendData);
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
            placeholder="请输入商品类型名称"
            placeholderTextColor="#999999"
            styles={inputItemStyle}
            value={this.state.name}
            onChange={name =>
              this.setState({
                name
              })
            }
          >
            商品类型
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
