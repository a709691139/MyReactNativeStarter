import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import constantStore from "stores/constantStore";
import styles from "./styles";
import { Toast, Modal } from "antd-mobile-rn";
// const urlIconSetting = require("./assets/icon_setting.png");
const urlIconMessage = require("./assets/icon_duanxin.png");
const urlIconScan = require("./assets/icon_saoma.png");
import shopStore from "stores/shopStore";
import goodsStore from "stores/goodsStore";
import ScanCameraModal from "components/ScanCameraModal";
import HadSimilarGoodsModal from "../../PurchaseGoods/HadSimilarGoodsModal";
import GoodsService from "services/GoodsService";
import ActivityService from "services/ActivityService";

interface Props {
  navigation: any;
}
@observer
export default class Header extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  openScanCameraModal = () => {
    this.refs["ScanCameraModal"].open();
  };
  handleScanSuccess = (barCode: string) => {
    console.log("扫码成功", barCode);
    this.refs["ScanCameraModal"].close();
    Toast.loading("扫码成功，加载中..", 0);
    if (barCode.indexOf("GEX") == 0) {
      // 积分换礼 code GEX2018082909342481800007
      ActivityService.takeGift(barCode)
        .then(response => {
          console.log("扫码兑换礼品", response);
          Toast.hide();
          Modal.alert("兑换礼品扫码成功", response.giftName, [
            { text: "确定", onPress: () => {} }
          ]);
        })
        .catch(error => {
          console.log(error);
          Toast.fail(error.message || error, 2);
        });
    } else {
      // 产品二维码 6924381000432
      GoodsService.getProductTemplateByBarcode(barCode)
        .then(response => {
          console.log("扫码获取商品", response);
          Toast.hide();
          //  检测是否有类似名称或者同样barCode的已有商品
          let list: Array<any> = goodsStore.list.filter((v, i) => {
            return (
              v.barCode == barCode || v.name.indexOf(response.goodsName) != -1
            );
          });
          const fnToAddGoodDetail = () => {
            this.toOtherPage("GoodDetail", {
              mode: "add",
              barCode: barCode,
              name: response.goodsName,
              productOptionalImageUrls:
                response.productOptionalImageUrls.concat(
                  response.productOptionalImageUrls
                ) || null
            });
          };
          if (list.length) {
            this.refs["HadSimilarGoodsModal"].open(
              list,
              barCode,
              response.goodsName,
              fnToAddGoodDetail
            );
          } else {
            fnToAddGoodDetail();
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail(error.message || error, 2);
        });
    }
  };
  componentDidMount() {
    // setTimeout(() => {
    //   this.handleScanSuccess("6924381000432");
    // }, 2000);
  }
  render() {
    // let uri = "http://pic1.sc.chinaz.com/Files/pic/pic9/201807/bpic7415_s.jpg";
    return (
      <View style={styles.container}>
        {!!shopStore.imgUrl && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarBox}
            onPress={() => this.toOtherPage("My")}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: constantStore.ROOT_API_URL + shopStore.imgUrl
              }}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        )}
        <Text
          style={styles.text}
          onPress={() => this.toOtherPage("My")}
          numberOfLines={1}
        >
          {shopStore.name || "点击设置店名"}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={() => this.toOtherPage("MyMessages")}
        >
          <Image style={styles.btn_img} source={urlIconMessage} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={this.openScanCameraModal}
        >
          <Image style={styles.btn_img} source={urlIconScan} />
        </TouchableOpacity>
        <ScanCameraModal
          ref="ScanCameraModal"
          fnScanSuccess={this.handleScanSuccess}
        />
        <HadSimilarGoodsModal
          ref="HadSimilarGoodsModal"
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
