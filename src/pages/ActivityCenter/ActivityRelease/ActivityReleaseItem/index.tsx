import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { translateImageUrl } from "utils/CommonUtils";
import moment from "moment";
import ActivityService from "services/ActivityService";
import { Toast, Modal } from "antd-mobile-rn";

interface Props {
  navigation: any;
  item: any;
  fnSuccess: Function;
}
export default class ActivityReleaseItem extends React.PureComponent<
  Props,
  any
> {
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  edit = () => {
    this.toOtherPage("ActivityReleaseDetail", {
      mode: "edit",
      id: this.props.item.id,
      fnSuccess: this.props.fnSuccess
    });
  };
  remove = () => {
    Modal.alert("删除活动", "确定要删除活动？", [
      { text: "取消", onPress: () => {}, style: "default" },
      {
        text: "确定",
        onPress: () => {
          Toast.loading("loading..");
          ActivityService.removeActivityRelease(this.props.item.id)
            .then(response => {
              console.log("删除活动", response);
              Toast.success("删除活动成功");
              this.props.fnSuccess();
            })
            .catch(error => {
              console.log(error);
              Toast.fail(error.message || error, 2);
            });
        }
      }
    ]);
  };
  toggleStatus = () => {
    Toast.loading("loading..");
    let text: string = this.props.item.status == "1" ? "关闭" : "开启";
    ActivityService.toggleActivityReleas(
      this.props.item.id,
      this.props.item.status == "1" ? "0" : "1"
    )
      .then(response => {
        console.log(text + "活动", response);
        Toast.success(text + "活动成功");
        this.props.fnSuccess();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  render() {
    const item = this.props.item;
    return (
      <View style={styles.item}>
        <View style={styles.item_main}>
          <View style={styles.item_main_left}>
            <Text style={styles.item_main_left_title}>{item.activityName}</Text>
            <Text style={styles.item_main_left_subTitle}>
              {item.activitySubName}
            </Text>
            {!!item.firstCouponName && (
              <Text style={styles.item_main_left_text}>
                优惠券1：
                {item.firstCouponName}
              </Text>
            )}
            {!!item.secondCouponName && (
              <Text style={styles.item_main_left_text}>
                优惠券2：
                {item.secondCouponName}
              </Text>
            )}
            <Text style={styles.item_main_left_text}>
              开始时间：
              {moment(item.startTime).format("YYYY-MM-DD")}
            </Text>
            <Text style={styles.item_main_left_text}>
              结束时间：
              {moment(item.finishTime).format("YYYY-MM-DD")}
            </Text>
          </View>
          <View style={styles.item_main_right}>
            <Image
              source={translateImageUrl(item.imgUrl)}
              style={styles.item_main_right_img}
            />
          </View>
        </View>
        <View style={styles.item_bottomBtns}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item_bottomBtns_btn}
            onPress={this.remove}
          >
            <Text style={styles.item_bottomBtns_btn_text}>删除</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.item_bottomBtns_btn, styles.item_bottomBtns_btn1]}
            onPress={this.edit}
          >
            <Text
              style={[
                styles.item_bottomBtns_btn_text,
                styles.item_bottomBtns_btn_text1
              ]}
            >
              编辑
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.item_bottomBtns_btn, styles.item_bottomBtns_btn2]}
            onPress={this.toggleStatus}
          >
            <Text
              style={[
                styles.item_bottomBtns_btn_text,
                styles.item_bottomBtns_btn_text2
              ]}
            >
              {item.status == "1" ? "关闭" : "开启"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
