import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  navigation: any;
}
export default class OrderManageBox extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  render() {
    const list = [
      {
        name: "满减券",
        img: require("./assets/img_manjianjuan.png"),
        route: "Coupons",
        param: {
          couponType: "0"
        }
      },
      {
        name: "折扣券",
        img: require("./assets/img_zhikoujuan.png"),
        route: "Coupons",
        param: {
          couponType: "1"
        }
      },
      {
        name: "活动投放",
        img: require("./assets/img_huodongtoufang.png"),
        route: "ActivityRelease",
        param: {}
      },
      {
        name: "积分规则",
        img: require("./assets/icon_jifenguize.png"),
        route: "ActivityPointsRule",
        param: {}
      },
      {
        name: "积分换礼",
        img: require("./assets/icon_jifenhuanli.png"),
        route: "ActivityPointsExchangeGifts",
        param: {}
      }
    ];
    return (
      <View style={styles.container}>
        {list.map((v, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.8}
              style={styles.btn}
              onPress={() => this.toOtherPage(v.route, v.param)}
            >
              <Image source={v.img} style={styles.img} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
