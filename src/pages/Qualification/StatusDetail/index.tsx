import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  InteractionManager
} from "react-native";
import styles from "./styles";
import ShopService from "services/ShopService";
import shopStore from "stores/shopStore";
import { whiteThemeNavigationOptions } from "pages/index";
import { Toast, Modal, InputItem, List } from "antd-mobile-rn";
import LinearGradient from "react-native-linear-gradient";
import NavigationUtils from "utils/NavigationUtils";
const urlCheckOn = require("./assets/check_on.png");
const urlCheckSuccess = require("./assets/check_success.png");
const urlCheckFail = require("./assets/check_fail.png");

interface Props {
  navigation: any;
}
export default class StatusDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "审核"),
    headerRight: <View />
  });
  state = {
    checkStatus: 0, // 审核状态，0待审核，1审核通过，2审核不通过, 3未申请
    checkFailureReason: ""
  };
  nameList = [];
  constructor(props) {
    super(props);
  }

  getDetail = async () => {
    try {
      Toast.loading("加载中..");
      const response: any = await ShopService.getShopCheck();
      console.log("getDetail", response);
      this.setState({
        checkStatus: response.checkStatus,
        checkFailureReason: response.checkFailureReason
      });
      Toast.hide();
    } catch (error) {
      console.log(error);
      this.props.navigation.goBack();
      Toast.fail(error.message || error, 2);
    }
  };
  submit = () => {
    if (this.state.checkStatus == 1) {
      NavigationUtils.resetTo("Home");
    } else {
      NavigationUtils.replace("Qualification");
    }
  };
  componentDidMount() {
    shopStore.getData();
    this.getDetail();
  }
  render() {
    const { checkStatus, checkFailureReason } = this.state;
    let statusImg = null;
    switch (checkStatus) {
      case 0:
        statusImg = urlCheckOn;
        break;
      case 1:
        statusImg = urlCheckSuccess;
        break;
      case 2:
        statusImg = urlCheckFail;
        break;
      default:
        break;
    }
    return (
      <View style={styles.container}>
        <View style={styles.progressBox}>
          <View style={styles.progressBox_li}>
            <View style={[styles.progressBox_border]} />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#E9374D", "#E97E37"]}
              style={styles.progressBox_li_point}
            >
              <Text style={styles.progressBox_li_point_text}>1</Text>
            </LinearGradient>
            <Text style={styles.progressBox_li_text}>提交资料</Text>
          </View>
          <View style={styles.progressBox_li}>
            <View
              style={[
                styles.progressBox_border,
                checkStatus == 0 && styles.progressBox_border_grey
              ]}
            />
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#E9374D", "#E97E37"]}
              style={styles.progressBox_li_point}
            >
              <Text style={styles.progressBox_li_point_text}>2</Text>
            </LinearGradient>
            <Text style={styles.progressBox_li_text}>审核中</Text>
          </View>
          <View style={styles.progressBox_li}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={
                checkStatus != 0
                  ? ["#E9374D", "#E97E37"]
                  : ["#E6E6E6", "#E6E6E6"]
              }
              style={styles.progressBox_li_point}
            >
              <Text
                style={[
                  styles.progressBox_li_point_text,
                  checkStatus == 0 && styles.progressBox_li_point_text_grey
                ]}
              >
                3
              </Text>
            </LinearGradient>
            <Text style={styles.progressBox_li_text}>
              审核
              {checkStatus == 2 ? "失败" : "成功"}
            </Text>
          </View>
        </View>
        {statusImg && <Image source={statusImg} style={styles.statusImg} />}
        <Text style={[styles.statusTitle, styles.statusTitle_grey]}>
          {checkStatus == 0 && "审核中"}
          {checkStatus == 1 && "恭喜 商家入驻成功"}
          {checkStatus == 2 && "申请失败！！"}
        </Text>
        <Text style={styles.remark}>
          {checkStatus == 0 && "请耐心等待，约5个工作日"}
          {checkStatus == 2 && checkFailureReason}
        </Text>
        {checkStatus != 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.submit}
            style={styles.submitBtn}
          >
            <Text style={styles.submitBtn_text}>
              {checkStatus == 1 ? "立即开店" : "重新申请"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
