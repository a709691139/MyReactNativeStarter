import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import styles from "./styles";
import Modal from "react-native-modalbox";
import IconIonicon from "react-native-vector-icons/Ionicons";
import OrderService from "services/OrderService";
import { Toast } from "antd-mobile-rn";

interface Props {
  fnSuccess: Function;
  id: number;
}
export default class CancelOrderModal extends React.PureComponent<Props, any> {
  modal = null;
  state = {
    checkId: 1,
    word: ""
  };
  list = [
    { id: 1, name: "商品缺货" },
    { id: 2, name: "客户并未付款" },
    { id: 3, name: "其他原因" }
  ];
  constructor(props) {
    super(props);
  }
  open = () => {
    this.modal.open();
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
  changeWord = (word: string) => {
    this.setState({
      word
    });
  };
  submit = () => {
    if (this.state.checkId == 3 && !this.state.word) {
      this.refs["TextInput"].focus();
      return;
    }
    let type: string = this.list.reduce((pre, next) => {
      if (this.state.checkId == next.id) {
        pre = next.name;
      }
      return pre;
    }, "");
    this.cancelOrder(type, this.state.word);
    this.close();
  };
  cancelOrder = (type: string, word?: string) => {
    Toast.loading("提交中..");
    let reason: string = type;
    if (word) {
      reason += "：" + word;
    }
    OrderService.cancelOrder(this.props.id, reason)
      .then(response => {
        console.log("取消订单", response);
        Toast.success("取消订单成功");
        this.props.fnSuccess();
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  render() {
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
          <Text style={styles.title}>确定取消订单吗？</Text>
          <View style={styles.contentBox}>
            <View style={styles.checkBoxList}>
              {this.list.map((v, i) => {
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
            <TextInput
              ref="TextInput"
              style={styles.TextInput}
              onChangeText={this.changeWord}
              value={this.state.word}
              placeholder="请输入备注信息。"
              placeholderTextColor="#CCCCCC"
              maxLength={100}
              multiline={true}
              underlineColorAndroid="transparent"
            />
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
