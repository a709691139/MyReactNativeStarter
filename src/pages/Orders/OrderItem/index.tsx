import React from "react";
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
  Platform
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import IconIonicon from "react-native-vector-icons/Ionicons";
const urlImgList = require("./assets/icon_dingdanh.png");
const urlImgMessage = require("./assets/btn_msg.png");
const urlImgPhone = require("./assets/btn_phone.png");
const urlImgDone = require("./assets/im_done.png");
import CancelOrderModal from "../CancelOrderModal";
import AcceptOrderModal from "../AcceptOrderModal";
import dictionaryStore from "stores/dictionaryStore";
import OrderService from "services/OrderService";
import {
  translateImageUrl,
  sendPhoneMessage,
  callPhone
} from "utils/CommonUtils";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";

interface Props {
  item: any;
  navigation?: any;
  fnCancelSuccess?: () => void;
  fnAcceptSuccess?: () => void;
}
export default class OrderItem extends React.PureComponent<Props> {
  static defaultProps = {
    fnCancelSuccess: () => {},
    fnAcceptSuccess: () => {}
  };
  state = {
    contactBoxVisible:
      false && this.props.item.type != 4 && this.props.item.type != 5
  };
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  toDetailPage = () => {
    this.toOtherPage("OrderDetail", {
      id: this.props.item.id,
      fnSuccess: this.props.fnAcceptSuccess
    });
    console.log("跳转");
  };

