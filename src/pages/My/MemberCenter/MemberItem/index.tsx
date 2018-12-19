import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Toast, Modal } from "antd-mobile-rn";
import styles from "./styles";
import { observer } from "mobx-react";
import { translateImageUrl } from "utils/CommonUtils";
const urlIconMore = require("images/img_gengduo.png");
const urlIconShare = require("./assets/img_fenxiang.png");
// const urlIconLink = require("./assets/img_guanlian.png");
const urlIconCount = require("./assets/img_count.png");
const urlIconCollect = require("./assets/img_zixingxing.png");
const urlIconMoney = require("./assets/img_jinqian.png");

interface Props {
  item: any;
  navigation?: any;
  memberCenterStore: any;
}
@observer
export default class MemberItem extends React.Component<Props> {
  state = {};
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  showActionSheet = (item: any) => {
    let list: Array<any> = [
      {
        text: "修改备注",
        onPress: () => {
          Modal.prompt(
            "修改备注",
            "限制在30个字符以内",
            value => {
              Toast.loading("loading");
              if (!value || value.length > 30) {
                Toast.fail("备注限制在30个字符以内", 2);
                return;
              }
              this.props.memberCenterStore
                .asyncUpdateMember({ remark: value, id: item.id })
                .then(response => {
                  Toast.success("修改成功", 1);
                })
                .catch(error => {
                  console.log(error);
                  Toast.fail(error.message || error, 2);
                });
            },
            "default",
            "",
            ["点击输入备注"]
          );
        }
      }
    ];
    let title = item.inBlacklist == "0" ? "拉入黑名单" : "解除黑名单";
    list.push({
      text: title,
      onPress: () => {
        Modal.alert(title, "确定" + title + "?", [
          {
            text: "取消",
            onPress: () => {}
          },
          {
            text: "确定",
            onPress: () => {
              Toast.loading("loading..");
              this.props.memberCenterStore
                .asyncUpdateMember({
                  inBlacklist: item.inBlacklist == "0" ? "1" : "0",
                  id: item.id
                })
                .then(response => {
                  Toast.success("修改成功", 1);
                })
                .catch(error => {
                  console.log(error);
                  Toast.fail(error.message || error, 2);
                });
            }
          }
        ]);
      }
    });
    Modal.operation(list);
  };
  transCount = (count: number | string) => {
    count = parseInt(count.toString()) || 0;
    if (count / 10000 > 1) {
      count = parseFloat((count / 10000).toFixed(2)) + "万";
    }
    return count;
  };
  render() {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.userBox}>
          <Image
            source={translateImageUrl(item.logoImgUrl)}
            style={styles.userBox_avatar}
          />
          <View style={styles.userBox_main}>
            <Text style={styles.userBox_main_text1}>
              {item.buyerName || item.wechatName}
            </Text>
            <Text style={styles.userBox_main_text2}>
              消费积分
              {item.payPoints}
              &ensp;|&ensp;奖励积分
              {item.rewardPoints}
            </Text>
            <Text style={styles.userBox_main_text3}>{item.createTime}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.showActionSheet(item)}
          >
            <Image source={urlIconMore} style={styles.userBox_rightBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.numberBox}>
          <View style={styles.numberBox_li}>
            <Image source={urlIconCollect} style={styles.numberBox_li_img} />
            <Text style={styles.numberBox_li_text}>
              {this.transCount(item.productCollectionCount)}
            </Text>
          </View>
          <View style={styles.numberBox_li}>
            <Image source={urlIconShare} style={styles.numberBox_li_img} />
            <Text style={styles.numberBox_li_text}>
              {this.transCount(item.shareTotalCount)}
            </Text>
          </View>
          <View style={styles.numberBox_li}>
            <Image source={urlIconCount} style={styles.numberBox_li_img} />
            <Text style={styles.numberBox_li_text}>
              {this.transCount(item.clickProductDetailCount)}
            </Text>
          </View>
          <View style={styles.numberBox_li}>
            <Image source={urlIconMoney} style={styles.numberBox_li_img} />
            <Text style={styles.numberBox_li_text}>
              {this.transCount(item.consumeTotalPrice)}
            </Text>
          </View>
        </View>
        {!!item.remark && (
          <Text style={styles.remarkText}>
            备注：
            {item.remark}
          </Text>
        )}
      </View>
    );
  }
}
