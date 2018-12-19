import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking
} from "react-native";
import constantStore from "stores/constantStore";
const { SCREEN_HEIGHT, SCREEN_WIDTH, REM, MAIN_COLOR } = constantStore;
import { Toast } from "antd-mobile-rn";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
import IconIonicon from "react-native-vector-icons/Ionicons";
import dictionaryStore from "stores/dictionaryStore";
import { observer } from "mobx-react";
import GoodsService from "services/GoodsService";
import { translateImageUrl } from "utils/CommonUtils";

interface Props {
  item: any;
  navigation?: any;
  isSelectMode?: boolean; // 是否可选中
  selected?: boolean;
  onChangeSelected?: (selected: boolean, item: any) => void;
  mode?: "sale" | "store" | "price";
}
@observer
export default class OrderItem extends React.Component<Props> {
  static defaultProps = {
    isSelectMode: false,
    selected: false,
    onChangeSelected: () => {}
  };
  state = {};
  constructor(props) {
    super(props);
  }
  toOtherPage = (route: string, params?: any) => {
    const { navigate } = this.props.navigation;
    navigate(route, params);
  };
  onChangeSelected = () => {
    this.props.onChangeSelected(!this.props.selected, this.props.item);
  };
  updateGoodsStatus = (bool: boolean) => {
    let status: number = bool ? 1 : 0;
    Toast.loading("提交中..");
    GoodsService.updateGoodsStatus([this.props.item.id], status)
      .then(response => {
        Toast.success("修改成功", 1);
        this.props.item.changeDataObj({
          salesStatus: status
        });
      })
      .catch(error => {
        console.log(error);
        Toast.fail(error.message || error, 2);
      });
  };
  editGood = () => {
    this.toOtherPage("GoodDetail", { mode: "edit", id: this.props.item.id });
  };
  replenishGood = () => {
    this.toOtherPage("GoodDetail", {
      mode: "replenish",
      id: this.props.item.id
    });
  };
  render() {
    const { item, isSelectMode, selected, mode } = this.props;
    return (
      <View style={[styles.container, isSelectMode && styles.containerSelect]}>
        {isSelectMode && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.selectBtn}
            onPress={this.onChangeSelected}
          >
            <IconIonicon
              name={selected ? "ios-radio-button-on" : "ios-radio-button-off"}
              color={selected ? MAIN_COLOR : "#999999"}
              size={40 * EStyleSheet.value("$scale")}
            />
          </TouchableOpacity>
        )}
        <View style={styles.left_imgView}>
          <Image
            style={styles.left_img}
            resizeMode="contain"
            source={translateImageUrl(item.imgUrl)}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.main_titleBox}>
            {isSelectMode && (
              <View
                style={[
                  styles.main_statusBox,
                  item.salesStatus == "1" && styles.main_statusBoxOn
                ]}
              >
                <Text
                  style={[
                    styles.main_statusBox_text,
                    item.salesStatus == "1" && styles.main_statusBox_textOn
                  ]}
                >
                  {item.salesStatus == "1" ? "上架中" : "已下架"}
                </Text>
              </View>
            )}
            <Text style={styles.main_title} numberOfLines={3}>
              {item.name}
            </Text>
          </View>
          <View style={styles.main_countBox}>
            <Text style={styles.main_countBox_text}>
              库存
              {item.inventoryNum}
            </Text>
            <View style={styles.main_countBox_textBorder} />
            <Text style={styles.main_countBox_text}>
              销量
              {item.salesCount || "0"}
            </Text>
          </View>
          <Text
            style={[
              styles.main_price,
              isSelectMode && styles.main_price_selectMode
            ]}
          >
            ￥
            <Text style={styles.main_price2}>{item.sellerDefineSalePrice}</Text>
          </Text>
          {!isSelectMode && (
            <View style={styles.bottomBtnsBox}>
              {mode != "price" &&
                (item.salesStatus == "1" ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bottomBtnsBox_btn}
                    onPress={() => this.updateGoodsStatus(false)}
                  >
                    <Text style={styles.bottomBtnsBox_btn_text}>下架</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.bottomBtnsBox_btn}
                    onPress={() => this.updateGoodsStatus(true)}
                  >
                    <Text style={styles.bottomBtnsBox_btn_text}>上架</Text>
                  </TouchableOpacity>
                ))}
              {(!mode || mode == "price") && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.bottomBtnsBox_btn}
                  onPress={this.editGood}
                >
                  <Text style={styles.bottomBtnsBox_btn_text}>编辑</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bottomBtnsBox_btn}
                onPress={this.replenishGood}
              >
                <Text style={styles.bottomBtnsBox_btn_text}>补货</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}