  turn2MapApp = (
    lng = 0,
    lat = 0,
    targetAppName = "baidu",
    name = "目标地址"
  ) => {
    if (!lat && !lng) {
      console.warn("暂时不能导航");
      return;
    }

    let url = "";
    let webUrl = `http://uri.amap.com/navigation?to=${lng},${lat},${name}&mode=bus&coordinate=gaode`;
    let webUrlGaode = `http://uri.amap.com/navigation?to=${lng},${lat},${name}&mode=bus&coordinate=gaode`;
    let webUrlBaidu = `http://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${name}&output=html`;

    url = webUrl;
    if (Platform.OS == "android") {
      //android

      if (targetAppName == "gaode") {
        // webUrl = 'androidamap://navi?sourceApplication=appname&poiname=fangheng&lat=36.547901&lng=104.258354&dev=1&style=2';
        url = `androidamap://route?sourceApplication=appname&dev=0&m=0&t=1&dlng=${lng}&dlat=${lat}&dname=${name}`;
        webUrl = webUrlGaode;
      } else if (targetAppName == "baidu") {
        url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lng}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
        webUrl = webUrlBaidu;
      }
    } else if (Platform.OS == "ios") {
      //ios

      if (targetAppName == "gaode") {
        url = `iosamap://path?sourceApplication=appname&dev=0&m=0&t=1&dlng=${lng}&dlat=${lat}&dname=${name}`;
        webUrl = webUrlGaode;
      } else if (targetAppName == "baidu") {
        url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lng}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
        webUrl = webUrlBaidu;
      }
    }

    // Linking.canOpenURL(url)
    //   .then(supported => {
    //     if (!supported) {
    //       console.log("Can't handle url: " + url);
    //       this.toOtherPage("WebView", { title: "导航", uri: webUrl });
    //       // return Linking.openURL(webUrl).catch(e => console.warn(e));
    //     } else {
    //       return Linking.openURL(url).catch(e => console.warn(e));
    //     }
    //   })
    //   .catch(err => console.error("An error occurred", err));
    this.toOtherPage("WebView", { title: "导航", uri: webUrl });
    console.log(webUrl);
  };

  toggleContactBoxVisible = () => {
    this.setState({
      contactBoxVisible: !this.state.contactBoxVisible
    });
  };
  openCancelOrderModal = () => {
    this.refs["CancelOrderModal"].open();
  };
  openAcceptOrderModal = () => {
    this.refs["AcceptOrderModal"].open();
  };
  acceptOrder = () => {
    if (
      this.props.item.deliveryType == "1" ||
      this.props.item.paymentType == "0"
    ) {
      // 到店自提 || 现金支付
      Toast.loading("提交中..");
      OrderService.acceptOrder(this.props.item.id)
        .then(response => {
          console.log("接受订单", response);
          Toast.success("接受订单成功");
          this.props.fnAcceptSuccess();
        })
        .catch(error => {
          console.log(error);
          Toast.fail(error.message || error, 2);
        });
    } else {
      // 选择配送方式
      this.openAcceptOrderModal();
    }
  };
  completeOrder = () => {
    Toast.loading("提交中..");
    OrderService.completeOrder(this.props.item.id)
      .then(response => {
        console.log("收款确认", response);
        Toast.success("收款确认成功");
        this.props.fnAcceptSuccess();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  render() {
    const item = this.props.item;
    const MarginBorderBox = (
      <View style={styles.MarginBorderBox}>
        <View style={styles.MarginBorderBox_border} />
        <View
          style={[
            styles.MarginBorderBox_point,
            styles.MarginBorderBox_point_left
          ]}
        />
        <View
          style={[
            styles.MarginBorderBox_point,
            styles.MarginBorderBox_point_right
          ]}
        />
      </View>
    );
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.toDetailPage}>
          <View>
            <View style={styles.topBox}>
              <View style={styles.topBox_main}>
                <View style={styles.topBox_main_idBox}>
                  <Image
                    source={urlImgList}
                    style={styles.topBox_main_idBox_img}
                  />
                  <Text style={styles.topBox_main_idBox_text}>
                    订单号：
                    {item.orderCode}
                  </Text>
                </View>
                <Text style={styles.topBox_main_time}> {item.createTime}</Text>
              </View>
              {item.status == 3 ? (
                <Image source={urlImgDone} style={styles.topBox_doneImg} />
              ) : (
                <View style={styles.topBox_statusBox}>
                  <Text
                    style={[
                      styles.topBox_statusBox_text,
                      item.status != "4" && styles.topBox_statusTextRed
                    ]}
                  >
                    {dictionaryStore.OrderStatus.reduce((pre, next) => {
                      if (next.value == item.status) {
                        pre = next.text;
                      }
                      return pre;
                    }, "")}
                  </Text>
                  <Text style={styles.topBox_statusBox_text2}>
                    {item.expressDeliveryOrderNo
                      ? "跑男配送"
                      : dictionaryStore.DeliveryType.reduce((pre, next) => {
                          if (next.value == item.deliveryType) {
                            pre = next.text;
                          }
                          return pre;
                        }, "")}
                  </Text>
                  {item.status == 2 &&
                    !!item.expressDeliveryOrderNo && (
                      <Text style={styles.topBox_statusBox_text2}>
                        (
                        {dictionaryStore.expressDeliveryOrderStatuses.reduce(
                          (pre, next) => {
                            if (next.value == item.expressDeliveryOrderStatus) {
                              pre = next.label;
                            }
                            return pre;
                          },
                          ""
                        )}
                        )
                      </Text>
                    )}
                </View>
              )}
            </View>
            <View style={styles.goodsBox}>
              {item.detailList &&
                item.detailList.map((v, i) => {
                  return (
                    <View style={styles.goodsBoxRow} key={i}>
                      <View style={styles.goodsBoxRow_left_imgView}>
                        <Image
                          style={styles.goodsBoxRow_left_img}
                          source={translateImageUrl(v.productImgUrl)}
                        />
                      </View>
                      <View style={styles.goodsBoxRow_center}>
                        <Text
                          style={styles.goodsBoxRow_center_text}
                          numberOfLines={3}
                        >
                          {v.productName}
                        </Text>
                      </View>
                      <View style={styles.goodsBoxRow_right}>
                        <Text style={styles.goodsBoxRow_right_text1}>
                          ￥ {v.unitPrice}
                        </Text>
                        <Text style={styles.goodsBoxRow_right_text2}>
                          x {v.quantity}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </View>
            <View style={styles.totalBox}>
              <Text style={styles.totalBox_text}>
                共
                {item.detailList
                  ? item.detailList.reduce((pre, next) => {
                      return pre + next.quantity;
                    }, 0)
                  : 0}
                件商品
              </Text>
              <Text style={styles.totalBox_price}>
                <Text style={styles.totalBox_price_text}>实付款(含运费） </Text>
                <Text style={styles.totalBox_textRed}>￥{item.totalPrice}</Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {MarginBorderBox}
        {!this.state.contactBoxVisible ? (
          <View style={styles.contactTitleBox}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.contactTitleBox_btn}
              onPress={this.toggleContactBoxVisible}
            >
              <Text style={styles.contactTitleBox_btn_text}>收货人信息</Text>
              <IconIonicon
                name="ios-arrow-down"
                color="#999999"
                size={32 * EStyleSheet.value("$scale")}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.customerBox}>
            <View style={styles.customerBox_row}>
              <Text style={styles.customerBox_row_text1}>收货人</Text>
              <Text style={styles.customerBox_row_text2}>
                {item.receiverName}
              </Text>
              <IconIonicon
                name="ios-arrow-up"
                color="#999999"
                size={32 * EStyleSheet.value("$scale")}
                onPress={this.toggleContactBoxVisible}
              />
            </View>
            <View style={styles.customerBox_row}>
              <Text style={styles.customerBox_row_text1}>收货电话</Text>
              <Text style={styles.customerBox_row_text2} selectable={true}>
                {item.receiverPhone}
              </Text>
            </View>
            <View style={styles.customerBox_row}>
              <Text style={styles.customerBox_row_text1}>收货地址</Text>
              <View style={styles.customerBox_row_right}>
                <Text
                  style={styles.customerBox_row_text2}
                  selectable={true}
                  onPress={() =>
                    this.turn2MapApp(
                      item.deliveryLongitude,
                      item.deliveryLatitude,
                      "baidu",
                      item.deliveryAddress
                    )
                  }
                >
                  {item.deliveryAddress}
                </Text>
                {item.deliveryLongitude && (
                  <IconEvilIcons
                    name="location"
                    size={30 * EStyleSheet.value("$scale")}
                    style={{ marginTop: 5 }}
                  />
                )}
              </View>
            </View>
            {item.buyerRemark && (
              <View style={styles.customerBox_row}>
                <Text style={styles.customerBox_row_text1}>买家备注</Text>
                <Text style={styles.customerBox_row_text2}>
                  {item.buyerRemark}
                </Text>
              </View>
            )}
            <View style={styles.customerBox_row}>
              <Text style={styles.customerBox_row_text1}>支付方式</Text>
              <Text style={styles.customerBox_row_text2}>
                {dictionaryStore.PaymentType.reduce((pre, next) => {
                  if (next.value == item.paymentType) {
                    pre = next.text;
                  }
                  return pre;
                }, "")}
              </Text>
            </View>
            <View style={[styles.customerBox_row, { marginBottom: 0 }]}>
              <Text style={styles.customerBox_row_text1}>配送方式</Text>
              <Text style={styles.customerBox_row_text2}>
                {dictionaryStore.DeliveryType.reduce((pre, next) => {
                  if (next.value == item.deliveryType) {
                    pre = next.text;
                  }
                  return pre;
                }, "")}
                {/* <Text style={styles.customerBox_row_text1Red}>
                  未满最低起送要求
                </Text> */}
              </Text>
            </View>
          </View>
        )}

        {this.state.contactBoxVisible && (
          <View>
            {MarginBorderBox}
            <View style={styles.contactBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.contactBox_btn}
                onPress={() => sendPhoneMessage(item.receiverPhone)}
              >
                <Image
                  source={urlImgMessage}
                  style={styles.contactBox_btn_img}
                />
                <Text style={styles.contactBox_btn_text}>发送短信</Text>
              </TouchableOpacity>
              <View style={styles.contactBox_btnBorder} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.contactBox_btn}
                onPress={() => callPhone(item.receiverPhone)}
              >
                <Image source={urlImgPhone} style={styles.contactBox_btn_img} />
                <Text style={styles.contactBox_btn_text}>联系买家</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {(item.status == 0 || item.status == 1 || item.status == 2) && (
          <View>
            {MarginBorderBox}
            <View style={styles.submitBtnBox}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.submitBtnBox_btn}
                onPress={this.openCancelOrderModal}
              >
                <Text style={styles.submitBtnBox_btn_text}>取消</Text>
              </TouchableOpacity>
              {item.status == 0 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.submitBtnBox_btn, styles.submitBtnBox_btnRed]}
                  onPress={this.acceptOrder}
                >
                  <Text
                    style={[
                      styles.submitBtnBox_btn_text,
                      styles.submitBtnBox_btn_textRed
                    ]}
                  >
                    接单
                  </Text>
                </TouchableOpacity>
              )}
              {item.paymentType == 0 &&
                (item.status == 1 || item.status == 2) && (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                      styles.submitBtnBox_btn,
                      styles.submitBtnBox_btnRed
                    ]}
                    onPress={this.completeOrder}
                  >
                    <Text
                      style={[
                        styles.submitBtnBox_btn_text,
                        styles.submitBtnBox_btn_textRed
                      ]}
                    >
                      收款确认
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
        )}

        {item.status == 4 && (
          <View>
            {MarginBorderBox}
            <View style={styles.cancelReasonBox}>
              <Text style={styles.cancelReasonBox_text1}>
                {dictionaryStore.OrderWhoCancel.reduce((pre, next) => {
                  if (next.value == item.whoCancel) {
                    pre = next.text;
                  }
                  return pre;
                }, "")}
                取消
              </Text>
              <Text style={styles.cancelReasonBox_text2}>
                {item.cancelReason}
              </Text>
            </View>
          </View>
        )}
        <CancelOrderModal
          ref="CancelOrderModal"
          fnSuccess={this.props.fnCancelSuccess}
          id={item.id}
        />
        <AcceptOrderModal
          ref="AcceptOrderModal"
          fnSuccess={this.props.fnAcceptSuccess}
          id={item.id}
          orderDetail={item}
        />
      </View>
    );
  }
}
