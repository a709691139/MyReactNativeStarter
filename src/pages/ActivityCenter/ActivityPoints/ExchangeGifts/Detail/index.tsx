import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import styles, { inputItemStyle, listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import ActivityService from "services/ActivityService";
import { Toast, Modal, InputItem, List, DatePicker } from "antd-mobile-rn";
import moment from "moment";
import FormItem from "components/FormItem";

interface navigationParams {
  mode?: "add" | "edit";
  id?: number;
  fnSuccess?: Function;
}
interface Props {
  navigation: any;
}
@observer
export default class ActivityReleaseDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "新增礼品"),
    headerRight: <View />
  });
  state = {
    uploading: false,
    mode: "add" || "edit",
    giftName: "",
    usePoints: "",
    totalCount: "",
    startTime: undefined,
    finishTime: undefined
  };
  nameList = [];
  formItemRefs = {};
  minDate = new Date();
  maxDate = new Date(new Date().getFullYear() + 2, 12, 30);
  constructor(props) {
    super(props);
    this.nameList = [
      "giftName",
      "usePoints",
      "totalCount",
      "startTime",
      "finishTime"
    ];
    this.state.mode = this.props.navigation.getParam("mode", "add");
    this.props.navigation.setParams({
      title: this.state.mode == "add" ? "新增礼品" : "编辑礼品"
    });
  }

  getDetailById = async (id: string) => {
    try {
      Toast.loading("加载中..");
      const response: any = await ActivityService.getExchangeGiftDetail(id);
      console.log("getGoodProviderDetailById", response);
      let state = {};
      Object.keys(response).map((v, i) => {
        if (typeof response[v] == "number") {
          response[v] = response[v].toString();
        }
        if (v.toLowerCase().indexOf("time") != -1 && response[v]) {
          // 时间 转 moment
          response[v] = moment(response[v]).toDate();
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
    let errorMessage: string = "";
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

    try {
      let sendData: Object = {};
      let succussMsg: string = "";
      this.nameList.map(key => {
        sendData[key] = this.state[key];
      });
      sendData["startTime"] = moment(sendData["startTime"])
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      sendData["finishTime"] = moment(sendData["finishTime"])
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
      console.log(sendData);
      Toast.loading("提交中..");
      if (this.state.mode == "add") {
        succussMsg = "新增成功";
        await ActivityService.addExchangeGift(sendData);
      } else {
        succussMsg = "修改成功";
        sendData["id"] = this.props.navigation.getParam("id");
        await ActivityService.editExchangeGift(sendData);
      }
      this.props.navigation.getParam("fnSuccess", () => {})();
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
          <FormItem
            ref={ref => {
              this.formItemRefs["giftName"] = ref;
            }}
            value={this.state.giftName}
            required={true}
            message="请填写礼品描述"
          >
            <InputItem
              maxLength={30}
              clear
              placeholder="请填写礼品描述"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.giftName}
              onChange={giftName =>
                this.setState({
                  giftName
                })
              }
            >
              物品/服务描述
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["usePoints"] = ref;
            }}
            value={this.state.usePoints}
            required={true}
            message="请填写需要消耗的奖励积分"
          >
            <InputItem
              maxLength={20}
              clear
              type="number"
              placeholder="请填写需要消耗的奖励积分"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.usePoints.toString()}
              onChange={usePoints =>
                this.setState({
                  usePoints: parseInt(usePoints) || ""
                })
              }
            >
              消耗积分
            </InputItem>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["totalCount"] = ref;
            }}
            value={this.state.totalCount}
            required={true}
            message="请填写发放的礼品数量"
          >
            <InputItem
              maxLength={20}
              clear
              placeholder="请填写发放的礼品数量"
              placeholderTextColor="#999999"
              styles={inputItemStyle}
              value={this.state.totalCount.toString()}
              type="number"
              onChange={totalCount =>
                this.setState({
                  totalCount: parseInt(totalCount) || ""
                })
              }
            >
              发放总数
            </InputItem>
          </FormItem>
        </List>
        <View style={styles.marginBox} />
        <List>
          <FormItem
            ref={ref => {
              this.formItemRefs["startTime"] = ref;
            }}
            value={this.state.startTime}
            required={true}
            message="请设置礼品兑换开始时间"
          >
            <DatePicker
              value={this.state.startTime}
              mode="date"
              minDate={this.minDate}
              maxDate={this.maxDate}
              onChange={(startTime: object) => {
                this.setState({
                  startTime
                });
              }}
              format="YYYY-MM-DD"
              extra="请设置礼品兑换开始时间"
            >
              <List.Item styles={listItemStyle} arrow="horizontal" extra={""}>
                开始时间
              </List.Item>
            </DatePicker>
          </FormItem>
          <FormItem
            ref={ref => {
              this.formItemRefs["finishTime"] = ref;
            }}
            value={this.state.finishTime}
            required={true}
            message="请设置礼品兑换结束时间"
          >
            <DatePicker
              value={this.state.finishTime}
              mode="date"
              minDate={this.minDate}
              maxDate={this.maxDate}
              onChange={(finishTime: object) => {
                this.setState({
                  finishTime
                });
              }}
              format="YYYY-MM-DD"
              extra="请设置礼品兑换结束时间"
            >
              <List.Item styles={listItemStyle} arrow="horizontal" extra={""}>
                结束时间
              </List.Item>
            </DatePicker>
          </FormItem>
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
