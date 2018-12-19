import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  InteractionManager,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from "react-native";
import { Toast } from "antd-mobile-rn";
import dictionaryStore from "stores/dictionaryStore";
import styles from "./styles";
import { whiteThemeNavigationOptions } from "pages/index";
import OrderService from "services/OrderService";
import CancelOrderModal from "../CancelOrderModal";
import AcceptOrderModal from "../AcceptOrderModal";
import {
  translateImageUrl,
  sendPhoneMessage,
  callPhone,
  openPhoneModal
} from "utils/CommonUtils";
const urlImgMessage = require("../OrderItem/assets/btn_msg.png");
const urlImgPhone = require("../OrderItem/assets/btn_phone.png");

interface navigationParams {
  id: number;
  fnSuccess?: Function;
}
interface Props {
  navigation: any;
}
export default class OrderDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "订单详情",
    headerRight: <View />
  });
  hadChangeStatus: boolean = false; // 是否有改变状态，用于刷新上一页列表
  state = {
    loading: true,
    item: {} as any
  };
  timer: any = null;
  pageFocusSubscription: any;
  pageBlurSubscription: any;
  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  toDeliveryPage = () => {
    this.props.navigation.navigate("DeliveryDetail", {
      orderId: this.state.item.id,
      fnSuccess: () => {
        this.getData();
        this.hadChangeStatus = true;
      }
    });
  };
  toAddDeliveryPage = () => {
    this.props.navigation.navigate("AddDelivery", {
      orderId: this.state.item.id,
      fnSuccess: () => {
        this.getData();
        this.hadChangeStatus = true;
      }
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
      this.state.item.deliveryType == "1" ||
      this.state.item.paymentType == "0"
    ) {
      // 到店自提 || 现金支付
      Toast.loading("提交中..");
      OrderService.acceptOrder(this.state.item.id)
        .then(response => {
          console.log("接受订单", response);
          Toast.success("接受订单成功");
          this.getData();
          this.hadChangeStatus = true;
          this.startRefleshTimer();
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
    OrderService.completeOrder(this.state.item.id)
      .then(response => {
        console.log("收款确认", response);
        Toast.success("收款确认成功");
        this.getData();
        this.hadChangeStatus = true;
        this.stopRefleshTimer();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  getData = () => {
    const id = this.props.navigation.getParam("id", "");
    if (id) {
      // Toast.loading("loading..");
      this.setState({
        loading: true
      });
      OrderService.getOrderDetailById(id)
        .then(response => {
          // Toast.hide();
          console.log("订单详情", response);
          this.setState({
            loading: false,
            item: response
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          Toast.fail(error.message || error, 2);
        });
    } else {
      Toast.fail("订单id为null");
    }
  };
  startRefleshTimer = () => {
    this.stopRefleshTimer();
    this.timer = setInterval(() => {
      if (this.state.item.deliveryType == 0 && this.state.item.status == 2) {
        this.getData();
      }
    }, 60000);
  };
  stopRefleshTimer = () => {
    this.timer && clearInterval(this.timer);
  };
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate(preProps) {
    if (
      preProps.navigation.getParam("id") != this.props.navigation.getParam("id")
    ) {
      console.log(
        "componentWillReceiveProps",
        this.props.navigation.getParam("id")
      );
      this.getData();
    }
  }
  componentDidMount() {
    // InteractionManager.runAfterInteractions(() => {
    this.getData();
    // });
    this.pageFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      payload => {
        this.startRefleshTimer();
      }
    );
    this.pageBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      payload => {
        this.stopRefleshTimer();
      }
    );
  }
  componentWillUnmount() {
    if (this.hadChangeStatus) {
      this.props.navigation.getParam("fnSuccess", () => {})();
    }
    this.stopRefleshTimer();
    this.pageFocusSubscription && this.pageFocusSubscription.remove();
    this.pageBlurSubscription && this.pageBlurSubscription.remove();
  }
  render() {
    const item: any = this.state.item;
    const isDeliver: boolean = !!item.expressDeliveryOrderNo; // 是否为跑男配送
    const fnSuccess: Function = () => {
      this.getData();
      this.hadChangeStatus = true;
    };
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {!!item.id ? (
          <View>
            <View style={styles.addressBox}>
              <Image
                source={require("./assets/icon_location.png")}
                style={styles.addressBox_img}
              />
              <View style={styles.addressBox_textBox}>
                <Text style={styles.addressBox_text}>
                  收货人：
                  {item.receiverName}{" "}
                  <Text
                    style={styles.addressBox_text_red}
                    selectable={true}
                    onPress={() => {
                      openPhoneModal(item.receiverPhone);
                    }}
                  >
                    {item.receiverPhone}
                  </Text>
                </Text>
                <Text
                  style={[styles.addressBox_text, styles.addressBox_text2]}
                  selectable={true}
                >
                  配送地址：
                  {item.deliveryAddress}
                </Text>
              </View>
            </View>
            {isDeliver && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.toDeliveryPage}
                style={styles.toDeliveryPageBtn}
              >
                <Image
                  source={require("./assets/icon_car_red.png")}
                  style={styles.toDeliveryPageBtn_img}
                />
                <Text style={styles.toDeliveryPageBt_text}>
                  配送追踪(
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
              </TouchableOpacity>
            )}
            {/*deliveryType==0店家配送 status == 2订单送货中 */}
            {item.deliveryType == 0 &&
              item.status == 2 &&
              (item.expressDeliveryOrderStatus == null ||
                item.expressDeliveryOrderStatus == 20) && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.toAddDeliveryPage}
                  style={styles.toDeliveryPageBtn}
                >
                  <Image
                    source={require("./assets/icon_paotui.png")}
                    style={styles.toDeliveryPageBtn_img}
                  />
                  <Text style={styles.toDeliveryPageBt_text}>跑腿配送下单</Text>
                </TouchableOpacity>
              )}
            <View style={styles.marginBox} />
            <View style={styles.shopTitleBox}>
              <Image
                source={require("./assets/icon_shop.png")}
                style={styles.shopTitleBox_img}
              />
              <Text style={styles.shopTitleBox_text}>{item.shopName}</Text>
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
            <View style={styles.priceBox}>
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>商品总价</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.productTotalPrice}
                </Text>
              </View>
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>优惠券抵扣</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.couponCutDownMoney}
                </Text>
              </View>
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>积分抵扣</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.pointsCutDownMoney}
                </Text>
              </View>
            </View>
            <View style={styles.priceBox}>
              <View style={styles.priceBox_border} />
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>用户支付配送费</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.freight}
                </Text>
              </View>
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>实付金额</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.totalPrice}
                </Text>
              </View>
              <View style={styles.priceBox_row}>
                <Text style={styles.priceBox_row_text}>商家实付配送费</Text>
                <Text
                  style={[styles.priceBox_row_text, styles.priceBox_row_text2]}
                >
                  {item.sellerPayFreight}
                </Text>
              </View>
              <View style={styles.priceBox_row}>
                <Text
                  style={[
                    styles.priceBox_row_text,
                    styles.priceBox_row_textBlack
                  ]}
                >
                  商家到手金额
                </Text>
                <Text
                  style={[
                    styles.priceBox_row_text,
                    styles.priceBox_row_text2,
                    styles.priceBox_row_textBlack
                  ]}
                >
                  {item.sellerTotalPrice}
                </Text>
              </View>
            </View>
            <View style={styles.marginBox} />
            <View style={styles.orderBox}>
              <View style={styles.orderBox_title}>
                <View style={styles.orderBox_title_border} />
                <Text style={styles.orderBox_title_text}>订单信息</Text>
              </View>
              <View style={styles.orderBox_row}>
                <Text style={styles.orderBox_row_text}>订单编号</Text>
                <Text
                  selectable={true}
                  style={[styles.orderBox_row_text, styles.orderBox_row_text2]}
                >
                  {item.orderCode}
                </Text>
              </View>
              <View style={styles.orderBox_row}>
                <Text style={styles.orderBox_row_text}>支付方式</Text>
                <Text
                  style={[styles.orderBox_row_text, styles.orderBox_row_text2]}
                >
                  {dictionaryStore.PaymentType.reduce((pre, next) => {
                    if (next.value == item.paymentType) {
                      pre = next.text;
                    }
                    return pre;
                  }, "")}
                </Text>
              </View>
              <View style={styles.orderBox_row}>
                <Text style={styles.orderBox_row_text}>创建时间</Text>
                <Text
                  style={[styles.orderBox_row_text, styles.orderBox_row_text2]}
                >
                  {item.createTime}
                </Text>
              </View>
              <View style={styles.orderBox_row}>
                <Text style={styles.orderBox_row_text}>状态</Text>
                <Text
                  style={[styles.orderBox_row_text, styles.orderBox_row_text2]}
                >
                  {dictionaryStore.OrderStatus.reduce((pre, next) => {
                    if (next.value == item.status) {
                      pre = next.text;
                    }
                    return pre;
                  }, "")}
                </Text>
              </View>
              <View style={styles.orderBox_row}>
                <Text style={styles.orderBox_row_text}>买家备注</Text>
                <Text
                  style={[
                    styles.orderBox_row_text,
                    styles.orderBox_row_text2,
                    styles.orderBox_row_textRed
                  ]}
                >
                  {item.buyerRemark}
                </Text>
              </View>
              {isDeliver && (
                <View style={styles.orderBox_row}>
                  <Text style={styles.orderBox_row_text}>配送状态</Text>
                  <Text
                    style={[
                      styles.orderBox_row_text,
                      styles.orderBox_row_text2
                    ]}
                  >
                    {dictionaryStore.expressDeliveryOrderStatuses.reduce(
                      (pre, next) => {
                        if (next.value == item.expressDeliveryOrderStatus) {
                          pre = next.label;
                        }
                        return pre;
                      },
                      ""
                    )}
                  </Text>
                </View>
              )}
              {isDeliver && (
                <View style={styles.orderBox_row}>
                  <Text style={styles.orderBox_row_text}>配送号</Text>
                  <Text
                    selectable={true}
                    style={[
                      styles.orderBox_row_text,
                      styles.orderBox_row_text2
                    ]}
                  >
                    {item.expressDeliveryOrderNo}
                  </Text>
                </View>
              )}
              {item.status == 4 && (
                <View style={styles.orderBox_row}>
                  <Text style={styles.orderBox_row_text}>
                    {dictionaryStore.OrderWhoCancel.reduce((pre, next) => {
                      if (next.value == item.whoCancel) {
                        pre = next.text;
                      }
                      return pre;
                    }, "")}
                    取消
                  </Text>
                  <Text
                    style={[
                      styles.orderBox_row_text,
                      styles.orderBox_row_text2,
                      styles.orderBox_row_textRed
                    ]}
                  >
                    {item.cancelReason}
                  </Text>
                </View>
              )}
            </View>
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
            {(item.status == 0 || item.status == 1 || item.status == 2) && (
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
                    style={[
                      styles.submitBtnBox_btn,
                      styles.submitBtnBox_btnRed
                    ]}
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
            )}
          </View>
        ) : (
          <ActivityIndicator />
        )}
        <CancelOrderModal
          ref="CancelOrderModal"
          fnSuccess={fnSuccess}
          id={item.id}
        />
        <AcceptOrderModal
          ref="AcceptOrderModal"
          fnSuccess={fnSuccess}
          id={item.id}
          orderDetail={item}
        />
      </ScrollView>
    );
  }
}
