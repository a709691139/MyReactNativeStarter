import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, ScrollView, SectionList } from "react-native";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";
import { formatMoney } from "utils/CommonUtils";
const urlImgMoney = require("./assets/imgMoney.png");
const urlImgRefund = require("./assets/imgRefund.png");
import dictionaryStore from "stores/dictionaryStore";

interface Props {
  item: any;
}
export default class JournalItem extends React.Component<Props, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        <Image
          source={item.money > 0 ? urlImgMoney : urlImgRefund}
          style={styles.journalItem_icon}
        />
        <View style={styles.journalItem_center}>
          <Text style={styles.journalItem_center_text1} numberOfLines={1}>
            {item.orderCode}
          </Text>
          <Text style={styles.journalItem_center_text2}>
            {dictionaryStore.PaymentType.reduce((pre, next) => {
              if (next.value == item.payType) {
                pre = next.text;
              }
              return pre;
            }, "")}
          </Text>
          {/* <Text style={styles.journalItem_center_text3}>{item.orderCode}</Text> */}
        </View>
        <View style={styles.journalItem_right}>
          <Text style={styles.journalItem_right_text1}>
            {formatMoney(item.money)}
          </Text>
          <Text style={styles.journalItem_right_text2}>
            {moment(item.createTime).format("HH:mm")}
          </Text>
        </View>
      </View>
    );
  }
}
