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
    this.toOtherPage("ActivityPointsExchangeGiftsDetail", {
      mode: "edit",
      id: this.props.item.id,
      fnSuccess: this.props.fnSuccess
    });
  };
  remove = () => {
    Modal.alert("删除", "确定要删除？", [
      { text: "取消", onPress: () => {}, style: "default" },
      {
        text: "确定",
        onPress: () => {
          Toast.loading("loading..");
          ActivityService.removeExchangeGift(this.props.item.id)
            .then(response => {
              console.log("删除", response);
              Toast.success("删除成功");
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
  render() {
    const item = this.props.item;
    return (
      <View style={styles.item}>
        <View style={styles.item_main}>
          <Text style={styles.item_main_title}>{item.giftName}</Text>
          <Text style={styles.item_main_subTitle}>
            {moment(item.startTime).format("YYYY-MM-DD")} -{" "}
            {moment(item.finishTime).format("YYYY-MM-DD")}
          </Text>
          <View style={styles.item_main_pointBox}>
            <Text style={styles.item_main_pointBox_text}>
              {item.usePoints}
              积分奖励
            </Text>
            <View style={styles.item_main_pointBox_btn}>
              <Text style={styles.item_main_pointBox_btn_text}>
                已领
                {item.hadGetCount}
              </Text>
            </View>
            <View style={styles.item_main_pointBox_btn}>
              <Text style={styles.item_main_pointBox_btn_text}>
                已换
                {item.setOutCount}
              </Text>
            </View>
          </View>
        </View>
        {/*     <View style={styles.item_bottomBtns}>
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
        </View> */}
      </View>
    );
  }
}
