import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import styles, { listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { observable, action, toJS } from "mobx";
import { whiteThemeNavigationOptions } from "pages/index";
import { Toast, Modal, InputItem, List } from "antd-mobile-rn";
import ActivityService from "services/ActivityService";
import NumberInput from "components/NumberInput";
import CheckBox from "components/CheckBox";

interface Props {
  navigation: any;
}
@observer
export default class ActivityPointRule extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "积分规则",
    headerRight: <View />
  });
  state = {
    uploading: false,
    id: null,
    payPointsStatus: "1", // 消费积分是否开启，0不开启，1开启
    rewardPointsStatus: "1", // 奖励积分是否开启，0不开启，1开启
    rewardMemberPoints: "1", // 	成为会员的奖励积分数
    rewardSharePoints: "1", // 分享一次的分数
    rewardShareMaxPoints: "1", // 每天分享的最大分数值
    moneyToPointsType: "1", // 	消费转换率,0：1元=1积分，1：10元=1积分，2：100元=1积分
    pointsToMoneyType: "1", // 	减免转换率,0：100积分=1元，1：1000积分=1元
    rewardSignInPoints: "100" // 	签到奖励分数
  };
  moneyToPointsTypes = [
    {
      label: "1元=1积分",
      value: "0"
    },
    {
      label: "10元=1积分",
      value: "1"
    },
    {
      label: "100元=1积分",
      value: "2"
    }
  ];
  pointsToMoneyTypes = [
    {
      label: "100积分=1元",
      value: "0"
    },
    {
      label: "1000积分=1元",
      value: "1"
    }
  ];
  nameList = [
    "id",
    "payPointsStatus",
    "rewardPointsStatus",
    "rewardMemberPoints",
    "rewardSharePoints",
    "rewardShareMaxPoints",
    "moneyToPointsType",
    "pointsToMoneyType",
    "rewardSignInPoints"
  ];

  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  getDetail = async () => {
    try {
      Toast.loading("加载中..");
      const response: any = await ActivityService.getActivityPointRule();
      console.log("getDetail", response);
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
    let errorMessage: string = "";
    if (errorMessage) {
      console.log("校验不通过", errorMessage);
      Toast.info(errorMessage, 2);
      return;
    }

    try {
      let sendData: Object = {};
      this.nameList.map(key => {
        sendData[key] = this.state[key];
      });
      console.log(sendData);
      Toast.loading("提交中..");
      await ActivityService.editActivityPointRule(sendData);
      this.props.navigation.goBack();
      Toast.show("修改成功");
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };
  componentDidMount() {
    this.getDetail();
  }
  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>奖励积分</Text>
            <View style={styles.extraBox}>
              <Switch
                value={this.state.rewardPointsStatus == "1"}
                onTintColor="rgba(0,0,0,.1)"
                thumbTintColor={
                  this.state.rewardPointsStatus == "1" ? "#E4374D" : undefined
                }
                onValueChange={(checked: boolean) => {
                  this.setState({
                    rewardPointsStatus: checked ? "1" : "0"
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>成为会员可获积分</Text>
            <View style={styles.extraBox}>
              <NumberInput
                value={this.state.rewardMemberPoints}
                onChange={rewardMemberPoints => {
                  this.setState({
                    rewardMemberPoints
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>签到可获积分</Text>
            <View style={styles.extraBox}>
              <NumberInput
                value={this.state.rewardSignInPoints}
                onChange={rewardSignInPoints => {
                  this.setState({
                    rewardSignInPoints
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>分享店铺/商品可获积分</Text>
            <View style={styles.extraBox}>
              <NumberInput
                value={this.state.rewardSharePoints}
                onChange={rewardSharePoints => {
                  this.setState({
                    rewardSharePoints
                  });
                }}
              />
            </View>
          </View>
        </View>

        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>
              分享店铺/商品每日累计可获积分上限
            </Text>
            <View style={styles.extraBox}>
              <NumberInput
                value={this.state.rewardShareMaxPoints}
                onChange={rewardShareMaxPoints => {
                  this.setState({
                    rewardShareMaxPoints
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.marginBox} />
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>消费积分</Text>
            <View style={styles.extraBox}>
              <Switch
                value={this.state.payPointsStatus == "1"}
                onTintColor="rgba(0,0,0,.1)"
                thumbTintColor={
                  this.state.payPointsStatus == "1" ? "#E4374D" : undefined
                }
                onValueChange={(checked: boolean) => {
                  this.setState({
                    payPointsStatus: checked ? "1" : "0"
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={listItemStyle.Item}>
          <View style={listItemStyle.Line}>
            <Text style={listItemStyle.Content}>消费转换率</Text>
            <View style={[styles.extraBox]}>
              <CheckBox
                style={styles.checkBox}
                btnStyle={styles.checkBox_li}
                btnTextStyle={styles.checkBox_text}
                list={this.moneyToPointsTypes}
                value={this.state.moneyToPointsType}
                onChange={value => {
                  this.setState({
                    moneyToPointsType: value
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={listItemStyle.Item}>
          <View style={[listItemStyle.Line]}>
            <Text style={listItemStyle.Content}>减免转换率</Text>
            <View style={[styles.extraBox]}>
              <CheckBox
                style={styles.checkBox}
                btnStyle={styles.checkBox_li}
                btnTextStyle={styles.checkBox_text}
                list={this.pointsToMoneyTypes}
                value={this.state.pointsToMoneyType}
                onChange={value => {
                  this.setState({
                    pointsToMoneyType: value
                  });
                }}
              />
            </View>
          </View>
        </View>
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
