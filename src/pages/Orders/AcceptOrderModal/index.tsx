import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text, TouchableOpacity } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import styles from "./styles";
import Modal from "react-native-modalbox";
import IconIonicon from "react-native-vector-icons/Ionicons";
import OrderService from "services/OrderService";
import { Toast } from "antd-mobile-rn";
import NavigationUtils from "utils/NavigationUtils";

interface Props {
  fnSuccess: Function;
  id: number;
  orderDetail: any;
}
export default class AcceptOrderModal extends React.PureComponent<Props, any> {
  modal = null;
  state = {
    checkId: "0",
    word: "",
    price: 0
  };
  constructor(props) {
    super(props);
  }
  open = () => {
    this.modal.open();
    this.getDeliverPrice();
  };
  close = () => {
    this.modal.close();
  };
  onClose() {}
  onOpen() {}
  changeCheckId = (checked: boolean, checkId) => {
    this.setState({
      checkId: checkId
    });
  };
  submit = () => {
    this.acceptOrder(this.state.checkId);
    this.close();
  };
  // 计算价格
  getDeliverPrice = async () => {
    try {
      const price: number = await OrderService.getDeliverPrice(
        this.props.orderDetail.deliveryAddressLongitude,
        this.props.orderDetail.deliveryAddressLatitude,
        "0",
        "1"
      );
      console.log("price", price);
      this.setState({
        price
      });
    } catch (error) {
      console.log(error);
      Toast.fail(error.message || error, 2);
    }
  };
  acceptOrder = (type: string) => {
    switch (type) {
      case "0":
        // 店主送货
        Toast.loading("提交中..");
        OrderService.acceptOrder(this.props.id)
          .then(response => {
            console.log("接受订单", response);
            Toast.success("接受订单成功");
            this.props.fnSuccess();
          })
          .catch(error => {
            console.log(error);
            Toast.fail(error.message || error, 2);
          });
        break;
      case "1":
        // 调用跑腿接单
        NavigationUtils.navigate("AddDelivery", {
          orderId: this.props.id,
          fnSuccess: this.props.fnSuccess
        });
        break;
    }
  };
  render() {
    const list: Array<any> = [
      { id: "0", name: "自己送货" },
      { id: "1", name: `跑腿送货(费用估计：${this.state.price}元)` }
    ];

    return (
      <Modal
        style={[styles.modal]}
        coverScreen={true}
        ref={modal => (this.modal = modal)}
        swipeToClose={false}
        backButtonClose={true}
        onClosed={this.onClose}
        onOpened={this.onOpen}
        position={"center"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>选择配送方式</Text>
          <View style={styles.contentBox}>
            <View style={styles.checkBoxList}>
              {list.map((v, i) => {
                return (
                  <MyCheckBox
                    key={i}
                    name={v.name}
                    checked={this.state.checkId == v.id}
                    onPress={checked => {
                      this.changeCheckId(checked, v.id);
                    }}
                  />
                );
              })}
            </View>
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={this.close}
            >
              <Text
                style={[
                  styles.bottomBox_btn_text,
                  styles.bottomBox_btn_textRed
                ]}
              >
                取消
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={this.submit}
            >
              <Text style={[styles.bottomBox_btn_text]}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

interface MyCheckBoxProps {
  checked: boolean;
  name?: string;
  onPress: (checked: boolean) => void;
}
class MyCheckBox extends React.PureComponent<MyCheckBoxProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { checked, name, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.checkBox}
        activeOpacity={0.8}
        onPress={() => onPress(!checked)}
      >
        <IconIonicon
          name={checked ? "ios-checkmark-circle" : "ios-radio-button-off"}
          color={checked ? MAIN_COLOR : "#999999"}
          size={40 * EStyleSheet.value("$scale")}
        />
        <Text style={styles.checkBox_text}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
