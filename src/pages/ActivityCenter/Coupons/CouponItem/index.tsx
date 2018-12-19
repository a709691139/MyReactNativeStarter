import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Toast, Modal } from "antd-mobile-rn";
import styles from "./styles";
import EStyleSheet from "react-native-extended-stylesheet";

import { observer } from "mobx-react";
const urlImgBgOn = require("./assets/bg_on.png");
const urlImgBgOff = require("./assets/bg_off.png");
import moment from "moment";
import CircularProgressDisplay from "react-native-progress-circular";
// https://github.com/andy9775/React-Native-CircularProgress

interface Props {
  item: any;
  navigation?: any;
  fnSuccess: Function;
}
@observer
export default class CouponItem extends React.Component<Props> {
  state = {};
  constructor(props) {
    super(props);
  }
  toDetailPage = () => {
    this.props.navigation.navigate("CouponDetail", {
      mode: "edit",
      couponType: this.props.item.couponType,
      type: this.props.item.type,
      id: this.props.item.id,
      fnSuccess: this.props.fnSuccess
    });
  };
  render() {
    const { item } = this.props;
    const isOut: boolean = item.status == "2";
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.container}
        onPress={this.toDetailPage}
      >
        <Image source={isOut ? urlImgBgOff : urlImgBgOn} style={styles.bg} />
        <View style={styles.leftBox}>
          <Text
            style={[
              styles.leftBox_text1,
              {
                color: isOut ? "#B3B3B3" : "#E9374D"
              }
            ]}
          >
            {item.couponName}
          </Text>
          <Text
            style={[
              styles.leftBox_text2,
              {
                color: isOut ? "#B3B3B3" : "#E9374D"
              }
            ]}
          >
            {item.couponType == "0" && "满减券"}
            {item.couponType == "1" && "折扣券"}
          </Text>
          <Text style={styles.leftBox_text3}>
            {moment(item.startTime).format("YYYY-MM-DD")}~
            {moment(item.finishTime).format("YYYY-MM-DD")}
          </Text>
        </View>
        <View style={styles.rightBox}>
          <CircularProgressDisplay.Hollow
            size={122 * EStyleSheet.value("$scale")}
            backgroundColor={isOut ? "#E0E0E0" : "#FFD3D8"}
            progressBarWidth={10 * EStyleSheet.value("$scale")}
            progressBarColor={isOut ? "#B3B3B3" : "#E9374D"}
            innerComponent={
              <View
                style={[
                  styles.circularBox,
                  {
                    backgroundColor: isOut ? "#F3F3F3" : "#FFEDEF"
                  }
                ]}
              >
                <Text
                  style={[
                    styles.rightBox_text1,
                    {
                      color: isOut ? "#B3B3B3" : "#E9374D"
                    }
                  ]}
                >
                  {parseInt((item.setOutCount / item.totalCount) * 100)}
                  <Text style={styles.rightBox_text2}>%</Text>
                </Text>
                <Text
                  style={[
                    styles.rightBox_text3,
                    {
                      color: isOut ? "#B3B3B3" : "#E9374D"
                    }
                  ]}
                >
                  已领
                </Text>
              </View>
            }
            rotate={(item.setOutCount / item.totalCount).toFixed(2) * 360}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
