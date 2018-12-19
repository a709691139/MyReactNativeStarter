import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import styles from "./styles";
import { Toast } from "antd-mobile-rn";
import constantStore from "stores/constantStore";
const { MAIN_COLOR } = constantStore;
import { formatMoney } from "utils/CommonUtils";
import ShopService from "services/ShopService";
import LocalService from "services/LocalService";

const urlImgBg = require("./assets/bg.png");
const urlImgEye = require("./assets/iconEye.png");
const urlImgEyeClose = require("./assets/iconEyeClose.png");

interface Props {}
@observer
export default class TotalBox extends React.Component<Props, any> {
  state = {
    momeny: "0",
    visible: false,
    loading: true
  };
  constructor(props) {
    super(props);
  }
  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    });
    this.saveIsHideJournalTotal(this.state.visible);
  };
  format = (str: string, visible: boolean) => {
    str = formatMoney(str);
    if (!visible) {
      str = str.replace(/\w|./g, "*");
    }
    return str;
  };
  getData = () => {
    this.setState({ loading: true });
    ShopService.getJournalTotal()
      .then(response => {
        console.log("获取流水总数", response);
        this.setState({
          momeny: response.toString(),
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
        Toast.fail(error.message || error, 2);
      });
  };
  getIsHideJournalTotal = () => {
    LocalService.getIsHideJournalTotal()
      .then(response => {
        this.setState({
          visible: !response.flag
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  saveIsHideJournalTotal = (flag: boolean) => {
    LocalService.saveIsHideJournalTotal(flag)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getData();
    this.getIsHideJournalTotal();
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={urlImgBg} style={styles.bg} />
        <View style={styles.text1View}>
          <Text style={styles.text1}>合计流水（元）</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={this.toggleVisible}>
            <Image
              source={this.state.visible ? urlImgEye : urlImgEyeClose}
              style={styles.text1View_img}
            />
          </TouchableOpacity>
        </View>
        {this.state.loading ? (
          <ActivityIndicator color={MAIN_COLOR} />
        ) : (
          <Text style={styles.text2}>
            {this.format(this.state.momeny, this.state.visible)}
          </Text>
        )}
      </View>
    );
  }
}
