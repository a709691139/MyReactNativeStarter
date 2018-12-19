import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import styles, { inputItemStyle, listItemStyle } from "./styles";
import { observer } from "mobx-react";
import { whiteThemeNavigationOptions } from "pages/index";
import { Toast, Modal, InputItem, List, DatePicker } from "antd-mobile-rn";
import FormItem from "components/FormItem";
import OrderService from "services/OrderService";
import shopStore from "stores/shopStore";
import ListPopover from "components/ListPopover";

interface navigationParams {
  orderId: number;
  fnSuccess?: Function;
}
interface Props {
  navigation: any;
}
@observer
export default class AddDelivery extends React.Component<Props, any> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...whiteThemeNavigationOptions,
    title: navigation.getParam("title", "新增跑腿订单"),
    headerRight: <View />
  });
  state = {
    mode: "add", // add  reAdd
    loading: true,
    uploading: false,
    loadingPrice: false,
    orderItem: {} as any,
    remark: "", // 备注
    itemType: "", // 货物类型
    weight: "", // 重量
    selectCarDelivery: "0", // 小车配送
    selectIncubator: "0", // 保温箱
    price: "0", // 价格
    itemTypes: [
      // {
      //   key: "CAKE",
      //   value: "蛋糕"
      // }
    ],
    weights: [
      // {
      //   key: "10",
      //   value: "10公斤或以下"
      // }
    ]
  };
  formItemRefs = {};
  constructor(props) {
    super(props);
  }
  getOrderData = async () => {
    const orderId: number = this.props.navigation.getParam("orderId", "");
    if (orderId) {
      const orderItem: any = await OrderService.getOrderDetailById(orderId);
      this.setState({
        orderItem
      });
      if (orderItem.expressDeliveryOrderStatus == 20) {
        this.setState({
          mode: "reAdd"
        });
        this.props.navigation.setParams({
          title: "重新下单跑腿"
        });
      }
      console.log("orderItem", orderItem);
    } else {
      this.props.navigation.goBack();
      Toast.fail("订单id为null");
    }
  };
  getDeliverItemTypes = async () => {
    const itemTypes: Array<any> = await OrderService.getDeliverItemTypes();
    this.setState({
      itemTypes
    });
  };
  getDeliverWeights = async () => {
    const weights: Array<any> = await OrderService.getDeliverWeights();
    this.setState({
      weights
    });
  };
  // 计算价格
  getDeliverPrice = async () => {
    try {
      if (!this.state.selectCarDelivery || !this.state.weight) {
        return;
      }
      this.setState({
        loadingPrice: true
      });
      const price: number = await OrderService.getDeliverPrice(
        this.state.orderItem.deliveryAddressLongitude,
        this.state.orderItem.deliveryAddressLatitude,
        this.state.selectCarDelivery,
        this.state.weight
      );
      this.setState({
        price,
        loadingPrice: false
      });
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };
  selectItemType = () => {
    ListPopover.open({
      list: this.state.itemTypes.map(v => v.value),
      onClick: (item: string, index: number) => {
        this.setState(
          {
            itemType: this.state.itemTypes[index].key
          },
          () => {
            this.getDeliverPrice();
          }
        );
      }
    });
  };
  selectWeight = () => {
    ListPopover.open({
      list: this.state.weights.map(v => v.value),
      onClick: (item: string, index: number) => {
        this.setState(
          {
            weight: this.state.weights[index].key
          },
          () => {
            this.getDeliverPrice();
          }
        );
      }
    });
  };
  submit = async () => {
    let errorMessage: string = "";
    Object.keys(this.formItemRefs).map(key => {
      const formItemRef = this.formItemRefs[key];
      if (!errorMessage) {
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
      let sendData: Object = {
        orderId: this.state.orderItem.id,
        remark: this.state.remark,
        itemType: this.state.itemType,
        weight: this.state.weight,
        selectCarDelivery: this.state.selectCarDelivery,
        selectIncubator: this.state.selectIncubator,
        price: this.state.price
      };
      console.log(sendData);
      Toast.loading("提交中..", 0);
      let promise =
        this.state.mode == "add"
          ? OrderService.addDeliverOrder
          : OrderService.reAddDeliverOrder;
      const response: any = await promise(sendData);
      console.log("提交成功", response);
      this.props.navigation.goBack();
      this.props.navigation.getParam("fnSuccess", () => {})();
      Toast.success("提交成功", 2);
      // this.props.navigation.replace("DeliveryDetail", {
      //   orderId: response.id
      // });
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };

  componentDidMount() {
    try {
      this.getOrderData();
      this.getDeliverItemTypes();
      this.getDeliverWeights();
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
      Toast.fail(error.message || error, 2);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
          <List>
            <List.Item styles={listItemStyle} extra={shopStore.address}>
              发货地址
            </List.Item>
            <List.Item styles={listItemStyle} extra={shopStore.contactName}>
              发货人姓名
            </List.Item>
            <List.Item styles={listItemStyle} extra={shopStore.contactPhone}>
              发货人电话
            </List.Item>
          </List>
          <View style={styles.marginBox} />
          <List>
            <List.Item
              styles={listItemStyle}
              extra={this.state.orderItem.deliveryAddress}
            >
              收货地址
            </List.Item>
            <List.Item
              styles={listItemStyle}
              extra={this.state.orderItem.receiverName}
            >
              收货人姓名
            </List.Item>
            <List.Item
              styles={listItemStyle}
              extra={this.state.orderItem.receiverPhone}
            >
              收货人电话
            </List.Item>
          </List>
          <View style={styles.marginBox} />
          <List>
            <FormItem
              ref={ref => {
                this.formItemRefs["remark"] = ref;
              }}
              value={this.state.remark}
              required={false}
              message="请填写备注"
            >
              <InputItem
                maxLength={30}
                clear
                placeholder="请填写备注"
                placeholderTextColor="#999999"
                styles={inputItemStyle}
                value={this.state.remark}
                onChange={remark =>
                  this.setState({
                    remark
                  })
                }
              >
                订单备注
              </InputItem>
            </FormItem>
            <FormItem
              ref={ref => {
                this.formItemRefs["itemType"] = ref;
              }}
              value={this.state.itemType}
              required={true}
              message="请选择货物类型"
            >
              <List.Item
                styles={listItemStyle}
                extra={
                  this.state.itemTypes.reduce((pre, next) => {
                    if (next.key == this.state.itemType) {
                      pre = next.value;
                    }
                    return pre;
                  }, "") || (
                    <Text style={[listItemStyle.Extra, { color: "#999999" }]}>
                      请选择货物类型
                    </Text>
                  )
                }
                onClick={this.selectItemType}
              >
                货物类型
              </List.Item>
            </FormItem>
            <FormItem
              ref={ref => {
                this.formItemRefs["weight"] = ref;
              }}
              value={this.state.weight}
              required={true}
              message="请选择货物重量"
            >
              <List.Item
                styles={listItemStyle}
                extra={
                  this.state.weights.reduce((pre, next) => {
                    if (next.key == this.state.weight) {
                      pre = next.value;
                    }
                    return pre;
                  }, "") || (
                    <Text style={[listItemStyle.Extra, { color: "#999999" }]}>
                      请选择货物重量
                    </Text>
                  )
                }
                onClick={this.selectWeight}
              >
                货物重量
              </List.Item>
            </FormItem>
            <List.Item
              styles={listItemStyle}
              extra={
                <View style={styles.serviceBox}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setState(
                        {
                          selectIncubator:
                            this.state.selectIncubator == "0" ? "1" : "0"
                        },
                        () => {
                          this.getDeliverPrice();
                        }
                      );
                    }}
                    style={[
                      styles.serviceBox_btn,
                      this.state.selectIncubator == "1" &&
                        styles.serviceBox_btn_on
                    ]}
                  >
                    <Text
                      style={[
                        styles.serviceBox_btn_text,
                        this.state.selectIncubator == "1" &&
                          styles.serviceBox_btn_text_on
                      ]}
                    >
                      保温箱配送
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setState(
                        {
                          selectCarDelivery:
                            this.state.selectCarDelivery == "0" ? "1" : "0"
                        },
                        () => {
                          this.getDeliverPrice();
                        }
                      );
                    }}
                    style={[
                      styles.serviceBox_btn,
                      styles.serviceBox_btn2,
                      this.state.selectCarDelivery == "1" &&
                        styles.serviceBox_btn_on
                    ]}
                  >
                    <Text
                      style={[
                        styles.serviceBox_btn_text,
                        this.state.selectCarDelivery == "1" &&
                          styles.serviceBox_btn_text_on
                      ]}
                    >
                      小车配送
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            >
              其他服务
            </List.Item>
          </List>
        </ScrollView>
        <View style={styles.bottomBox}>
          <Text style={styles.bottomBox_money}>
            ￥ {this.state.loadingPrice ? "正在计算价格" : this.state.price}
          </Text>
          {/* <TouchableOpacity
            style={styles.bottomBox_moneyDetailBtn}
            activeOpacity={0.8}
            onPress={() => {}}
          >
            <Image
              source={require("./assets/icon_gantan.png")}
              style={styles.bottomBox_moneyDetailBtn_img}
            />
            <Text style={styles.bottomBox_moneyDetailBtn_text}>费用明细</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.bottomBox_submitBtn}
            onPress={this.submit}
          >
            <Text style={styles.bottomBox_submitBtn_text}>提交订单</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
