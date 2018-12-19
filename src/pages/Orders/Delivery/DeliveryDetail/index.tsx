import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Toast, Modal } from "antd-mobile-rn";
import styles from "./styles";
import OrderService from "services/OrderService";
import { whiteThemeNavigationOptions } from "pages/index";
import moment from "moment";
import { openPhoneModal } from "utils/CommonUtils";
import WorkerMap from "../WorkerMap";
import HeaderButtons from "components/HeaderButtons";

interface navigationParams {
  orderId: number;
  fnSuccess: Function;
}
interface Props {
  navigation: any;
}

export default class DeliveryDetail extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: "配送详情",
    headerRight: navigation.getParam("headerRight", <View />)
  });
  state = {
    loading: true,
    item: {}
  };
  constructor(props) {
    super(props);
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
  cancelDeliverOrder = () => {
    Modal.prompt(
      "确定取消跑腿订单吗？",
      "请输入取消原因",
      [
        { text: "取消" },
        {
          text: "确定",
          onPress: (reason: string) => {
            if (!reason) {
              Toast.info("请输入原因", 2);
            } else {
              Toast.loading("loading", 0);
              OrderService.cancelDeliverOrder(
                this.props.navigation.getParam("orderId"),
                reason
              )
                .then(response => {
                  Toast.info("已取消跑腿配送", 2);
                  this.goBack();
                  this.props.navigation.getParam("fnSuccess", () => {})();
                })
                .catch(error => {
                  console.log(error);
                  Toast.fail(error.message || error, 2);
                });
            }
          }
        }
      ],
      "default",
      ""
    );
  };
  getData = async () => {
    const orderId: number = this.props.navigation.getParam("orderId", "");
    if (orderId) {
      Toast.loading("loading..");
      this.setState({
        loading: true
      });
      OrderService.getDeliverOrderDetal(orderId)
        .then(response => {
          Toast.hide();
          console.log("配送详情", response);
          if (response.jsptOrderLogList) {
            response.jsptOrderLogList.reverse();
          }
          this.setState(
            {
              loading: false,
              item: response
            },
            () => {
              if (response.orderStatus != 20 && response.orderStatus != 14) {
                this.props.navigation.setParams({
                  headerRight: (
                    <HeaderButtons>
                      <HeaderButtons.ChildButton
                        onPress={this.cancelDeliverOrder}
                      >
                        <Text style={styles.headerRightText}>取消</Text>
                      </HeaderButtons.ChildButton>
                    </HeaderButtons>
                  )
                });
              } else {
                this.props.navigation.setParams({
                  headerRight: <View />
                });
              }
            }
          );
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
          Toast.fail(error.message || error);
        });
    } else {
      this.props.navigation.goBack();
      Toast.fail("订单id为null");
    }
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    const item: any = this.state.item;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.orderBox}>
          <View style={styles.textBox}>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>跑腿单号</Text>
              <Text selectable={true} style={styles.textBox_row_text}>
                {item.orderNo}
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>跑单状态</Text>
              <Text style={styles.textBox_row_text}>{item.statusText}</Text>
            </View>
            {item.workerId && (
              <View style={styles.textBox_row}>
                <Text style={styles.textBox_row_label}>跑男姓名</Text>
                <Text selectable={true} style={styles.textBox_row_text}>
                  {item.workerName}
                </Text>
              </View>
            )}
            {item.workerId && (
              <View style={styles.textBox_row}>
                <Text style={styles.textBox_row_label}>跑男电话</Text>
                <Text
                  style={styles.textBox_row_text}
                  onPress={() => openPhoneModal(item.workerPhone)}
                >
                  {item.workerPhone}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.textBox}>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>发货地址</Text>
              <Text selectable={true} style={styles.textBox_row_text}>
                {item.goodsAddress}({item.goodsAddressBuilding})
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>发货人姓名</Text>
              <Text selectable={true} style={styles.textBox_row_text}>
                {item.goodsContactName}
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>发货人电话</Text>
              <Text
                style={styles.textBox_row_text}
                onPress={() => openPhoneModal(item.goodsContactPhone)}
              >
                {item.goodsContactPhone}
              </Text>
            </View>
          </View>

          <View style={styles.textBox}>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>收货地址</Text>
              <Text selectable={true} style={styles.textBox_row_text}>
                {item.targetAddress}({item.targetAddressBuilding})
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>收货人姓名</Text>
              <Text selectable={true} style={styles.textBox_row_text}>
                {item.targetContactName}
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>收货人电话</Text>
              <Text
                style={styles.textBox_row_text}
                onPress={() => openPhoneModal(item.targetContactPhone)}
              >
                {item.targetContactPhone}
              </Text>
            </View>
          </View>

          <View style={styles.textBox}>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>下单时间</Text>
              <Text style={styles.textBox_row_text}>{item.createTime}</Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>发货类型</Text>
              <Text style={styles.textBox_row_text}>{item.itemTypeText}</Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>预约时间</Text>
              <Text style={styles.textBox_row_text}>
                {item.timeType == 1 ? "现在" : item.executeTime}
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>订单备注</Text>
              <Text style={styles.textBox_row_text}>{item.remark}</Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>其他服务</Text>
              <Text style={styles.textBox_row_text}>
                {item.selectCarDelivery == 1 && "小车配送"}
                {"  "}
                {item.selectIncubator == "1" && "保温箱配送"}{" "}
              </Text>
            </View>
            <View style={styles.textBox_row}>
              <Text style={styles.textBox_row_label}>订单金额</Text>
              <Text style={styles.textBox_row_text}>{item.actualPay}</Text>
            </View>
          </View>
        </View>
        <View style={styles.marginBox} />
        <View style={styles.statusBox}>
          <View style={[styles.statusBox_row, styles.statusBox_rowTitle]}>
            <View style={styles.textBox_row_left} />
            <View style={styles.textBox_row_center}>
              <Image
                style={styles.textBox_row_center_img}
                source={require("./assets/icon_weizhi.png")}
              />
            </View>
            <View style={styles.textBox_row_right}>
              <Text style={styles.textBox_row_right_address}>
                [收货地址]
                <Text
                  selectable={true}
                  style={styles.textBox_row_right_address1}
                >
                  {item.targetAddress}({item.targetAddressBuilding})
                </Text>
              </Text>
            </View>
          </View>
          {!!item.jsptOrderLogList &&
            item.jsptOrderLogList.map((v, i) => {
              return (
                <View style={styles.statusBox_row} key={i}>
                  <View style={styles.textBox_row_left}>
                    <Text
                      style={[
                        styles.textBox_row_left_date,
                        i == 0 && styles.textBox_row_leftText
                      ]}
                    >
                      {moment(v.createTime).format("MM-DD")}
                    </Text>
                    <Text
                      style={[
                        styles.textBox_row_left_time,
                        i == 0 && styles.textBox_row_leftText
                      ]}
                    >
                      {moment(v.createTime).format("HH:mm")}
                    </Text>
                  </View>
                  <View style={styles.textBox_row_center}>
                    <View style={styles.textBox_row_center_border} />
                    <Image
                      style={styles.textBox_row_center_img}
                      source={
                        i == 0
                          ? require("./assets/icon_wanc.png")
                          : require("./assets/icon_arrow.png")
                      }
                    />
                  </View>
                  <View style={styles.textBox_row_right}>
                    <Text
                      style={[
                        styles.textBox_row_right_status,
                        i == 0 && styles.redText
                      ]}
                    >
                      {v.orderDesc}
                    </Text>
                    {v.orderStatus == 20 && (
                      <Text
                        style={[
                          styles.textBox_row_right_text,
                          i == 0 && styles.redText
                        ]}
                      >
                        取消原因：
                        {item.cancelReason}
                      </Text>
                    )}

                    {!!v.address && (
                      <WorkerMap
                        style={styles.statusBox_row_map}
                        helpType={item.helpType}
                        workerLatitude={v.latitude}
                        workerLongitude={v.longitude}
                        goodsAddressLatitude={item.goodsAddressLatitude}
                        goodsAddressLongitude={item.goodsAddressLongitude}
                        targetAddressLatitude={item.targetAddressLatitude}
                        targetAddressLongitude={item.targetAddressLongitude}
                      />
                    )}
                  </View>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}
