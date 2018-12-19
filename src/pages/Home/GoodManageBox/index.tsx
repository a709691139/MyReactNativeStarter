import React from "react";
import { observable, action } from "mobx";
import { Provider, observer } from "mobx-react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

interface Props {
  navigation: any;
}
export default class GoodManageBox extends React.PureComponent<Props, any> {
  constructor(props) {
    super(props);
  }

  toOtherPage = (route: string, params?: any) => {
    this.props.navigation.navigate(route, params);
  };
  render() {
    const list = [
      {
        name: "入货",
        img: require("./assets/icon_ruhuo.png"),
        route: "PurchaseGoods",
        param: {}
      },
      {
        name: "商品上架",
        img: require("./assets/icon_shangpinshangjia.png"),
        route: "Goods",
        param: { mode: "store" }
      },
      {
        name: "商品下架",
        img: require("./assets/icon_shangpinxiajia.png"),
        route: "Goods",
        param: { mode: "sale" }
      },
      {
        name: "供应商",
        img: require("./assets/icon_gongyingshang.png"),
        route: "GoodsProvider",
        param: {}
      },
      {
        name: "修改价格",
        img: require("./assets/icon_xiugaijiege.png"),
        route: "Goods",
        param: { mode: "price" }
      },
      {
        name: "商品分类",
        img: require("./assets/icon_ruhuo.png"),
        route: "GoodsType",
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
              <Text style={styles.text}>{v.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
