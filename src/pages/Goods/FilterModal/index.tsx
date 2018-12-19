import React from "react";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import styles from "./styles";
import Modal from "react-native-modalbox";
const urlImgDate = require("images/iconDate.png");
import goodsStore from "stores/goodsStore";

interface Props {
  fnSuccess: (type: string) => void;
  type: string;
}
@observer
export default class FilterModal extends React.Component<Props, any> {
  static defaultProps = {
    type: "",
    fnSuccess: () => {}
  };
  modal = null;
  state = {
    type: ""
  };
  constructor(props) {
    super(props);
  }
  open = () => {
    this.setState({
      type: this.props.type
    });
    this.modal.open();
  };
  close = () => {
    this.modal.close();
  };
  onClose() {}
  onOpen() {}
  onChangeType = (type: string) => {
    this.setState({
      type
    });
  };
  submit = () => {
    this.props.fnSuccess(this.state.type);
    this.close();
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
      >
        <View style={styles.container}>
          <Text style={styles.title}>商品分类</Text>
          <View style={styles.btnsBox}>
            {goodsStore.types.map((v, i) => {
              let selected = this.state.type == v.id;
              return (
                <TouchableHighlight
                  key={i}
                  style={[
                    styles.btnsBox_btn,
                    i % 3 == 0 && { marginLeft: 0 },
                    selected && styles.btnsBox_btnOn
                  ]}
                  underlayColor="#DCDCDC"
                  onPress={() => this.onChangeType(v.id)}
                >
                  <Text
                    style={[
                      styles.btnsBox_btn_text,
                      selected && styles.btnsBox_btn_textOn
                    ]}
                  >
                    {v.name}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </View>
          <View style={styles.bottomBox}>
            <TouchableOpacity
              style={styles.bottomBox_btn}
              activeOpacity={0.8}
              onPress={() => this.onChangeType("")}
            >
              <Text style={styles.bottomBox_btn_text}>重置</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bottomBox_btn, styles.bottomBox_btnRed]}
              activeOpacity={0.8}
              onPress={this.submit}
            >
              <Text
                style={[
                  styles.bottomBox_btn_text,
                  styles.bottomBox_btn_textRed
                ]}
              >
                确定
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
